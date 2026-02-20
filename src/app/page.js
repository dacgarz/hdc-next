'use client'

import { useEffect, useRef, useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactModal from '@/components/ContactModal'

export default function HomePage() {
  const vantaRef = useRef(null)
  const vantaEffect = useRef(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [formType, setFormType] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!vantaEffect.current && window.VANTA && vantaRef.current) {
        vantaEffect.current = window.VANTA.GLOBE({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          color: 0x00D1FF,
          color2: 0x3EB407,
          backgroundColor: 0x1D3251
        })
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      if (vantaEffect.current) {
        vantaEffect.current.destroy()
        vantaEffect.current = null
      }
    }
  }, [])

  const openModal = (type) => {
    setFormType(type)
    setModalOpen(true)
  }

  const closeModal = () => {
    setModalOpen(false)
    setFormType('')
  }

  return (
    <div className="app">
      <Header onOpenModal={openModal} />

      {/* Hero Section with Vanta Background */}
      <section className="hero" id="home" ref={vantaRef}>
        <div className="hero-content">
          <h1>Fueling Your Path to Success Through Web Design & Development</h1>
          <p className="hero-question">Ready to make your mark online?</p>
          <p className="hero-description">
            Welcome to Honeyfoot Digital Co., your boutique web development partner
            for high-performance websites. From concept to launch, we offer
            personalized solutions to enhance your online presence.
          </p>
          <p className="hero-description">
            With expertise in design, hosting, and maintenance, we&apos;ve got you covered
            from start to finish. Let&apos;s create a website that stands out and achieves your goals.
          </p>
          {/*<button className="cta-button" onClick={() => openModal('Get In Touch')}>
            Find out how!
          </button>*/}
          <a href="tel:3057070889" className="cta-button" style={{textDecoration: 'none'}}>Call for a Free Consultation</a>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="container">
          <h2>What We Offer</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="svc-ico" style={{ margin: '0 auto 10px' }}><svg viewBox="0 0 24 24"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg></div>
              <h3>Lightning-Fast React Sites</h3>
              <p>Modern, blazing-fast websites built with cutting-edge technology. Your site will load instantly and look stunning on every device.</p>
            </div>
            <div className="service-card">
              <div className="svc-ico" style={{ margin: '0 auto 10px' }}><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg></div>
              <h3>Get Found Online</h3>
              <p>Strategic SEO and blog content that puts you on the map. We help customers discover your business when they search for what you offer.</p>
            </div>
            <br className="desktop-break" />
            <div className="service-card">
              <div className="svc-ico" style={{ margin: '0 auto 10px' }}><svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg></div>
              <h3>Worry-Free Maintenance</h3>
              <p>Monthly security checks, updates, and reliable hosting. Sleep easy knowing your site is protected, backed up, and performing at its best.</p>
            </div>
            <div className="service-card">
              <div className="svc-ico" style={{ margin: '0 auto 10px' }}><svg viewBox="0 0 24 24"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg></div>
              <h3>E-Commerce That Converts</h3>
              <p>We build online stores on BigCommerce, Shopify, Squarespace, or WordPress. Whatever platform fits your needs, we&apos;ve got the expertise.</p>
            </div>
            <div className="service-card">
              <div className="svc-ico" style={{ margin: '0 auto 10px' }}><svg viewBox="0 0 24 24"><line x1="9" y1="18" x2="15" y2="18"/><line x1="10" y1="22" x2="14" y2="22"/><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14"/></svg></div>
              <h3>Strategic Consultation</h3>
              <p>Not sure where to start? Book a consultation and we&apos;ll map out the perfect digital strategy for your business goals and budget.</p>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button className="cta-button" onClick={() => openModal("Let's Collaborate")}>
              Let&apos;s Collaborate
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Let&apos;s create something amazing together</p>
          <button className="contact-button" onClick={() => openModal('Get In Touch')}>
            Get In Touch
          </button>
        </div>
      </section>

      <Footer />

      <ContactModal
        isOpen={modalOpen}
        onClose={closeModal}
        formType={formType}
      />
    </div>
  )
}
