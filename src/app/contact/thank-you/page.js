import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Thank You | Honeyfoot Digital Co.',
  robots: { index: false },
}

export default function ThankYouPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0a1628',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      fontFamily: "'Poppins', sans-serif",
    }}>
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>

        <Link href="/">
          <Image
            src="/HDC-Logo.webp"
            alt="Honeyfoot Digital Co."
            width={200}
            height={84}
            quality={100}
            priority
            style={{ marginBottom: '40px' }}
          />
        </Link>

        <h1 style={{
          color: '#f0f9ff',
          fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
          fontWeight: 700,
          lineHeight: 1.25,
          margin: '0 0 16px',
        }}>
          We Got Your Message
        </h1>

        <p style={{
          color: 'rgba(240,249,255,0.6)',
          fontSize: '1rem',
          fontWeight: 300,
          lineHeight: 1.7,
          margin: '0 0 40px',
        }}>
          Thanks for reaching out — we&apos;ll review your message and get back to you within one business day. Usually faster.
        </p>

        <Link href="/" style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          background: 'linear-gradient(135deg, #2dd4bf, #4ade80)',
          color: '#0a1628',
          fontWeight: 700,
          fontSize: '0.9rem',
          padding: '13px 28px',
          borderRadius: '8px',
          textDecoration: 'none',
        }}>
          Back to Home
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </Link>

      </div>
    </div>
  )
}
