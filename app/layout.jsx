import './globals.css'
import { Inter, Cormorant_Garamond, Indie_Flower, JetBrains_Mono } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const cormorantGaramond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant-garamond',
})

const indieFlower = Indie_Flower({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-indie-flower',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
})

export const metadata = {
  title: 'capture-deck',
  description: 'Turn websites, code, lyrics, and quotes into beautiful shareable images',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} ${inter.variable} ${cormorantGaramond.variable} ${indieFlower.variable} ${jetbrainsMono.variable} antialiased bg-zinc-950 text-zinc-100`}
      >
        {children}
      </body>
    </html>
  )
}
