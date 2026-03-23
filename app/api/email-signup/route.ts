import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const { email } = await request?.json?.() ?? {}

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex?.test?.(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 })
    }

    // Check if email already exists
    const existing = await prisma?.emailSignup?.findUnique?.({
      where: { email }
    })

    if (existing) {
      // Don't reveal that email exists, just return success
      return NextResponse.json({ success: true, message: 'Signed up successfully' })
    }

    // Save to database
    await prisma?.emailSignup?.create?.({
      data: {
        email,
        source: '10_percent_popup',
        discountCode: 'SAVE10'
      }
    })

    // Send notification to business owner
    try {
      const appUrl = process.env.NEXTAUTH_URL ?? ''
      const hostname = appUrl ? new URL(appUrl)?.hostname ?? 'millersscreen' : 'millersscreen'

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0B0D10; color: #E9EEF5; padding: 20px;">
          <div style="border-bottom: 3px solid #B0161C; padding-bottom: 15px; margin-bottom: 20px;">
            <h2 style="color: #E9EEF5; margin: 0;">🎉 New Email Signup - 10% Off Request</h2>
          </div>
          <div style="background: #11151B; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="color: #E9EEF5; margin: 0 0 10px 0;">Someone just signed up for the 10% off discount:</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #A9B3C1; width: 120px;">Email:</td>
                <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #B0161C; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #A9B3C1;">Discount Code:</td>
                <td style="padding: 10px 0; color: #E9EEF5; font-weight: bold;">SAVE10</td>
              </tr>
            </table>
          </div>
          <p style="color: #A9B3C1; font-size: 14px; margin: 0;">
            This person is interested in a screen enclosure project. Consider reaching out!
          </p>
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
          notification_id: process.env.NOTIF_ID_EMAIL_SIGNUP_10_OFF ?? '',
          subject: '🎉 New Email Signup - 10% Off Request',
          body: htmlBody,
          is_html: true,
          recipient_email: 'millersscreenoffice@gmail.com',
          sender_email: `noreply@${hostname}`,
          sender_alias: "Miller's Screen",
        }),
      })
    } catch (emailError) {
      console.error('Email notification failed:', emailError)
      // Don't fail the signup if notification fails
    }

    return NextResponse.json({ success: true, message: 'Signed up successfully' })
  } catch (error) {
    console.error('Email signup error:', error)
    return NextResponse.json({ error: 'Failed to sign up' }, { status: 500 })
  }
}
