'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import Link from 'next/link'
import s from '../services.module.css'

export default function WebDesignPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const [formType, setFormType] = useState('')
  const openModal = (t) => { setFormType(t); setModalOpen(true) }
  const closeModal = () => { setModalOpen(false); setFormType('') }

  return (
    <div className={s.page}>
      <Header onOpenModal={openModal} />
      <ContactModal isOpen={modalOpen} onClose={closeModal} formType={formType} />

      {/* HERO */}
      <section className={s.hero}>
        <div className={s.heroBg}>
          <div className={s.orbA} />
          <div className={s.orbB} />
        </div>
        <div className={s.heroInner}>
          <div className={s.heroContent}>
            <div className={s.eyebrow}><span className={s.dot} />Web Design &amp; Development</div>
            <h1>Websites Built to<br /><em>Perform &amp; Convert</em></h1>
            <p className={s.heroSub}>From WordPress to custom React, we design and build high-performance websites that load fast, look stunning on every device, and turn visitors into paying customers.</p>
            <div className={s.heroCtas}>
              <button className={s.btnPrimary} onClick={() => openModal("Let's Collaborate")}>
                Start Your Project
                <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
              <Link href="/contact" className={s.btnGhost}>
                Ask a Question
                <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>
          </div>
          <div className={s.heroBadge}>
            <div className={s.badgeStat}>
              <div className={s.badgeNum}>10+</div>
              <div className={s.badgeLbl}>Years Building</div>
            </div>
            <div className={s.badgeSep} />
            <div className={s.badgeStat}>
              <div className={s.badgeNum}>5★</div>
              <div className={s.badgeLbl}>Rated Agency</div>
            </div>
            <div className={s.badgeSep} />
            <div className={s.badgeStat}>
              <div className={s.badgeNum}>100%</div>
              <div className={s.badgeLbl}>Custom Builds</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className={s.sectionInner}>
          <div className={s.sectionHdr}>
            <div className={s.sectionTag}>What You Get</div>
            <h2>Everything a High-Performance<br /><span>Website Needs</span></h2>
            <p>We don&apos;t use templates or page builders. Every site is crafted from scratch around your brand and goals.</p>
          </div>
          <div className={s.featureGrid}>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
              <h3>Blazing Fast Load Times</h3>
              <p>Every site is optimized for Core Web Vitals. Fast sites rank higher, convert better, and keep visitors engaged.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg></div>
              <h3>Mobile-First Design</h3>
              <p>Over 60% of web traffic is mobile. We design for mobile first, then scale up — so your site looks perfect everywhere.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
              <h3>SEO Built Into Every Page</h3>
              <p>Semantic HTML, clean code, structured data, and proper metadata — your site is ready to rank from day one.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
              <h3>Secure &amp; Reliable</h3>
              <p>SSL certificates, secure coding practices, and regular backups built in from the start — not bolted on after.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg></div>
              <h3>Your Brand, Not Ours</h3>
              <p>Every pixel is aligned with your brand identity. We present visual directions before a single line of code is written.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
              <h3>Built for You to Manage</h3>
              <p>We build sites you can actually update. Whether it&apos;s WordPress with a custom theme or a React CMS, you stay in control.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <div className={s.sectionHdr}>
            <div className={s.sectionTag}>Our Stack</div>
            <h2>We Build On the<br /><span>Right Platform for You</span></h2>
            <p>Not every business needs the same tech. We recommend the stack that fits your budget, timeline, and growth goals.</p>
          </div>
          <div className={s.featureGrid}>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg></div>
              <h3>React &amp; Next.js</h3>
              <p>For businesses that need maximum performance, custom functionality, and a site that can scale without limits. Blazing fast, SEO-ready out of the box.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg></div>
              <h3>WordPress</h3>
              <p>Custom WordPress themes — no page builders, no bloat. A powerful CMS that lets you update content, add pages, and grow at your own pace.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
              <h3>Headless CMS</h3>
              <p>The speed of a static site with the content management of a full CMS. Ideal for content-heavy businesses that need both performance and flexibility.</p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className={s.sectionInner}>
          <div className={s.sectionHdr}>
            <div className={s.sectionTag}>How It Works</div>
            <h2>From First Call to<br /><span>Live Launch</span></h2>
          </div>
          <div className={s.steps}>
            <div className={s.step}>
              <div className={s.stepNum}>01</div>
              <div className={s.stepContent}>
                <h3>Discovery Call</h3>
                <p>We learn about your business, your goals, your audience, and what success looks like for you. No templates — your site starts with your story.</p>
              </div>
            </div>
            <div className={s.step}>
              <div className={s.stepNum}>02</div>
              <div className={s.stepContent}>
                <h3>Strategy &amp; Visual Direction</h3>
                <p>We propose a site structure, wireframes, and visual mood — colors, typography, and layout — before writing a single line of code. You approve the direction.</p>
              </div>
            </div>
            <div className={s.step}>
              <div className={s.stepNum}>03</div>
              <div className={s.stepContent}>
                <h3>Design &amp; Development</h3>
                <p>We build your site with clean, performant code. You get regular progress updates and a staging link to review before anything goes live.</p>
              </div>
            </div>
            <div className={s.step}>
              <div className={s.stepNum}>04</div>
              <div className={s.stepContent}>
                <h3>Review &amp; Revisions</h3>
                <p>We walk through the site together, collect your feedback, and polish every detail until it&apos;s exactly right.</p>
              </div>
            </div>
            <div className={s.step}>
              <div className={s.stepNum}>05</div>
              <div className={s.stepContent}>
                <h3>Launch &amp; Handoff</h3>
                <p>We go live, monitor for any issues, and hand you everything you need — logins, documentation, and a walkthrough of how to manage your site.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={s.cta}>
        <div className={s.ctaInner}>
          <h2>Ready to Build a Site That<br /><span>Actually Works?</span></h2>
          <p>Let&apos;s talk about what you need. A 15-minute call is all it takes to get started — no pitch, no pressure.</p>
          <div className={s.ctaBtns}>
            <a href="tel:3057070889" className={s.btnPrimary}>
              <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call (305) 707-0889
            </a>
            <Link href="/contact" className={s.btnGhost}>
              Send a Message
              <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
