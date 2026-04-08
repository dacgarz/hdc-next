'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import s from './audit.module.css'

/* ── Score Ring ── */
function ScoreRing({ score, grade, size = 80 }) {
  const r = (size / 2) - 7
  const circ = 2 * Math.PI * r
  const offset = circ - (score / 100) * circ
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={grade.color} strokeWidth="6"
        strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset}
        style={{ transform:'rotate(-90deg)', transformOrigin:'50% 50%', transition:'stroke-dashoffset 1s ease' }}
      />
      <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
        fill={grade.color} fontSize={size * 0.22} fontWeight="800" fontFamily="Poppins, sans-serif">
        {score}
      </text>
    </svg>
  )
}

/* ── Check row ── */
function CheckRow({ label, value, good, note }) {
  const ok = good !== undefined ? good : !!value
  return (
    <div className={s.checkRow}>
      <div className={ok ? s.checkOk : s.checkFail}>
        {ok
          ? <svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg>
          : <svg viewBox="0 0 12 12"><line x1="2" y1="2" x2="10" y2="10"/><line x1="10" y1="2" x2="2" y2="10"/></svg>
        }
      </div>
      <div className={s.checkContent}>
        <span className={s.checkLabel}>{label}</span>
        {note && <span className={s.checkNote}>{note}</span>}
      </div>
      <div className={s.checkValue} style={{ color: ok ? '#4ade80' : '#fb923c' }}>
        {value !== undefined ? String(value) : (ok ? 'Pass' : 'Fail')}
      </div>
    </div>
  )
}

/* ── Full report card ── */
function ReportCard({ report }) {
  const { mobile, vitals, findings, grades, onPage, security, url } = report
  const hostname = url.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <div className={s.report}>

      {/* Header */}
      <div className={s.reportHeader}>
        <div className={s.reportBadge}>Free Website Audit Report</div>
        <h2>Results for <span>{hostname}</span></h2>
        <p>Scanned just now · Powered by Google Lighthouse + custom security &amp; on-page checks</p>
      </div>

      {/* Overall */}
      <div className={s.overallCard}>
        <ScoreRing score={report.overall} grade={grades.overall} size={110} />
        <div className={s.overallText}>
          <div className={s.overallLabel}>Overall Score</div>
          <div className={s.overallGrade} style={{ color: grades.overall.color }}>
            {grades.overall.label}
          </div>
          <p>Weighted across performance, SEO, accessibility, on-page, and security checks.</p>
        </div>
      </div>

      {/* 6-category score grid */}
      <div className={s.scoreGrid}>
        {[
          { key: 'performance',   label: 'Performance',   score: mobile.performance,        grade: grades.performance },
          { key: 'seo',           label: 'SEO',           score: mobile.seo,                grade: grades.seo },
          { key: 'accessibility', label: 'Accessibility', score: mobile.accessibility,      grade: grades.accessibility },
          { key: 'bestPractices', label: 'Best Practices',score: mobile.bestPractices,      grade: grades.bestPractices },
          { key: 'onPage',        label: 'On-Page SEO',   score: onPage?.onPageScore ?? 0,  grade: grades.onPage },
          { key: 'security',      label: 'Security',      score: security?.securityScore??0,grade: grades.security },
        ].map(({ key, label, score, grade }) => (
          <div key={key} className={s.scoreCard}>
            <ScoreRing score={score} grade={grade} size={72} />
            <div className={s.scoreLabel}>{label}</div>
            <div className={s.scoreGradeLbl} style={{ color: grade.color }}>{grade.label}</div>
          </div>
        ))}
      </div>

      {/* Core Web Vitals */}
      <div className={s.block}>
        <div className={s.blockTitle}>
          <svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          Core Web Vitals <span>(Mobile)</span>
        </div>
        <div className={s.vitalsGrid}>
          {[
            ['LCP', vitals.lcp, 'Largest Contentful Paint — how fast main content loads'],
            ['TBT', vitals.tbt, 'Total Blocking Time — how long the page is unresponsive'],
            ['CLS', vitals.cls, 'Cumulative Layout Shift — how stable your layout is'],
            ['FCP', vitals.fcp, 'First Contentful Paint — when first content appears'],
            ['SI',  vitals.si,  'Speed Index — how quickly content is visually complete'],
          ].map(([abbr, val, desc]) => (
            <div key={abbr} className={s.vitalItem}>
              <div className={s.vitalAbbr}>{abbr}</div>
              <div className={s.vitalVal}>{val}</div>
              <div className={s.vitalDesc}>{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* On-Page SEO */}
      {onPage?.ok && (
        <div className={s.block}>
          <div className={s.blockTitle}>
            <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            On-Page SEO Checks
          </div>
          <div className={s.checksGrid}>
            <CheckRow label="Title tag" good={!!onPage.title}
              note={onPage.title ? `"${onPage.title.slice(0,50)}${onPage.title.length>50?'…':''}" · ${onPage.titleLength} chars (ideal 30–70)` : 'Missing — this is a critical SEO issue'} />
            <CheckRow label="Meta description" good={!!onPage.metaDesc}
              note={onPage.metaDesc ? `${onPage.metaDescLength} chars (ideal 100–165)` : 'Missing — add a description to improve click-through rates'} />
            <CheckRow label="H1 heading" good={onPage.h1s >= 1}
              note={onPage.h1s === 1 ? 'Exactly 1 H1 found — perfect' : onPage.h1s === 0 ? 'No H1 found — every page needs one' : `${onPage.h1s} H1 tags found — use only one per page`} />
            <CheckRow label="Canonical URL" good={onPage.canonical}
              note={onPage.canonical ? 'Canonical tag present' : 'Add a canonical tag to prevent duplicate content issues'} />
            <CheckRow label="OG image" good={onPage.ogImage}
              note={onPage.ogImage ? 'Social preview image set' : 'No OG image — links shared on social will have no preview'} />
            <CheckRow label="Schema markup" good={onPage.schemaOrg}
              note={onPage.schemaOrg ? 'Structured data detected' : 'No schema.org markup — add it to improve rich search results'} />
            <CheckRow label="Page indexable" good={onPage.isIndexable}
              note={onPage.isIndexable ? 'Robots meta allows indexing' : 'noindex detected — Google cannot index this page'} />
            <CheckRow label="Image alt text" good={onPage.imgsWithoutAlt === 0}
              note={onPage.imgsTotal === 0 ? 'No images found' : `${onPage.imgsWithAlt}/${onPage.imgsTotal} images have alt text`} />
          </div>
        </div>
      )}

      {/* Security */}
      <div className={s.block}>
        <div className={s.blockTitle}>
          <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          Security Headers
        </div>
        <div className={s.checksGrid}>
          <CheckRow label="HTTPS / SSL" good={security?.security?.https}
            note={security?.security?.https ? 'Site is served over HTTPS' : 'No HTTPS — this is a critical security and SEO issue'} />
          <CheckRow label="HSTS" good={security?.security?.hsts}
            note={security?.security?.hsts ? 'Strict-Transport-Security header present' : 'Missing HSTS — browsers can be forced onto HTTP'} />
          <CheckRow label="X-Frame-Options" good={security?.security?.xFrame}
            note={security?.security?.xFrame ? 'Clickjacking protection active' : 'Missing — site may be vulnerable to clickjacking'} />
          <CheckRow label="X-Content-Type-Options" good={security?.security?.xContentType}
            note={security?.security?.xContentType ? 'MIME sniffing protection active' : 'Missing X-Content-Type-Options header'} />
          <CheckRow label="Content Security Policy" good={security?.security?.csp}
            note={security?.security?.csp ? 'CSP header present' : 'No CSP — consider adding to reduce XSS risk'} />
          <CheckRow label="Referrer-Policy" good={security?.security?.referrerPolicy}
            note={security?.security?.referrerPolicy ? 'Referrer-Policy header present' : 'Missing Referrer-Policy header'} />
        </div>
      </div>

      {/* PageSpeed findings */}
      {findings.length > 0 && (
        <div className={s.block}>
          <div className={s.blockTitle}>
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            Top Performance Issues
          </div>
          {findings.map((f, i) => (
            <div key={f.id} className={s.finding}>
              <div className={s.findingNum}>{String(i + 1).padStart(2, '0')}</div>
              <div className={s.findingBody}>
                <div className={s.findingTitle}>{f.title}</div>
                <div className={s.findingDesc}>{f.description}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* CTA */}
      <div className={s.reportCta}>
        <h3>Want us to fix these issues for you?</h3>
        <p>We&apos;ll walk through every finding on a free call and give you a clear action plan.</p>
        <div className={s.reportCtaBtns}>
          <a href="tel:3057070889" className={s.btnPrimary}>
            <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            Call (305) 707-0889
          </a>
          <Link href="/contact" className={s.btnGhost}>
            Send Us a Message
            <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </div>

    </div>
  )
}

/* ── Page ── */
export default function FreeAuditPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [formType, setFormType] = useState('')
  const openModal = (t) => { setFormType(t); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setFormType('') }

  const [formData, setFormData] = useState({ url: '', firstName: '', lastName: '', email: '', phone: '' })
  const [focused, setFocused]   = useState(null)
  const [status, setStatus]     = useState('idle') // idle | loading | success | error
  const [report, setReport]     = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res  = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (!res.ok || !data.success) {
        setErrorMsg(data.error || 'Something went wrong. Please try again.')
        setStatus('error')
        return
      }

      setReport(data.report)
      setStatus('success')
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  return (
    <div className={s.page}>
      <Header onOpenModal={openModal} />
      <ContactModal isOpen={modalOpen} onClose={closeModal} formType={formType} />

      {status === 'success' && report ? (
        <div className={s.reportWrap}>
          <ReportCard report={report} />
        </div>
      ) : (
        <>
          {/* HERO */}
          <section className={s.hero}>
            <div className={s.heroBg}>
              <div className={s.orb1} /><div className={s.orb2} />
            </div>
            <div className={s.heroContent}>
              <div className={s.eyebrow}>
                <span className={s.dot} />
                Free · Instant · No Credit Card
              </div>
              <h1>Get Your Free<br /><em>Website Audit</em></h1>
              <p>
                Enter your URL and we&apos;ll instantly scan your site across 6 categories —
                speed, SEO, accessibility, security, and more.
              </p>
              <div className={s.featureRow}>
                {[
                  ['Site Speed',       'Performance scores + Core Web Vitals on mobile & desktop'],
                  ['SEO Health',        'Technical SEO + on-page checks: title, meta, H1, schema'],
                  ['Accessibility',     'WCAG compliance scored by Google Lighthouse'],
                  ['Security Headers', 'HTTPS, HSTS, CSP, X-Frame-Options and more'],
                  ['On-Page SEO',      'Title, meta description, H1, canonical, OG image, schema'],
                  ['Best Practices',   'Modern web standards, HTTPS usage, and image formats'],
                ].map(([title, desc]) => (
                  <div key={title} className={s.feature}>
                    <div className={s.featureCheck}>
                      <svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg>
                    </div>
                    <div>
                      <strong>{title}</strong>
                      <span>{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FORM */}
          <section className={s.formSection}>
            <div className={s.formCard}>
              <div className={s.formHeader}>
                <h2>Analyze Your Website</h2>
                <p>Takes 20–40 seconds. Results appear instantly on this page.</p>
              </div>

              {status === 'error' && (
                <div className={s.errorBanner}>{errorMsg}</div>
              )}

              <form onSubmit={handleSubmit} className={s.form} noValidate>
                <div className={`${s.urlField} ${focused === 'url' ? s.focused : ''} ${formData.url ? s.filled : ''}`}>
                  <label htmlFor="url">
                    <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    Your Website URL <span>*</span>
                  </label>
                  <input type="text" id="url" name="url" value={formData.url} onChange={handleChange}
                    onFocus={() => setFocused('url')} onBlur={() => setFocused(null)}
                    placeholder="https://yourwebsite.com" required autoComplete="url" />
                </div>

                <div className={s.row}>
                  <div className={`${s.field} ${focused === 'firstName' ? s.focused : ''} ${formData.firstName ? s.filled : ''}`}>
                    <label htmlFor="firstName">First Name <span>*</span></label>
                    <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange}
                      onFocus={() => setFocused('firstName')} onBlur={() => setFocused(null)} required />
                  </div>
                  <div className={`${s.field} ${focused === 'lastName' ? s.focused : ''} ${formData.lastName ? s.filled : ''}`}>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange}
                      onFocus={() => setFocused('lastName')} onBlur={() => setFocused(null)} />
                  </div>
                </div>

                <div className={s.row}>
                  <div className={`${s.field} ${focused === 'email' ? s.focused : ''} ${formData.email ? s.filled : ''}`}>
                    <label htmlFor="email">Email Address <span>*</span></label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange}
                      onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} required />
                  </div>
                  <div className={`${s.field} ${focused === 'phone' ? s.focused : ''} ${formData.phone ? s.filled : ''}`}>
                    <label htmlFor="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange}
                      onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} />
                  </div>
                </div>

                <button type="submit" className={s.submit} disabled={status === 'loading'}>
                  {status === 'loading' ? (
                    <><div className={s.spinner} />Analyzing your website — this takes ~30 seconds…</>
                  ) : (
                    <>Run My Free Audit <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>
                  )}
                </button>

                <p className={s.disclaimer}>
                  No spam. Your info is only used to send your report and follow up if you&apos;d like help.
                </p>
              </form>
            </div>

            {/* Sidebar */}
            <div className={s.sidebar}>
              <div className={s.sideCard}>
                <div className={s.sideStars}>★★★★★</div>
                <p>&ldquo;Honeyfoot found issues my developer missed. The audit paid for itself before we even hired them.&rdquo;</p>
                <div className={s.sideAuthor}>— Business Owner, South Florida</div>
              </div>
              <div className={s.sideStats}>
                {[['6', 'Categories checked'], ['30s', 'Average scan time'], ['Free', 'No catch']].map(([n, l]) => (
                  <div key={l} className={s.sideStat}>
                    <div className={s.sideStatNum}>{n}</div>
                    <div className={s.sideStatLbl}>{l}</div>
                  </div>
                ))}
              </div>
              <div className={s.sideContact}>
                <p>Prefer to talk first?</p>
                <a href="tel:3057070889" className={s.sidePhone}>(305) 707-0889</a>
                <span>Mon – Fri · 9am – 6pm EST</span>
              </div>
            </div>
          </section>
        </>
      )}

      <Footer />
    </div>
  )
}
