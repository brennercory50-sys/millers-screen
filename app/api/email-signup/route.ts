import { NextResponse } from 'next/server'
import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  const supabase = getSupabase()
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  try {
    const { email } = await request?.json?.() ?? {}

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex?.test?.(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    const { data: existing } = await supabase
      .from('email_signups')
      .select('id')
      .eq('email', email)
      .single()

    if (existing) {
      return NextResponse.json({ success: true, message: 'Signed up successfully' })
    }

    const { error: insertError } = await supabase
      .from('email_signups')
      .insert({
        email,
        source: 'website',
      })

    if (insertError) {
      console.error('Email signup insert error:', insertError)
    }

    try {
      const appUrl = process.env.NEXT_PUBLIC_SITE_URL ?? ''
      const hostname = appUrl ? new URL(appUrl)?.hostname ?? 'millersscreen' : 'millersscreen'

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0B0D10; color: #E9EEF5; padding: 20px;">
          <div style="border-bottom: 3px solid #B0161C; padding-bottom: 15px; margin-bottom: 20px;">
            <h2 style="color: #E9EEF5; margin: 0;">New Email Signup</h2>
          </div>
          <div style="background: #11151B; padding: 20px; border-radius: 8px;">
            <p style="color: #E9EEF5; margin: 0;">Email: <a href="mailto:${email}" style="color: #B0161C;">${email}</a></p>
          </div>
          <p style="color: #A9B3C1; font-size: 12px; margin-top: 20px; text-align: center;">
            Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
          </p>
        </div>
      `

      await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deployment_token: process.env.ABACUSAI_API_KEY ?? '',
          app_id: process.env.WEB_APP_ID ?? '',
          notification_id: process.env.NOTIF_ID_EMAIL_SIGNUP ?? '',
          subject: 'New Email Signup',
          body: htmlBody,
          is_html: true,
          recipient_email: 'millersscreenoffice@gmail.com',
          sender_email: `noreply@${hostname}`,
          sender_alias: "Miller's Screen",
        }),
      })
    } catch (emailError) {
      console.error('Email notification failed:', emailError)
    }

    return NextResponse.json({ success: true, message: 'Signed up successfully' })
  } catch (error) {
    console.error('Email signup error:', error)
    return NextResponse.json({ error: 'Failed to sign up' }, { status: 500 })
  }
}
