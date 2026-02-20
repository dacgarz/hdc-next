import './globals.css'

export const metadata = {
  title: 'Honeyfoot Digital Co. - Web Design & Development',
  description: 'Boutique web development partner for high-performance websites. From concept to launch, we offer personalized solutions to enhance your online presence.',
  openGraph: {
    title: 'Honeyfoot Digital Co. - Web Design & Development',
    description: 'Boutique web development partner for high-performance websites.',
    type: 'website',
  },
  icons: {
    icon: '/desk-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" />
        <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js" />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EB55WR5H08" />
        <script id="google-analytics">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-EB55WR5H08');
          gtag('config', 'G-QT7G27XXT2');
        `}</script>
      </head>
      <body>{children}</body>
    </html>
  )
}
