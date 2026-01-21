'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 text-6xl animate-float opacity-20">☕</div>
        <div className="absolute top-40 right-20 text-4xl animate-float opacity-20" style={{ animationDelay: '1s' }}>🍵</div>
        <div className="absolute bottom-40 left-20 text-5xl animate-float opacity-20" style={{ animationDelay: '2s' }}>🧊</div>
        <div className="absolute bottom-20 right-10 text-4xl animate-float opacity-20" style={{ animationDelay: '0.5s' }}>⚡</div>
      </div>

      {/* Main content */}
      <div className={`relative z-10 max-w-2xl mx-auto text-center transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Logo/Icon */}
        <div className="mb-8">
          <span className="text-8xl">☕</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-amber-200 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
          What&apos;s Your Coffee Vibe?
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-neutral-400 mb-8 max-w-md mx-auto">
          Answer 8 questions to discover your caffeine personality.
          Are you chaos or cozy? Let&apos;s find out.
        </p>

        {/* Personality previews */}
        <div className="flex justify-center gap-4 mb-10 text-3xl">
          <span className="hover:scale-125 transition-transform cursor-default" title="Espresso Addict">⚡</span>
          <span className="hover:scale-125 transition-transform cursor-default" title="Latte Art Master">🎨</span>
          <span className="hover:scale-125 transition-transform cursor-default" title="Chill Cold Brew">🧊</span>
          <span className="hover:scale-125 transition-transform cursor-default" title="Chaos Matcha">🍵</span>
        </div>

        {/* CTA Button */}
        <Link
          href="/quiz"
          className="inline-block bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-lg md:text-xl px-10 py-4 rounded-full shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 transform hover:scale-105 transition-all duration-300"
        >
          Start the Quiz →
        </Link>

        {/* Social proof */}
        <p className="mt-8 text-sm text-neutral-500">
          🔥 10,000+ coffee lovers have discovered their vibe
        </p>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 text-center text-neutral-600 text-sm">
        <p>Takes less than 2 minutes • 100% free • Very accurate*</p>
        <p className="text-xs mt-1">*accuracy not guaranteed, vibes are</p>
      </footer>
    </div>
  )
}
