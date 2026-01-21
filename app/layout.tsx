import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "What's Your Coffee Vibe? | Personality Quiz",
  description: 'Discover your caffeine personality in 8 questions. Are you an Espresso Addict, Latte Art Master, Chill Cold Brew, or Chaos Matcha?',
  keywords: ['coffee quiz', 'personality quiz', 'coffee personality', 'fun quiz', 'viral quiz'],
  authors: [{ name: 'Coffee Vibe Quiz' }],
  openGraph: {
    title: "What's Your Coffee Vibe?",
    description: 'Discover your caffeine personality in 8 questions!',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: '/images/og-default.png',
        width: 1200,
        height: 630,
        alt: "What's Your Coffee Vibe? Quiz",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "What's Your Coffee Vibe?",
    description: 'Discover your caffeine personality in 8 questions!',
    images: ['/images/og-default.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-neutral-950 text-white antialiased`}>
        <main className="min-h-screen">
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  )
}
