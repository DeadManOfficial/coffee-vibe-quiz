import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = "What's Your Coffee Vibe? - Personality Quiz"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#171717',
          backgroundImage: 'linear-gradient(135deg, #171717 0%, #292524 50%, #171717 100%)',
        }}
      >
        {/* Coffee cup glow */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '500px',
            height: '500px',
            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.3) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
          }}
        >
          <div style={{ fontSize: '100px', marginBottom: '20px' }}>☕</div>

          <div
            style={{
              fontSize: '64px',
              fontWeight: 800,
              color: '#f59e0b',
              marginBottom: '10px',
            }}
          >
            What's Your
          </div>

          <div
            style={{
              fontSize: '72px',
              fontWeight: 800,
              color: 'white',
              marginBottom: '30px',
            }}
          >
            Coffee Vibe?
          </div>

          <div
            style={{
              fontSize: '24px',
              color: '#a3a3a3',
              marginBottom: '40px',
            }}
          >
            Discover your coffee personality in 60 seconds
          </div>

          <div
            style={{
              display: 'flex',
              gap: '15px',
            }}
          >
            {['Espresso', 'Latte', 'Cold Brew', 'Matcha'].map((type) => (
              <div
                key={type}
                style={{
                  padding: '10px 20px',
                  background: 'rgba(245, 158, 11, 0.2)',
                  border: '1px solid rgba(245, 158, 11, 0.4)',
                  borderRadius: '20px',
                  color: '#fbbf24',
                  fontSize: '18px',
                }}
              >
                {type}
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
