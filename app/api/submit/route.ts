import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, result } = body

    if (!email || !result) {
      return NextResponse.json(
        { error: 'Email and result are required' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Send to Zapier webhook (if configured)
    const webhookUrl = process.env.ZAPIER_WEBHOOK_URL

    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            result,
            timestamp: new Date().toISOString(),
            source: 'coffee-vibe-quiz',
          }),
        })
      } catch (webhookError) {
        console.error('Webhook error:', webhookError)
        // Don't fail the request if webhook fails
      }
    }

    // Log for debugging (remove in production)
    console.log('New quiz submission:', { email, result })

    return NextResponse.json({
      success: true,
      message: 'Thanks for subscribing!',
    })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}
