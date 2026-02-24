import Image from 'next/image'
import Link from 'next/link'
import './Footer.css'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <Image src="/HDC-Logo.webp" alt="Honeyfoot Digital Co." className="footer-logo" width={240} height={100} quality={100} />

          <nav className="footer-nav">
            <Link href="/">Who We Are</Link>
            <Link href="/#services">What We Offer</Link>
            <Link href="/blog">How To Web</Link>
          </nav>

          <div className="footer-contact">
            <p>(305) 707-0889</p>
            <p>hello@honeyfootco.com</p>
            <p>2719 Hollywood Blvd Suite 5301, Hollywood, FL 33020</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p>Copyright © {currentYear} Honeyfoot Digital Company, LLC</p>
        </div>
      </div>
    </footer>
  )
}
