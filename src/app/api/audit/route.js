import { NextResponse } from 'next/server'

const PAGESPEED_API = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed'
const UA = 'Mozilla/5.0 (compatible; HoneyfootAudit/1.0; +https://honeyfootco.com)'

/* ── Grading ── */
function grade(score) {
  if (score >= 90) return { letter: 'A', label: 'Excellent',  color: '#4ade80' }
  if (score >= 75) return { letter: 'B', label: 'Good',       color: '#a3e635' }
  if (score >= 50) return { letter: 'C', label: 'Needs Work', color: '#facc15' }
  if (score >= 25) return { letter: 'D', label: 'Poor',       color: '#fb923c' }
  return                   { letter: 'F', label: 'Critical',   color: '#f87171' }
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

/* ── HTML + meta + security header analysis ── */
async function analyzeSite(url) {
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': UA, 'Accept': 'text/html' },
      signal: AbortSignal.timeout(5000),
      redirect: 'follow',
    })
    const html = await res.text()
    const headers = Object.fromEntries(res.headers.entries())

    const title       = html.match(/<title[^>]*>([^<]{1,200})<\/title>/i)?.[1]?.trim() ?? ''
    const metaDesc    = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']{1,400})["']/i)?.[1]?.trim()
                     ?? html.match(/<meta[^>]+content=["']([^"']{1,400})["'][^>]+name=["']description["']/i)?.[1]?.trim()
                     ?? ''
    const h1s         = (html.match(/<h1[^>]*>/gi) ?? []).length
    const ogImage     = !!(html.match(/<meta[^>]+property=["']og:image["']/i))
    const canonical   = !!(html.match(/<link[^>]+rel=["']canonical["']/i))
    const schemaOrg   = html.includes('schema.org')
    const robotsMeta  = html.match(/<meta[^>]+name=["']robots["'][^>]+content=["']([^"']*)["']/i)?.[1] ?? ''
    const isIndexable = !robotsMeta.toLowerCase().includes('noindex')

    const allImgs     = (html.match(/<img[^>]+>/gi) ?? [])
    const imgsWithAlt = allImgs.filter(t => /alt=["'][^"']+["']/i.test(t)).length
    const imgsTotal   = allImgs.length

    const security = {
      https:          url.startsWith('https://'),
      hsts:           !!headers['strict-transport-security'],
      xFrame:         !!headers['x-frame-options'],
      xContentType:   !!headers['x-content-type-options'],
      csp:            !!headers['content-security-policy'],
      referrerPolicy: !!headers['referrer-policy'],
    }

    const securityScore = Math.min(100,
      (security.https  ? 40 : 0) + (security.hsts ? 20 : 0) +
      (security.xFrame || security.csp ? 20 : 0) +
      (security.xContentType ? 10 : 0) + (security.referrerPolicy ? 10 : 0)
    )

    const onPageScore = Math.min(100,
      (title ? 20 : 0) + (title.length >= 30 && title.length <= 70 ? 10 : 0) +
      (metaDesc ? 20 : 0) + (metaDesc.length >= 100 && metaDesc.length <= 165 ? 10 : 0) +
      (h1s === 1 ? 20 : h1s > 1 ? 10 : 0) +
      (canonical ? 10 : 0) + (ogImage ? 5 : 0) + (schemaOrg ? 3 : 0) + (isIndexable ? 2 : 0)
    )

    return {
      ok: true, title, titleLength: title.length,
      metaDesc, metaDescLength: metaDesc.length,
      h1s, ogImage, canonical, schemaOrg, robotsMeta, isIndexable,
      imgsTotal, imgsWithAlt, imgsWithoutAlt: imgsTotal - imgsWithAlt,
      security, securityScore, onPageScore,
    }
  } catch (err) {
    return { ok: false, error: err.message, security: {}, securityScore: 0, onPageScore: 0 }
  }
}

/* ── Email ── */
function buildEmail({ name, email, phone, url, report }) {
  const { mobile, desktop, vitals, onPage, security, findings, overall } = report
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

MOBILE   Performance ${mobile.performance}/100 ${bar(mobile.performance)} ${g(mobile.performance)}
         SEO         ${mobile.seo}/100 ${bar(mobile.seo)} ${g(mobile.seo)}
         Access.     ${mobile.accessibility}/100 ${bar(mobile.accessibility)} ${g(mobile.accessibility)}
         Best Prac.  ${mobile.bestPractices}/100 ${bar(mobile.bestPractices)} ${g(mobile.bestPractices)}

DESKTOP  Performance ${desktop.performance}/100 ${g(desktop.performance)}   SEO ${desktop.seo}/100 ${g(desktop.seo)}

CORE WEB VITALS (Mobile)
  LCP: ${vitals.lcp}  TBT: ${vitals.tbt}  CLS: ${vitals.cls}  FCP: ${vitals.fcp}

ON-PAGE SEO (Score: ${onPage.onPageScore}/100)
  Title: ${onPage.title || '(missing)'} (${onPage.titleLength} chars)
  Meta desc: ${onPage.metaDesc ? onPage.metaDesc.slice(0,80)+'…' : '(missing)'} (${onPage.metaDescLength} chars)
  H1 tags: ${onPage.h1s}  Canonical: ${yn(onPage.canonical)}  OG Image: ${yn(onPage.ogImage)}
  Schema: ${yn(onPage.schemaOrg)}  Indexable: ${yn(onPage.isIndexable)}
  Images: ${onPage.imgsWithAlt}/${onPage.imgsTotal} have alt text

SECURITY (Score: ${security.securityScore}/100)
  HTTPS: ${yn(security.security?.https)}  HSTS: ${yn(security.security?.hsts)}
  X-Frame: ${yn(security.security?.xFrame)}  CSP: ${yn(security.security?.csp)}
  X-Content-Type: ${yn(security.security?.xContentType)}  Referrer-Policy: ${yn(security.security?.referrerPolicy)}

TOP PERFORMANCE ISSUES
${findings.length === 0 ? '  ✓ No major issues!' : findings.map((f,i) => `  ${i+1}. ${f.title}\n     ${f.description}`).join('\n\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
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
    const apiKey = process.env.PAGESPEED_API_KEY ? `&key=${process.env.PAGESPEED_API_KEY}` : ''

    // Run PageSpeed mobile + site HTML analysis in parallel
    const [mobileRes, siteDetails] = await Promise.all([
      fetch(`${PAGESPEED_API}?url=${encodeURIComponent(normalizedUrl)}&strategy=mobile&category=performance&category=seo&category=accessibility&category=best-practices${apiKey}`),
      analyzeSite(normalizedUrl),
    ])

    if (!mobileRes.ok) {
      console.error('PageSpeed error:', mobileRes.status)
      return NextResponse.json({ error: 'Could not analyze this URL. Please verify it is publicly accessible.' }, { status: 422 })
    }

    const mobileData = await mobileRes.json()

    const mobile = {
      performance:   Math.round((mobileData.lighthouseResult?.categories?.performance?.score   ?? 0) * 100),
      seo:           Math.round((mobileData.lighthouseResult?.categories?.seo?.score           ?? 0) * 100),
      accessibility: Math.round((mobileData.lighthouseResult?.categories?.accessibility?.score ?? 0) * 100),
      bestPractices: Math.round((mobileData.lighthouseResult?.categories?.['best-practices']?.score ?? 0) * 100),
    }

    const desktop = { performance: 0, seo: 0, accessibility: 0 }

    const audits = mobileData.lighthouseResult?.audits ?? {}
    const vitals = {
      lcp: audits['largest-contentful-paint']?.displayValue ?? 'N/A',
      tbt: audits['total-blocking-time']?.displayValue ?? 'N/A',
      cls: audits['cumulative-layout-shift']?.displayValue ?? 'N/A',
      fcp: audits['first-contentful-paint']?.displayValue ?? 'N/A',
      si:  audits['speed-index']?.displayValue ?? 'N/A',
    }

    const findings = pickFindings(audits)

    const overall = Math.round(
      mobile.performance        * 0.28 +
      mobile.seo                * 0.22 +
      siteDetails.onPageScore   * 0.18 +
      mobile.accessibility      * 0.17 +
      siteDetails.securityScore * 0.15
    )

    const report = {
      url: normalizedUrl,
      mobile, desktop, vitals, findings,
      onPage: siteDetails,
      security: { securityScore: siteDetails.securityScore, security: siteDetails.security },
      overall,
      grades: {
        performance:   grade(mobile.performance),
        seo:           grade(mobile.seo),
        accessibility: grade(mobile.accessibility),
        bestPractices: grade(mobile.bestPractices),
        onPage:        grade(siteDetails.onPageScore),
        security:      grade(siteDetails.securityScore),
        overall:       grade(overall),
      },
      scannedAt: new Date().toISOString(),
    }

    const name = [firstName, lastName].filter(Boolean).join(' ') || 'Website Owner'

    // Send email (non-blocking — don't await)
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        access_key: 'f9503ab1-7d32-422c-8a02-d5fd920116b9',
        subject: `🔍 Website Audit — ${normalizedUrl} (${grade(overall).label})`,
        from_name: name,
        email,
        message: buildEmail({ name, email, phone, url: normalizedUrl, report }),
      }),
    }).catch(() => {})

    return NextResponse.json({ success: true, report })
  } catch (err) {
    console.error('Audit error:', err)
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
