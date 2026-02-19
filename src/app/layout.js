import './globals.css'

export const metadata = {
  title: 'Honeyfoot Digital Co. - Web Design & Development',
  description: 'Boutique web development partner for high-performance websites. From concept to launch, we offer personalized solutions to enhance your online presence.',
  openGraph: {
    title: 'Honeyfoot Digital Co. - Web Design & Development',
    description: 'Boutique web development partner for high-performance websites.',
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js" />
        <script src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.globe.min.js" />
      </head>
      <body>{children}</body>
    </html>
  )
}
