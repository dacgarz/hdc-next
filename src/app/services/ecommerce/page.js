'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'
import Link from 'next/link'
import s from '../services.module.css'

export default function EcommercePage() {
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
            <div className={s.eyebrow}><span className={s.dot} />E-Commerce Development</div>
            <h1>An Online Store That<br /><em>Actually Converts</em></h1>
            <p className={s.heroSub}>We build e-commerce stores on Shopify, BigCommerce, WooCommerce, and more — optimized for speed, designed for trust, and built to turn browsers into buyers.</p>
            <div className={s.heroCtas}>
              <button className={s.btnPrimary} onClick={() => openModal("Let's Collaborate")}>
                Start Your Store
                <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
              <Link href="/contact" className={s.btnGhost}>
                Discuss Your Project
                <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
            </div>
          </div>
          <div className={s.heroBadge}>
            <div className={s.badgeStat}>
              <div className={s.badgeNum}>4+</div>
              <div className={s.badgeLbl}>Platforms Supported</div>
            </div>
            <div className={s.badgeSep} />
            <div className={s.badgeStat}>
              <div className={s.badgeNum}>Fast</div>
              <div className={s.badgeLbl}>Checkout Flow</div>
            </div>
            <div className={s.badgeSep} />
            <div className={s.badgeStat}>
              <div className={s.badgeNum}>100%</div>
              <div className={s.badgeLbl}>Mobile Ready</div>
            </div>
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section className={`${s.section} ${s.sectionAlt}`}>
        <div className={s.sectionInner}>
          <div className={s.sectionHdr}>
            <div className={s.sectionTag}>Platforms We Build On</div>
            <h2>The Right Platform for<br /><span>Your Business Model</span></h2>
            <p>We recommend the platform that fits your product type, team size, and budget — not whichever one we know best.</p>
          </div>
          <div className={s.featureGrid2col}>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg></div>
              <h3>Shopify</h3>
              <p>The gold standard for product-based businesses. Fast setup, powerful apps, and a checkout that converts. Best for brands that want to move fast and scale easily.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg></div>
              <h3>BigCommerce</h3>
              <p>Built for growth. Handles complex catalogs, B2B pricing, and high-volume sales without transaction fees. Ideal for scaling businesses with large product lines.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.72m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32"/></svg></div>
              <h3>WooCommerce</h3>
              <p>Full control with WordPress at the core. Infinitely customizable and great for businesses that want a content-rich site alongside their store.</p>
            </div>
            <div className={s.featureCard}>
              <div className={s.featureIco}><svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div>
              <h3>Squarespace Commerce</h3>
              <p>Beautiful templates and simple management. Perfect for makers, creatives, and service providers selling a curated product line without technical complexity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className={s.section}>
        <div className={s.sectionInner}>
          <div className={s.sectionHdr}>
            <div className={s.sectionTag}>What We Build</div>
            <h2>Every Store Built to<br /><span>Drive Revenue</span></h2>
          </div>
          <div className={s.includeGrid}>
            {[
              ['Custom Storefront Design', 'Not a template — a branded store designed to reflect your identity and build buyer trust.'],
              ['Conversion-Optimized Checkout', 'Streamlined checkout flows that reduce cart abandonment and maximize completed orders.'],
              ['Product Page Optimization', 'Compelling layouts with social proof, clear CTAs, and persuasive copy that sells.'],
              ['Payment Gateway Integration', 'Stripe, PayPal, Apple Pay, Buy Now Pay Later — whatever your customers prefer.'],
              ['Inventory & Order Management', 'Set up your backend so managing orders, stock, and fulfillment is actually simple.'],
              ['SEO for E-Commerce', 'Product schema, category page optimization, and site structure built to rank in Google Shopping.'],
              ['Mobile Shopping Experience', 'Thumb-friendly design so customers can browse and buy on their phones with zero friction.'],
              ['Email & Analytics Integration', 'Klaviyo, Mailchimp, GA4, and Pixel integrations so you can retarget, recover carts, and grow.'],
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
            <div className={s.sectionTag}>How We Launch Your Store</div>
            <h2>From Products to<br /><span>First Sale</span></h2>
          </div>
          <div className={s.steps}>
            <div className={s.step}>
              <div className={s.stepNum}>01</div>
              <div className={s.stepContent}>
                <h3>Platform Recommendation</h3>
                <p>We review your product catalog, volume expectations, and budget — then recommend the platform that gives you the best ROI, not the most complex one.</p>
              </div>
            </div>
            <div className={s.step}>
              <div className={s.stepNum}>02</div>
              <div className={s.stepContent}>
                <h3>Store Design</h3>
                <p>Custom storefront design built around your brand: homepage, collection pages, product pages, cart, and checkout — all cohesive and conversion-focused.</p>
              </div>
            </div>
            <div className={s.step}>
              <div className={s.stepNum}>03</div>
              <div className={s.stepContent}>
                <h3>Product Setup &amp; Configuration</h3>
                <p>We set up your products, variants, pricing, shipping zones, taxes, and payment gateways — so the store is ready to sell from day one.</p>
              </div>
            </div>
            <div className={s.step}>
              <div className={s.stepNum}>04</div>
              <div className={s.stepContent}>
                <h3>Testing &amp; QA</h3>
                <p>We run full end-to-end tests — placing real test orders, checking every payment method, and verifying the entire checkout on mobile and desktop.</p>
              </div>
            </div>
            <div className={s.step}>
              <div className={s.stepNum}>05</div>
              <div className={s.stepContent}>
                <h3>Launch &amp; Training</h3>
                <p>We go live, walk you through managing your store, and stick around to address any issues in the first 30 days.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className={s.cta}>
        <div className={s.ctaInner}>
          <h2>Ready to Open Your<br /><span>Online Store?</span></h2>
          <p>Whether you&apos;re starting from scratch or migrating from another platform, let&apos;s talk about what you&apos;re selling and build the store it deserves.</p>
          <div className={s.ctaBtns}>
            <button className={s.btnPrimary} onClick={() => openModal("Let's Collaborate")}>
              Start Your Store
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
