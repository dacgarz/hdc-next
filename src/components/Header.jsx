'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import './Header.css'

export default function Header({ onOpenModal: _onOpenModal, hideHeaderLogo = false }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen)
  const closeMobileMenu = () => setMobileMenuOpen(false)

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className={`logo${hideHeaderLogo ? ' logoHidden' : ''}`}>
          <Link href="/">
            <Image src="/HDC-Logo.webp" alt="Honeyfoot Digital Co." className="logo-img" width={240} height={100} quality={100} />
          </Link>
        </div>

        <button
          className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-menu-wrapper ${mobileMenuOpen ? 'open' : ''}`}>
          <ul className="nav-menu">
            <li><Link href="/#why" onClick={closeMobileMenu}>WHO WE ARE</Link></li>
            <li><Link href="/#services" onClick={closeMobileMenu}>WHAT WE OFFER</Link></li>
            <li><Link href="/insights" onClick={closeMobileMenu}>HOW TO WEB</Link></li>
            <li><Link href="/contact" onClick={closeMobileMenu}>LET&apos;S CONNECT</Link></li>
          </ul>
          <Link href="/free-website-audit" className="nav-cta" onClick={closeMobileMenu}>
            Free Website Audit
          </Link>
        </div>
      </div>
    </nav>
  )
}
