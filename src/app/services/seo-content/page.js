'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import Link from 'next/link'
import s from '../services.module.css'

export default function SeoPage() {
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
            <div className={s.eyebrow}><span className={s.dot} />SEO &amp; Content Strategy</div>
            <h1>Get Found by the<br /><em>Customers Who Matter</em></h1>
            <p className={s.heroSub}>Strategic SEO and content that puts your business at the top of search results — and keeps it there. We focus on rankings that drive real revenue, not just traffic.</p>
            <div className={s.heroCtas}>
              <button className={s.btnPrimary} onClick={() => openModal('Get An Assessment')}>
                Get a Free SEO Assessment
                <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
              <Link href="/contact" className={s.btnGhost}>
                Talk to Us First
                <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>
          </div>
          <div className={s.heroBadge}>
            <div className={s.badgeStat}>
              <div className={s.badgeNum}>#1</div>
              <div className={s.badgeLbl}>Goal: Page One</div>
            </div>
            <div className={s.badgeSep} />
            <div className={s.badgeStat}>
              <div className={s.badgeNum}>Local</div>
              <div className={s.badgeLbl}>SEO Specialists</div>
            </div>
            <div className={s.badgeSep} />
            <div className={s.badgeStat}>
              <div className={s.badgeNum}>Free</div>
              <div className={s.badgeLbl}>Site Audit Included</div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className={s.sectionInner}>
          <div className={s.sectionHdr}>
            <div className={s.sectionTag}>What We Do</div>
            <h2>SEO That Goes Beyond<br /><span>Just Keywords</span></h2>
            <p>Real SEO is technical, strategic, and ongoing. We cover every layer so your site earns — and keeps — top rankings.</p>
          </div>
          <div className={s.featureGrid}>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
              <h3>Keyword Research</h3>
              <p>We find the exact terms your ideal customers are searching — then build a strategy around ranking for the ones that drive conversions, not just clicks.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div>
              <h3>On-Page Optimization</h3>
              <p>Titles, meta descriptions, heading hierarchy, internal linking, image alt text — every page optimized to tell Google exactly what it&apos;s about.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <h3>Local SEO</h3>
              <p>Dominate &quot;near me&quot; searches and Google Maps. We optimize your Google Business Profile, local citations, and location pages so nearby customers find you first.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
              <h3>Technical SEO</h3>
              <p>Site speed, Core Web Vitals, crawlability, structured data, and canonical tags — the behind-the-scenes work that most agencies skip but Google always notices.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg></div>
              <h3>Content Strategy &amp; Writing</h3>
              <p>We create blog posts, landing pages, and service content that ranks and converts. Strategic, well-researched content that positions you as the authority in your industry.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg></div>
              <h3>Monthly Reporting</h3>
              <p>Clear, plain-English reports every month — rankings, traffic, leads, and what we&apos;re working on next. No vanity metrics, no smoke and mirrors.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <div className={s.sectionHdr}>
            <div className={s.sectionTag}>Every Plan Includes</div>
            <h2>No Hidden Work,<br /><span>No Hidden Fees</span></h2>
          </div>
          <div className={s.includeGrid}>
            {[
              ['Full Site SEO Audit', 'We start by diagnosing exactly what\'s holding your current site back.'],
              ['Google Business Profile Setup', 'Optimized profile, photos, posts, and Q&A to dominate local results.'],
              ['Competitor Analysis', 'We study who\'s outranking you and build a plan to beat them.'],
              ['Target Keyword List', 'A prioritized list of keywords aligned with your actual revenue goals.'],
              ['Page-by-Page Optimization', 'Every existing page updated for maximum search visibility.'],
              ['Schema Markup', 'Structured data that helps Google display rich results for your listings.'],
              ['Link Building Strategy', 'Earned backlinks from relevant, authoritative sources in your niche.'],
              ['Content Calendar', 'A monthly plan for blog topics that target high-value search intent.'],
            ].map(([title, desc]) => (
              <div key={title} className={s.includeItem}>
                <div className={s.chk}><svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg></div>
                <div className={s.includeText}><strong>{title}</strong>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className={s.sectionInner}>
          <div className={s.sectionHdr}>
            <div className={s.sectionTag}>How We Work</div>
            <h2>A Process Built for<br /><span>Lasting Results</span></h2>
          </div>
          <div className={s.steps}>
            <div className={s.step}>
              <div className={s.stepNum}>01</div>
              <div className={s.stepContent}>
                <h3>Free SEO Audit</h3>
                <p>We run a full technical and content audit of your site — identifying every issue, opportunity, and quick win before we even start.</p>
              </div>
            </div>
            <div className={s.step}>
              <div className={s.stepNum}>02</div>
              <div className={s.stepContent}>
                <h3>Strategy Session</h3>
                <p>We present our findings and a custom roadmap: which pages to optimize first, what content to create, and what to expect in 30/60/90 days.</p>
              </div>
            </div>
            <div className={s.step}>
              <div className={s.stepNum}>03</div>
              <div className={s.stepContent}>
                <h3>Implementation</h3>
                <p>We get to work — optimizing pages, fixing technical issues, publishing content, and building the authority your site needs to climb rankings.</p>
              </div>
            </div>
            <div className={s.step}>
              <div className={s.stepNum}>04</div>
              <div className={s.stepContent}>
                <h3>Monitor &amp; Adjust</h3>
                <p>SEO is not set-and-forget. We track rankings, analyze what&apos;s working, and iterate every month based on real data.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={s.cta}>
        <div className={s.ctaInner}>
          <h2>Let&apos;s See Where Your Site<br /><span>Stands Today</span></h2>
          <p>We offer a free SEO assessment for new clients — no strings attached. You&apos;ll walk away knowing exactly what&apos;s working and what needs to change.</p>
          <div className={s.ctaBtns}>
            <button className={s.btnPrimary} onClick={() => openModal('Get An Assessment')}>
              Get My Free Assessment
              <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <a href="tel:3057070889" className={s.btnGhost}>
              Call (305) 707-0889
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
