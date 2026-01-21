'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import quizData from '@/data/quiz-data.json'

type VibeKey = 'espresso' | 'latte' | 'coldbrew' | 'matcha'

export default function ResultsPage() {
  const params = useParams()
  const router = useRouter()
  const vibe = params.vibe as VibeKey

  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const result = quizData.results[vibe]

  if (!result) {
    router.push('/')
    return null
  }

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/results/${vibe}`
    : ''

  const shareText = `${result.shareText} 👉`

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || isSubmitting) return

    setIsSubmitting(true)

    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, result: vibe }),
      })
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting email:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const shareToTwitter = () => {
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(url, '_blank')
  }

  const shareToTikTok = () => {
    // TikTok doesn't have direct share URL, copy to clipboard instead
    navigator.clipboard.writeText(`${shareText} ${shareUrl}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      {/* Result card */}
      <div className="max-w-lg w-full animate-fade-in">
        {/* Emoji and title */}
        <div className="text-center mb-8">
          <div className="text-8xl mb-4 animate-bounce-slow">{result.emoji}</div>
          <p className="text-neutral-400 text-lg mb-2">You are...</p>
          <h1 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${result.color} bg-clip-text text-transparent`}>
            {result.title}
          </h1>
        </div>

        {/* Description card */}
        <div className="bg-neutral-900/80 backdrop-blur border border-neutral-800 rounded-2xl p-6 mb-6">
          <p className="text-neutral-300 text-lg leading-relaxed mb-4">
            {result.description}
          </p>

          {/* Traits */}
          <div className="flex flex-wrap gap-2 mb-4">
            {result.traits.map((trait, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-neutral-800 rounded-full text-sm text-neutral-300"
              >
                {trait}
              </span>
            ))}
          </div>

          {/* Perfect drink */}
          <div className="bg-neutral-800/50 rounded-xl p-4">
            <p className="text-sm text-neutral-400 mb-1">Your perfect drink:</p>
            <p className="text-amber-400 font-medium">{result.perfectDrink}</p>
          </div>
        </div>

        {/* Share buttons */}
        <div className="bg-neutral-900/80 backdrop-blur border border-neutral-800 rounded-2xl p-6 mb-6">
          <p className="text-center text-neutral-400 mb-4">Share your result!</p>

          <div className="flex justify-center gap-3">
            {/* Twitter/X */}
            <button
              onClick={shareToTwitter}
              className="share-btn flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-full"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>Twitter</span>
            </button>

            {/* TikTok */}
            <button
              onClick={shareToTikTok}
              className="share-btn flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-full"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z" />
              </svg>
              <span>TikTok</span>
            </button>

            {/* Copy link */}
            <button
              onClick={copyLink}
              className="share-btn flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 rounded-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>

        {/* Email capture */}
        {!isSubmitted ? (
          <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/30 rounded-2xl p-6 mb-6">
            <p className="text-center text-neutral-200 font-medium mb-2">
              Want more coffee content?
            </p>
            <p className="text-center text-neutral-400 text-sm mb-4">
              Get weekly coffee tips, recipes, and exclusive quizzes!
            </p>

            <form onSubmit={handleEmailSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl focus:outline-none focus:border-amber-500 text-white placeholder:text-neutral-500"
                required
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 rounded-xl font-medium transition-all disabled:opacity-50"
              >
                {isSubmitting ? '...' : 'Join'}
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 mb-6 text-center">
            <p className="text-green-400 font-medium">You&apos;re in! Check your inbox for coffee goodness. ☕</p>
          </div>
        )}

        {/* Retake quiz */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-block text-neutral-400 hover:text-white transition-colors"
          >
            ← Take the quiz again
          </Link>
        </div>
      </div>
    </div>
  )
}
