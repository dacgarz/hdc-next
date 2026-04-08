import { NextResponse } from 'next/server'

// Increase timeout for Vercel — requires Pro plan for values > 10s
export const maxDuration = 60

const PAGESPEED_API = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
const UA = 'Mozilla/5.0 (compatible; HoneyfootAudit/1.0; +https://honeyfootco.com)'

/* ── Grading ── */
function grade(score) {
  if (score >= 90) return { letter: 'A', label: 'Excellent', color: '#4ade80' }
  if (score >= 75) return { letter: 'B', label: 'Good',      color: '#a3e635' }
  if (score >= 50) return { letter: 'C', label: 'Needs Work',color: '#facc15' }
  if (score >= 25) return { letter: 'D', label: 'Poor',      color: '#fb923c' }
  return                   { letter: 'F', label: 'Critical',  color: '#f87171' }
}

/* ── PageSpeed findings ── */
function pickFindings(audits) {
  const priority = [
    'render-blocking-resources','unused-javascript','unused-css-rules',
    'uses-optimized-images','uses-webp-images','uses-responsive-images',
    'efficient-animated-content','uses-text-compression','uses-long-cache-ttl',
    'dom-size','meta-description','document-title','link-text','image-alt','viewport',
  ]
  const findings = []
  for (const id of priority) {
    const a = audits[id]
    if (!a || a.score === 1 || a.score === null) continue
    findings.push({
      id, title: a.title,
      description: a.description?.replace(/\[.*?\]\(.*?\)/g,'').replace(/`/g,'').slice(0,160),
      score: a.score,
    })
    if (findings.length >= 5) break
  }
  return findings
}

/* ── HTML + meta tag + security header analysis ── */
async function analyzeSite(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, 'Accept': 'text/html' },
      signal: AbortSignal.timeout(10000),
      redirect: 'follow',
    })

    const html = await res.text()
    const headers = Object.fromEntries(res.headers.entries())

    // Meta tags
    const title        = html.match(/<title[^>]*>([^<]{1,200})<\/title>/i)?.[1]?.trim() ?? ''
    const metaDesc     = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']{1,400})["']/i)?.[1]?.trim()
                      ?? html.match(/<meta[^>]+content=["']([^"']{1,400})["'][^>]+name=["']description["']/i)?.[1]?.trim()
                      ?? ''
    const h1s          = (html.match(/<h1[^>]*>/gi) ?? []).length
    const ogTitle      = !!(html.match(/<meta[^>]+property=["']og:title["']/i))
    const ogDesc       = !!(html.match(/<meta[^>]+property=["']og:description["']/i))
    const ogImage      = !!(html.match(/<meta[^>]+property=["']og:image["']/i))
    const canonical    = !!(html.match(/<link[^>]+rel=["']canonical["']/i))
    const viewport     = !!(html.match(/<meta[^>]+name=["']viewport["']/i))
    const schemaOrg    = html.includes('schema.org')
    const robotsMeta   = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i)?.[1] ?? 'index, follow'
    const isIndexable  = !robotsMeta.toLowerCase().includes('noindex')

    // Images
    const allImgs      = (html.match(/<img[^>]+>/gi) ?? [])
    const imgsWithAlt  = allImgs.filter(t => /alt=["'][^"']+["']/i.test(t)).length
    const imgsTotal    = allImgs.length

    // Security headers
    const security = {
      https:          url.startsWith('https://'),
      hsts:           !!headers['strict-transport-security'],
      xFrame:         !!headers['x-frame-options'],
      xContentType:   !!headers['x-content-type-options'],
      csp:            !!headers['content-security-policy'],
      referrerPolicy: !!headers['referrer-policy'],
    }

    // Security score: HTTPS 40 | HSTS 20 | X-Frame/CSP 20 | X-Content 10 | Referrer 10
    const securityScore = Math.min(100,
      (security.https ? 40 : 0) +
      (security.hsts  ? 20 : 0) +
      (security.xFrame || security.csp ? 20 : 0) +
      (security.xContentType ? 10 : 0) +
      (security.referrerPolicy ? 10 : 0)
    )

    // On-page SEO score
    const onPageScore = Math.min(100,
      (title ? 20 : 0) +
      (title.length >= 30 && title.length <= 70 ? 10 : 0) +
      (metaDesc ? 20 : 0) +
      (metaDesc.length >= 100 && metaDesc.length <= 165 ? 10 : 0) +
      (h1s === 1 ? 20 : h1s > 1 ? 10 : 0) +
      (canonical ? 10 : 0) +
      (viewport ? 5 : 0) +
      (ogImage ? 3 : 0) +
      (schemaOrg ? 2 : 0)
    )

    // Extract links for broken link check
    const rawLinks = [...html.matchAll(/href=["']([^"'#?\s]+)/gi)]
      .map(m => m[1])
      .filter(h => h.startsWith('http') || h.startsWith('/'))
      .map(h => h.startsWith('/') ? new URL(h, url).href : h)
      .filter(h => !h.includes('javascript:') && !h.includes('mailto:') && !h.includes('tel:'))
    const linksToCheck = [...new Set(rawLinks)].slice(0, 30)

    return {
      ok: true,
      statusCode: res.status,
      title, titleLength: title.length,
      metaDesc, metaDescLength: metaDesc.length,
      h1s, ogTitle, ogDesc, ogImage, canonical, viewport, schemaOrg,
      robotsMeta, isIndexable,
      imgsTotal, imgsWithAlt, imgsWithoutAlt: imgsTotal - imgsWithAlt,
      security, securityScore,
      onPageScore,
      linksToCheck,
    }
  } catch (err) {
    return { ok: false, error: err.message, security: {}, securityScore: 0, onPageScore: 0, linksToCheck: [] }
  }
}

/* ── Broken link checker ── */
async function checkBrokenLinks(links) {
  if (!links.length) return { total: 0, brokenCount: 0, broken: [], timeouts: 0 }

  const results = await Promise.allSettled(
    links.map(async (link) => {
      try {
        const res = await fetch(link, {
          method: 'HEAD',
          headers: { 'User-Agent': UA },
          signal: AbortSignal.timeout(5000),
          redirect: 'follow',
        })
        // Some servers reject HEAD — fall back to GET range
        if (res.status === 405) {
          const r2 = await fetch(link, {
            method: 'GET',
            headers: { 'User-Agent': UA, 'Range': 'bytes=0-0' },
            signal: AbortSignal.timeout(5000),
            redirect: 'follow',
          })
          return { url: link, status: r2.status, ok: r2.ok || r2.status === 206 }
        }
        return { url: link, status: res.status, ok: res.ok }
      } catch {
        return { url: link, status: 0, ok: false, timedOut: true }
      }
    })
  )

  const checked  = results.map(r => r.status === 'fulfilled' ? r.value : { url: '', status: 0, ok: false })
  const broken   = checked.filter(r => !r.ok && !r.timedOut && r.status >= 400)
  const timeouts = checked.filter(r => r.timedOut).length

  return {
    total: links.length,
    brokenCount: broken.length,
    broken: broken.map(r => ({ url: r.url, status: r.status })),
    timeouts,
  }
}

/* ── Email body ── */
function buildEmail({ name, email, phone, url, report }) {
  const { mobile, desktop, vitals, onPage, security, links, findings, overall } = report
  const bar = s => '█'.repeat(Math.round(s / 10)) + '░'.repeat(10 - Math.round(s / 10))
  const g   = s => grade(s).letter
  const yn  = v => v ? '✓ Yes' : '✗ No'

  return `
FREE WEBSITE AUDIT REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Website: ${url}
Requested by: ${name} (${email}${phone ? ' · ' + phone : ''})
Scanned: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })} EST
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

OVERALL SCORE: ${overall}/100 — ${grade(overall).label}

── MOBILE PERFORMANCE ─────────────────
  Performance    ${mobile.performance}/100  ${bar(mobile.performance)}  ${g(mobile.performance)}
  SEO            ${mobile.seo}/100  ${bar(mobile.seo)}  ${g(mobile.seo)}
  Accessibility  ${mobile.accessibility}/100  ${bar(mobile.accessibility)}  ${g(mobile.accessibility)}
  Best Practices ${mobile.bestPractices}/100  ${bar(mobile.bestPractices)}  ${g(mobile.bestPractices)}

── CORE WEB VITALS (Mobile) ───────────
  LCP (Largest Contentful Paint):  ${vitals.lcp}
  TBT (Total Blocking Time):       ${vitals.tbt}
  CLS (Cumulative Layout Shift):   ${vitals.cls}
  FCP (First Contentful Paint):    ${vitals.fcp}
  Speed Index:                     ${vitals.si}

── DESKTOP ────────────────────────────
  Performance:  ${desktop.performance}/100  ${g(desktop.performance)}
  SEO:          ${desktop.seo}/100          ${g(desktop.seo)}

── ON-PAGE SEO ────────────────────────
  Score: ${onPage.onPageScore}/100  ${g(onPage.onPageScore)}
  Title tag:        ${onPage.title || '(missing)'} (${onPage.titleLength} chars — ideal: 30–70)
  Meta description: ${onPage.metaDesc ? onPage.metaDesc.slice(0,80) + '…' : '(missing)'} (${onPage.metaDescLength} chars — ideal: 100–165)
  H1 tags found:    ${onPage.h1s} (ideal: exactly 1)
  Canonical URL:    ${yn(onPage.canonical)}
  OG Image:         ${yn(onPage.ogImage)}
  Schema markup:    ${yn(onPage.schemaOrg)}
  Indexable:        ${yn(onPage.isIndexable)}
  Images total:     ${onPage.imgsTotal} (${onPage.imgsWithAlt} with alt text, ${onPage.imgsWithoutAlt} missing alt)

── SECURITY ───────────────────────────
  Score: ${security.securityScore}/100  ${g(security.securityScore)}
  HTTPS:                  ${yn(security.security?.https)}
  HSTS header:            ${yn(security.security?.hsts)}
  X-Frame-Options:        ${yn(security.security?.xFrame)}
  X-Content-Type-Options: ${yn(security.security?.xContentType)}
  Content Security Policy:${yn(security.security?.csp)}
  Referrer-Policy:        ${yn(security.security?.referrerPolicy)}

── BROKEN LINKS ───────────────────────
  Links checked: ${links.total}
  Broken links:  ${links.brokenCount}
${links.broken.length ? links.broken.map(b => `  ✗ ${b.url} (${b.status})`).join('\n') : '  ✓ No broken links found!'}

── TOP PERFORMANCE ISSUES ─────────────
${findings.length === 0 ? '  ✓ No major issues detected!' : findings.map((f, i) => `  ${i + 1}. ${f.title}\n     ${f.description}`).join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Ready to fix these? Book a free call:
https://honeyfootco.com/contact · (305) 707-0889
`.trim()
}

/* ── Main handler ── */
export async function POST(request) {
  try {
    const { url, firstName, lastName, email, phone } = await request.json()

    if (!url || !email) {
      return NextResponse.json({ error: 'URL and email are required.' }, { status: 400 })
    }

    const normalizedUrl = url.startsWith('http') ? url : `https://${url}`

    // Run PageSpeed (mobile + desktop) and site analysis all in parallel
    const [mobileRes, desktopRes, siteDetails] = await Promise.all([
      fetch(`${PAGESPEED_API}?url=${encodeURIComponent(normalizedUrl)}&strategy=mobile&category=performance&category=seo&category=accessibility&category=best-practices`),
      fetch(`${PAGESPEED_API}?url=${encodeURIComponent(normalizedUrl)}&strategy=desktop&category=performance&category=seo&category=accessibility&category=best-practices`),
      analyzeSite(normalizedUrl),
    ])

    if (!mobileRes.ok || !desktopRes.ok) {
      const errBody = await (mobileRes.ok ? desktopRes : mobileRes).text()
      console.error('PageSpeed API error:', mobileRes.status, desktopRes.status, errBody.slice(0, 500))
      return NextResponse.json({
        error: `PageSpeed API returned ${mobileRes.ok ? desktopRes.status : mobileRes.status}. ${errBody.slice(0, 200)}`
      }, { status: 422 })
    }

    const [mobileData, desktopData] = await Promise.all([mobileRes.json(), desktopRes.json()])

    // Extract PageSpeed scores
    const mobile = {
      performance:  Math.round((mobileData.lighthouseResult?.categories?.performance?.score  ?? 0) * 100),
      seo:          Math.round((mobileData.lighthouseResult?.categories?.seo?.score          ?? 0) * 100),
      accessibility:Math.round((mobileData.lighthouseResult?.categories?.accessibility?.score ?? 0) * 100),
      bestPractices:Math.round((mobileData.lighthouseResult?.categories?.['best-practices']?.score ?? 0) * 100),
    }

    const desktop = {
      performance:  Math.round((desktopData.lighthouseResult?.categories?.performance?.score  ?? 0) * 100),
      seo:          Math.round((desktopData.lighthouseResult?.categories?.seo?.score          ?? 0) * 100),
      accessibility:Math.round((desktopData.lighthouseResult?.categories?.accessibility?.score ?? 0) * 100),
      bestPractices:Math.round((desktopData.lighthouseResult?.categories?.['best-practices']?.score ?? 0) * 100),
    }

    const audits = mobileData.lighthouseResult?.audits ?? {}

    const vitals = {
      lcp: audits['largest-contentful-paint']?.displayValue ?? 'N/A',
      tbt: audits['total-blocking-time']?.displayValue ?? 'N/A',
      cls: audits['cumulative-layout-shift']?.displayValue ?? 'N/A',
      fcp: audits['first-contentful-paint']?.displayValue ?? 'N/A',
      si:  audits['speed-index']?.displayValue ?? 'N/A',
    }

    // Run broken link check now that we have the links from siteDetails
    const links = await checkBrokenLinks(siteDetails.linksToCheck ?? [])

    const findings = pickFindings(audits)

    // Broken link score
    const linkScore = links.brokenCount === 0 ? 100
      : links.brokenCount <= 2 ? 70
      : links.brokenCount <= 5 ? 45
      : 20

    // Overall weighted score
    // Performance 25% | SEO (PageSpeed) 20% | On-page SEO 15% | Accessibility 15% | Security 15% | Broken Links 10%
    const overall = Math.round(
      mobile.performance   * 0.25 +
      mobile.seo           * 0.20 +
      siteDetails.onPageScore * 0.15 +
      mobile.accessibility * 0.15 +
      siteDetails.securityScore * 0.15 +
      linkScore            * 0.10
    )

    const report = {
      url: normalizedUrl,
      mobile, desktop, vitals, findings,
      onPage: siteDetails,
      security: { securityScore: siteDetails.securityScore, security: siteDetails.security },
      links,
      overall,
      grades: {
        performance:   grade(mobile.performance),
        seo:           grade(mobile.seo),
        accessibility: grade(mobile.accessibility),
        bestPractices: grade(mobile.bestPractices),
        onPage:        grade(siteDetails.onPageScore),
        security:      grade(siteDetails.securityScore),
        links:         grade(linkScore),
        overall:       grade(overall),
      },
      scannedAt: new Date().toISOString(),
    }

    const name = [firstName, lastName].filter(Boolean).join(' ') || 'Website Owner'

    // Notify HDC
    await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: 'f9503ab1-7d32-422c-8a02-d5fd920116b9',
        subject: `🔍 Website Audit — ${normalizedUrl} (${grade(overall).label})`,
        from_name: name,
        email,
        message: buildEmail({ name, email, phone, url: normalizedUrl, report }),
      }),
    })

    return NextResponse.json({ success: true, report })
  } catch (err) {
    console.error('Audit error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
