'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import Link from 'next/link'
import s from '../services.module.css'

export default function ConsultationPage() {
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
            <div className={s.eyebrow}><span className={s.dot} />Strategic Web Consultation</div>
            <h1>Not Sure Where<br />to <em>Start Online?</em></h1>
            <p className={s.heroSub}>Skip the guesswork. A single consultation with our team gives you a clear, actionable digital roadmap — tailored to your business, budget, and goals. No jargon, no upsells.</p>
            <div className={s.heroCtas}>
              <button className={s.btnPrimary} onClick={() => openModal('Get An Assessment')}>
                Book a Free Call
                <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
              <Link href="/contact" className={s.btnGhost}>
                Send Us Your Questions
                <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>
          </div>
          <div className={s.heroBadge}>
            <div className={s.badgeStat}>
              <div className={s.badgeNum}>Free</div>
              <div className={s.badgeLbl}>First Consultation</div>
            </div>
            <div className={s.badgeSep} />
            <div className={s.badgeStat}>
              <div className={s.badgeNum}>30min</div>
              <div className={s.badgeLbl}>That&apos;s All It Takes</div>
            </div>
            <div className={s.badgeSep} />
            <div className={s.badgeStat}>
              <div className={s.badgeNum}>10+</div>
              <div className={s.badgeLbl}>Years of Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className={s.sectionInner}>
          <div className={s.sectionHdr}>
            <div className={s.sectionTag}>What You Walk Away With</div>
            <h2>One Call, a Clear<br /><span>Path Forward</span></h2>
            <p>We don&apos;t do vague advice. Every consultation ends with real, specific recommendations you can act on — whether you work with us or not.</p>
          </div>
          <div className={s.featureGrid}>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg></div>
              <h3>A Prioritized Action Plan</h3>
              <p>We map out exactly what to fix, build, or change — ranked by the biggest impact on your business goals. You know where to start and why.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
              <h3>Honest Site Assessment</h3>
              <p>We review your current website (if you have one) and tell you plainly what&apos;s working, what&apos;s hurting you, and what needs to go.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
              <h3>Platform Recommendation</h3>
              <p>WordPress, Shopify, React, Squarespace — we explain the tradeoffs in plain English and tell you which platform makes the most sense for your situation.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg></div>
              <h3>Realistic Budget Guidance</h3>
              <p>We give you an honest picture of what things actually cost so you can plan properly — no sticker shock, no surprises after you&apos;ve committed.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg></div>
              <h3>Local SEO Snapshot</h3>
              <p>A quick look at how you&apos;re showing up in local search — and what the fastest improvements would be to get more customers finding you organically.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg></div>
              <h3>No Sales Pressure</h3>
              <p>This is a conversation, not a pitch. You&apos;ll talk directly with the person who would build your site — and we&apos;ll be honest about whether we&apos;re actually the right fit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <div className={s.sectionHdr}>
            <div className={s.sectionTag}>Who This Is For</div>
            <h2>You&apos;re in the Right Place<br /><span>If You&apos;re Thinking&hellip;</span></h2>
          </div>
          <div className={s.includeGrid}>
            {[
              ['"I need a website but don\'t know where to start."', 'We\'ll walk you through everything — platforms, costs, timelines, and what actually matters for your type of business.'],
              ['"My current site isn\'t doing anything for me."', 'We\'ll diagnose exactly why and give you a concrete plan to fix it — whether that means a refresh or a full rebuild.'],
              ['"I\'ve been burned by agencies before."', 'We get it. This call lets you ask every question you were afraid to ask — and see if we\'re worth your trust before committing.'],
              ['"I have a budget but I\'m not sure how to spend it."', 'We\'ll help you allocate it where it creates the most impact — instead of overpaying for things that won\'t move the needle.'],
              ['"I need to know if SEO is worth it for my business."', 'Honest answer: sometimes yes, sometimes there\'s a better channel first. We\'ll tell you which applies to you.'],
              ['"I want to sell online but don\'t know the right platform."', 'We\'ve built on all the major platforms. We\'ll tell you exactly which one fits your product type and budget.'],
            ].map(([title, desc]) => (
              <div key={title} className={s.includeItem}>
                <div className={s.chk}><svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3"/></svg></div>
                <div className={s.includeText}><strong>{title}</strong>{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={s.cta}>
        <div className={s.ctaInner}>
          <h2>Book Your Free<br /><span>30-Minute Call</span></h2>
          <p>No commitment, no pitch. Just a real conversation with someone who builds websites for a living and will give you honest advice — for free.</p>
          <div className={s.ctaBtns}>
            <a href="tel:3057070889" className={s.btnPrimary}>
              <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call (305) 707-0889
            </a>
            <button className={s.btnGhost} onClick={() => openModal('Get An Assessment')}>
              Request a Callback
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
