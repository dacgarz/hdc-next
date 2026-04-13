'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import AnimatedLogo from './frontpage-v2/AnimatedLogo'
import s from './frontpage-v2/v2.module.css'

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [formType, setFormType] = useState('')
  const openModal = (t) => { setFormType(t); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setFormType('') }

  const heroRef = useRef(null)
  const [heroVisible, setHeroVisible] = useState(true)

  // Hide header logo while hero is on screen
  useEffect(() => {
    const el = heroRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Scroll reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add(s.visible); observer.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('[data-reveal]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const services = [
    { num: '01', href: '/services/web-design-development', title: 'Web Design & Development', desc: 'Modern, blazing-fast websites built with cutting-edge technology. Your site will load instantly and look stunning on every device.' },
    { num: '02', href: '/services/seo-content',            title: 'SEO & Content Strategy',   desc: 'Strategic SEO and blog content that puts you on the map. We help customers discover your business when they search for what you offer.' },
    { num: '03', href: '/services/website-maintenance',    title: 'Website Maintenance',       desc: 'Monthly security checks, updates, and reliable hosting. Sleep easy knowing your site is protected, backed up, and performing at its best.' },
    { num: '04', href: '/services/ecommerce',              title: 'E-Commerce',                desc: "We build online stores on BigCommerce, Shopify, Squarespace, or WordPress. Whatever platform fits your needs, we've got the expertise." },
    { num: '05', href: '/services/consultation',           title: 'Strategic Consultation',    desc: "Not sure where to start? Book a consultation and we'll map out the perfect digital strategy for your business goals and budget." },
  ]

  return (
    <div className={s.page}>
      <Header onOpenModal={openModal} hideHeaderLogo={heroVisible} />
      <ContactModal isOpen={modalOpen} onClose={closeModal} formType={formType} />

      {/* ── HERO ── */}
      <section ref={heroRef} className={s.hero}>
        <div className={s.heroInner}>
          <div className={s.heroLeft}>
            <div className={s.eyebrow}>
              <span className={s.dot} />
              Boutique Web Studio · Hollywood, FL
            </div>
            <h1 className={s.headline}>
              <span>Fueling Your</span>
              <span>Path to <em>Success</em></span>
              <span>Through Web Design</span>
              <span>&amp; Development.</span>
            </h1>
            <p className={s.heroSub}>
              Ready to make your mark online? Welcome to Honeyfoot Digital Co. — your boutique partner
              for high-performance websites. From concept to launch, design, hosting, and maintenance,
              we&apos;ve got you covered from start to finish.
            </p>
            <div className={s.heroCtas}>
              <a href="tel:3057070889" className={s.btnPrimary}>
                <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Call for a Free Consultation
              </a>
              <Link href="/contact" className={s.btnGhost}>
                Send a Message
                <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>
          </div>

          <div className={s.heroRight}>
            <AnimatedLogo />
          </div>
        </div>
      </section>

      {/* ── PROOF ── */}
      <div className={s.proof}>
        {[['100%','Custom Builds'],['5★','Client Satisfaction'],['Fast Load','Google Ready'],['1 Call','To Get Started']].map(([n, l], i) => (
          <div key={l} className={`${s.proofItem} ${s.reveal}`} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
            <div className={s.proofNum}>{n}</div>
            <div className={s.proofLbl}>{l}</div>
          </div>
        ))}
      </div>

      {/* ── SERVICES ── */}
      <section className={s.services} id="services">
        <div className={s.servicesInner}>
          <div className={`${s.servicesHdr} ${s.reveal}`} data-reveal>
            <span className={s.tag}>What We Offer</span>
            <h2>Everything Your Website Needs</h2>
          </div>
          <div className={s.servicesList}>
            {services.map(({ num, href, title, desc }, i) => (
              <Link
                key={href}
                href={href}
                className={`${s.serviceRow} ${s.reveal}`}
                data-reveal
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className={s.serviceNum}>{num}</span>
                <div className={s.serviceBody}>
                  <div className={s.serviceTitle}>{title}</div>
                  <div className={s.serviceDesc}>{desc}</div>
                </div>
                <svg className={s.serviceArrow} viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            ))}
          </div>
          <div className={`${s.servicesCta} ${s.reveal}`} data-reveal>
            <button className={s.btnPrimary} onClick={() => openModal("Let's Collaborate")}>
              Let&apos;s Collaborate
            </button>
          </div>
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className={s.why} id="why">
        <div className={s.whyInner}>
          <div className={`${s.whyQuoteBlock} ${s.reveal}`} data-reveal>
            <div className={s.quoteMark}>&ldquo;</div>
            <p className={s.quoteText}>HoneyFoot Digital Co. excels at turning your website dreams into reality. Professional, detail-oriented, and competent throughout the process of our collaboration.</p>
            <div className={s.quoteAuthor}>— Happy Client, Chicago</div>
            <div className={s.quoteStars}>★★★★★</div>
          </div>

          <div className={s.whyGrid}>
            <div className={`${s.whyLeft} ${s.reveal}`} data-reveal>
              <span className={s.tag}>Why Honeyfoot</span>
              <h2>We Work With You,<br />Not Around You.</h2>
              <p>Boutique means you work directly with the people building your site. No account managers, no handoffs, no guessing games. A decade of experience that treats your project like their own.</p>
              <a href="tel:3057070889" className={s.btnPrimary}>
                <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Get Your Free Consultation
              </a>
            </div>
            <ul className={`${s.whyPoints} ${s.reveal}`} data-reveal style={{ transitionDelay: '100ms' }}>
              {[
                ['WordPress experts since 2015', 'A decade of builds across every industry.'],
                ['React & modern JavaScript', 'Blazing-fast custom sites alongside WordPress.'],
                ['Direct developer access', 'No middlemen, no communication gaps.'],
                ['Concept to launch', 'Design, dev, hosting, SEO, and maintenance — all handled.'],
                ['Local South Florida team', 'Hollywood, FL based and available when you need us.'],
              ].map(([strong, rest]) => (
                <li key={strong}>
                  <div className={s.chk}><svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg></div>
                  <div><strong>{strong}</strong> — {rest}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={s.cta}>
        <div className={`${s.ctaInner} ${s.reveal}`} data-reveal>
          <h2>Ready to Get Started?</h2>
          <p>Let&apos;s create something amazing together.</p>
          <a href="tel:3057070889" className={s.phoneBig}>
            <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            (305) 707-0889
          </a>
          <span className={s.phoneHint}>Tap to call · Mon–Fri · We pick up</span>
          <Link href="/contact" className={s.btnGhost}>
            Send Us a Message
            <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
