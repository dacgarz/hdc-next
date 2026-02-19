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
          <button className="cta-button" onClick={() => openModal('Get In Touch')}>
            Find out how!
          </button>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" id="services">
        <div className="container">
          <h2>What We Offer</h2>
          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon">🚀</div>
              <h3>Lightning-Fast React Sites</h3>
              <p>Modern, blazing-fast websites built with cutting-edge technology. Your site will load instantly and look stunning on every device.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">📈</div>
              <h3>Get Found Online</h3>
              <p>Strategic SEO and blog content that puts you on the map. We help customers discover your business when they search for what you offer.</p>
            </div>
            <br className="desktop-break" />
            <div className="service-card">
              <div className="service-icon">🛡️</div>
              <h3>Worry-Free Maintenance</h3>
              <p>Monthly security checks, updates, and reliable hosting. Sleep easy knowing your site is protected, backed up, and performing at its best.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">🛒</div>
              <h3>E-Commerce That Converts</h3>
              <p>We build online stores on BigCommerce, Shopify, Squarespace, or WordPress. Whatever platform fits your needs, we&apos;ve got the expertise.</p>
            </div>
            <div className="service-card">
              <div className="service-icon">💡</div>
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
