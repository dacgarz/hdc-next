'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import Link from 'next/link'
import s from '../services.module.css'

export default function MaintenancePage() {
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
            <div className={s.eyebrow}><span className={s.dot} />Website Maintenance &amp; Hosting</div>
            <h1>Your Site, <em>Taken Care Of</em><br />So You Don&apos;t Have To</h1>
            <p className={s.heroSub}>Monthly security checks, updates, backups, and reliable hosting — all handled by the same team that built your site. Sleep easy knowing we&apos;re watching over it.</p>
            <div className={s.heroCtas}>
              <button className={s.btnPrimary} onClick={() => openModal("Let's Collaborate")}>
                Get a Maintenance Plan
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
              <div className={s.badgeNum}>99.9%</div>
              <div className={s.badgeLbl}>Uptime Target</div>
            </div>
            <div className={s.badgeSep} />
            <div className={s.badgeStat}>
              <div className={s.badgeNum}>Daily</div>
              <div className={s.badgeLbl}>Backups</div>
            </div>
            <div className={s.badgeSep} />
            <div className={s.badgeStat}>
              <div className={s.badgeNum}>24hr</div>
              <div className={s.badgeLbl}>Response Time</div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY IT MATTERS */}
      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className={s.sectionInner}>
          <div className={s.sectionHdr}>
            <div className={s.sectionTag}>Why It Matters</div>
            <h2>An Unmaintained Site Is a<br /><span>Liability, Not an Asset</span></h2>
            <p>Outdated plugins, expired SSL certificates, unpatched vulnerabilities — a neglected site is one incident away from costing you far more than a maintenance plan ever would.</p>
          </div>
          <div className={s.featureGrid}>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg></div>
              <h3>Security Monitoring</h3>
              <p>We scan for malware, monitor for unusual activity, and patch vulnerabilities before they become breaches. Your site and your visitors stay protected.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg></div>
              <h3>Plugin &amp; CMS Updates</h3>
              <p>Outdated WordPress plugins are the #1 cause of hacked websites. We keep everything updated, tested, and compatible so nothing breaks unexpectedly.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg></div>
              <h3>Daily Backups</h3>
              <p>Your site is backed up every day — off-site and redundant. If anything ever goes wrong, we can restore to a clean version in minutes, not hours.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg></div>
              <h3>Uptime Monitoring</h3>
              <p>We get alerted the moment your site goes down — not when a customer tells you. Fast response means minimal impact to your business.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg></div>
              <h3>Performance Optimization</h3>
              <p>Monthly speed audits to catch slowdowns before they hurt your rankings. We tune caching, images, and server config to keep your Core Web Vitals green.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z"/><path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/><path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z"/><path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z"/><path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z"/><path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"/><path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z"/><path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z"/></svg></div>
              <h3>Content Updates</h3>
              <p>Need to change a price, update a team photo, or add a new service? Send us a request and we&apos;ll handle it — no tickets, no waiting in line.</p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <div className={s.sectionHdr}>
            <div className={s.sectionTag}>Every Plan Includes</div>
            <h2>One Monthly Fee,<br /><span>Full Peace of Mind</span></h2>
          </div>
          <div className={s.includeGrid}>
            {[
              ['Managed Hosting', 'Fast, secure hosting on premium infrastructure — included in your plan.'],
              ['SSL Certificate', 'HTTPS on every page, renewed automatically, always current.'],
              ['Daily Off-Site Backups', '30 days of restore points stored securely off your server.'],
              ['Security Scanning', 'Daily malware and vulnerability scans with instant alerts.'],
              ['Plugin & Theme Updates', 'Tested and applied on a staging environment before going live.'],
              ['Uptime Monitoring', '24/7 alerts if your site goes down — we act before you even notice.'],
              ['Monthly Speed Audit', 'Core Web Vitals checked and optimized every month.'],
              ['Priority Support', 'Direct access to your developer — not a support queue.'],
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
          <h2>Stop Worrying About<br /><span>Your Website</span></h2>
          <p>Let us handle the technical side so you can focus on running your business. Plans start at a flat monthly rate — no surprises.</p>
          <div className={s.ctaBtns}>
            <a href="tel:3057070889" className={s.btnPrimary}>
              <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.44 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.83a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Call (305) 707-0889
            </a>
            <Link href="/contact" className={s.btnGhost}>
              Get Plan Details
              <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
