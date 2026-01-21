import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const results: Record<string, { title: string; emoji: string; color: string; tagline: string }> = {
  espresso: {
    title: 'The Espresso Addict',
    emoji: '⚡',
    color: '#78350f',
    tagline: 'Sleep is for the weak',
  },
  latte: {
    title: 'Latte Art Master',
    emoji: '🎨',
    color: '#ea580c',
    tagline: 'Cozy vibes only',
  },
  coldbrew: {
    title: 'Chill Cold Brew',
    emoji: '🧊',
    color: '#0284c7',
    tagline: 'Maximum caffeine, minimum effort',
  },
  matcha: {
    title: 'Chaos Matcha',
    emoji: '🍵',
    color: '#16a34a',
    tagline: 'Chaotic but make it wellness',
  },
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const vibe = searchParams.get('vibe') || 'espresso'
  const result = results[vibe] || results.espresso

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${result.color} 0%, #171717 100%)`,
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Emoji */}
        <div style={{ fontSize: 120, marginBottom: 20 }}>{result.emoji}</div>

        {/* I got... */}
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255,255,255,0.7)',
            marginBottom: 10,
          }}
        >
          I got...
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center',
            marginBottom: 20,
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
          }}
        >
          {result.title}
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: 'rgba(255,255,255,0.8)',
            marginBottom: 40,
          }}
        >
          {result.tagline}
        </div>

        {/* CTA */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            background: 'rgba(255,255,255,0.15)',
            padding: '16px 32px',
            borderRadius: 50,
          }}
        >
          <span style={{ fontSize: 24, color: 'white' }}>☕</span>
          <span style={{ fontSize: 24, color: 'white', fontWeight: 600 }}>
            Take the quiz → coffeevibes.quiz
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
