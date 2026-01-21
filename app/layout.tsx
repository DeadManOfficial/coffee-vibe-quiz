import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { WebsiteJsonLd, FAQJsonLd } from '@/components/JsonLd'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

// Use Vercel URL in production, localhost in dev
const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f59e0b' },
    { media: '(prefers-color-scheme: dark)', color: '#171717' },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    template: '%s | Coffee Vibe Quiz',
    default: "What's Your Coffee Vibe? | Personality Quiz",
  },
  description: 'Discover your coffee personality in 60 seconds! Take the viral quiz to find out if you\'re an Espresso Addict, Latte Art Master, Chill Cold Brew, or Chaos Matcha. Free & shareable!',
  keywords: [
    'coffee quiz',
    'personality quiz',
    'coffee personality test',
    'what coffee am I',
    'fun quiz',
    'viral quiz',
    'espresso personality',
    'latte quiz',
    'coffee type quiz',
    'BuzzFeed quiz',
    'TikTok quiz',
    'shareable quiz',
  ],
  authors: [{ name: 'Coffee Vibe Quiz', url: baseUrl }],
  creator: 'Coffee Vibe Quiz',
  publisher: 'Coffee Vibe Quiz',
  formatDetection: {
    telephone: false,
    date: false,
    email: false,
    address: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: baseUrl,
    siteName: 'Coffee Vibe Quiz',
    title: "What's Your Coffee Vibe? ☕",
    description: 'Discover your coffee personality in 60 seconds! Are you Espresso Addict, Latte Art Master, Chill Cold Brew, or Chaos Matcha?',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: "What's Your Coffee Vibe? Quiz",
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@coffeevibesquiz',
    creator: '@coffeevibesquiz',
    title: "What's Your Coffee Vibe? ☕",
    description: 'Discover your coffee personality in 60 seconds!',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
  category: 'entertainment',
  classification: 'Personality Quiz',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <WebsiteJsonLd />
        <FAQJsonLd />
      </head>
      <body className={`${inter.className} bg-neutral-950 text-white antialiased`}>
        <main className="min-h-screen">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  )
}
