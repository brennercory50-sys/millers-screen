import { NextResponse } from 'next/server'
import { checkRateLimit, getRateLimitHeaders } from '@/lib/rate-limit'

export const dynamic = 'force-dynamic'

const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const RATE_LIMIT_MAX = 10 // 10 requests per minute per IP

const SYSTEM_PROMPT = `You are a quick quote assistant for Miller's Screen, Volusia County's premier screen enclosure contractor with 40+ years experience.

PERSONA: Fast, helpful, focused on getting visitors to take action. No fluff. No lengthy explanations. Short responses only.

SERVICES:
- Screen Repair (starting at $150)
- Rescreen (custom quote)
- Pool Enclosures (custom quote)
- Screen Rooms (custom quote)
- MegaView® Enclosures (our specialty - ONLY builder in Volusia County)

SERVICE AREA: Daytona Beach, Port Orange, Ormond Beach, New Smyrna Beach, DeLand, Deltona, South Daytona, Holly Hill, Edgewater, Orange City, DeBary

KEY FACTS:
- 40+ years experience
- Family owned, in-house crews (NO subcontractors)
- Licensed & permitted (CBC1262142)
- 0% financing available (18 months)
- Fast response times
- 5-star rated

RULES:
1. Keep responses under 3 sentences
2. Always offer next action: call 386-756-8770 or use the chat quote form
3. Never make up pricing - say "call for a quote"
4. If they mention price, cost, quote, estimate, or want to talk - push to call or quote form immediately
5. Be confident, not pushy
6. No lengthy company history dumps
7. If unsure, recommend calling

QUICK CLOSERS (use when visitor seems ready):
- "Want to talk now? Call 386-756-8770"
- "Get a fast quote - just drop your name and phone in the chat"
- "Need it sooner? Call us directly at 386-756-8770"`

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0] 
    ?? request.headers.get('x-real-ip') 
    ?? 'unknown'
  
  const rateLimitResult = checkRateLimit(ip, {
    windowMs: RATE_LIMIT_WINDOW,
    maxRequests: RATE_LIMIT_MAX,
  })
  
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.' },
      { 
        status: 429,
        headers: getRateLimitHeaders(rateLimitResult),
      }
    )
  }

  try {
    const { messages } = await request?.json?.() ?? {}

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: 'Invalid messages' }, { status: 400 })
    }

    const response = await fetch('https://apps.abacus.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.ABACUSAI_API_KEY ?? ''}`,
      },
      body: JSON.stringify({
        model: 'gpt-4.1-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...(messages ?? []),
        ],
        stream: true,
        max_tokens: 300,
      }),
    })

    if (!response?.ok) {
      throw new Error(`API error: ${response?.status ?? 'unknown'}`)
    }

    const stream = new ReadableStream({
      async start(controller) {
        const reader = response?.body?.getReader?.()
        const decoder = new TextDecoder()
        const encoder = new TextEncoder()

        try {
          while (true) {
            const { done, value } = await reader?.read?.() ?? { done: true, value: undefined }
            if (done) break
            const chunk = decoder?.decode?.(value) ?? ''
            controller?.enqueue?.(encoder?.encode?.(chunk))
          }
        } catch (error) {
          console.error('Stream error:', error)
          controller?.error?.(error)
        } finally {
          controller?.close?.()
        }
      },
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    })
  } catch (error) {
    console.error('Chatbot error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat' },
      { status: 500 }
    )
  }
}
