import './globals.css'

export const metadata = {
  metadataBase: new URL('https://honeyfootco.com'),
  title: {
    default: 'Honeyfoot Digital Co. - Web Design & Development',
    template: '%s | Honeyfoot Digital Co.',
  },
  description: 'Boutique web development partner for high-performance websites. From concept to launch, we offer personalized solutions to enhance your online presence.',
  keywords: [
    'web design',
    'web development',
    'WordPress',
    'React',
    'Next.js',
    'Boca Raton',
    'Fort Lauderdale',
    'Hollywood Florida',
    'boutique web agency',
    'WooCommerce',
    'SEO',
  ],
  authors: [{ name: 'Honeyfoot Digital Co.', url: 'https://honeyfootco.com' }],
  creator: 'Honeyfoot Digital Co.',
  openGraph: {
    title: 'Honeyfoot Digital Co. - Web Design & Development',
    description: 'Boutique web development partner for high-performance websites. From concept to launch, we offer personalized solutions to enhance your online presence.',
    url: 'https://honeyfootco.com',
    siteName: 'Honeyfoot Digital Co.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Honeyfoot Digital Co.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: '/desk-icon.png',
    apple: '/desk-icon.png',
  },
  alternates: {
    canonical: 'https://honeyfootco.com',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" />
        <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EB55WR5H08" />
        <script id="google-analytics" dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EB55WR5H08');
          gtag('config', 'G-QT7G27XXT2');
          gtag('config', 'AW-17990861815');
        `}} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-17990861815" />
      </head>
      <body>{children}</body>
    </html>
  )
}