import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const data = await request?.json?.()

    const { fullName, phone, email, projectType, city, message, emailMarketingConsent } = data ?? {}

    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL not configured')
      return NextResponse.json(
        { success: false, message: 'Database not configured' },
        { status: 503 }
      )
    }

    if (!fullName || !phone || !email || !projectType) {
      return NextResponse.json(
        { success: false, message: 'Name, phone, email, and service type are required' },
        { status: 400 }
      )
    }

    let lead
    try {
      lead = await prisma.lead.create({
        data: {
          fullName: fullName ?? '',
          phone: phone ?? '',
          email: email ?? '',
          projectType: projectType ?? '',
          city: city ?? '',
          message: message ?? '',
          leadSource: 'quote_form',
          emailMarketingConsent: emailMarketingConsent ?? false,
          emailMarketingConsentAt: emailMarketingConsent ? new Date() : null,
        },
      })
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { success: false, message: 'Failed to save lead to database' },
        { status: 500 }
      )
    }

    const appUrl = process.env.NEXTAUTH_URL ?? ''
    const hostname = appUrl ? new URL(appUrl)?.hostname ?? 'millersscreen' : 'millersscreen'
    const appName = hostname?.split?.('.')?.[0] ?? 'millersscreen'

    const consentText = emailMarketingConsent ? 'Yes - opted in' : 'No'

    const htmlBody = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0B0D10; color: #E9EEF5; padding: 20px;">
        <div style="border-bottom: 3px solid #B0161C; padding-bottom: 15px; margin-bottom: 20px;">
          <h2 style="color: #E9EEF5; margin: 0;">New Lead from Miller's Screen Website</h2>
        </div>
        <div style="background: #11151B; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #A9B3C1; width: 120px;">Name:</td>
              <td style="padding: 10px 0; color: #E9EEF5; font-weight: bold;">${fullName ?? ''}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #A9B3C1;">Phone:</td>
              <td style="padding: 10px 0;"><a href="tel:${phone ?? ''}" style="color: #B0161C; text-decoration: none;">${phone ?? ''}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #A9B3C1;">Email:</td>
              <td style="padding: 10px 0;"><a href="mailto:${email ?? ''}" style="color: #B0161C; text-decoration: none;">${email ?? ''}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #A9B3C1;">Project Type:</td>
              <td style="padding: 10px 0; color: #E9EEF5;">${projectType ?? ''}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #A9B3C1;">City:</td>
              <td style="padding: 10px 0; color: #E9EEF5;">${city ?? 'Not specified'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #A9B3C1;">Marketing Consent:</td>
              <td style="padding: 10px 0; color: ${emailMarketingConsent ? '#22c55e' : '#A9B3C1'}; font-weight: bold;">${consentText}</td>
            </tr>
          </table>
        </div>
        <div style="background: #11151B; padding: 20px; border-radius: 8px;">
          <h3 style="color: #A9B3C1; margin-top: 0; font-size: 14px;">Project Details:</h3>
          <p style="color: #E9EEF5; line-height: 1.6; margin: 0;">${message ?? 'No additional details provided'}</p>
        </div>
        <p style="color: #A9B3C1; font-size: 12px; margin-top: 20px; text-align: center;">
          Submitted at: ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}
        </p>
      </div>
    `

    try {
      const emailResponse = await fetch('https://apps.abacus.ai/api/sendNotificationEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          deployment_token: process.env.ABACUSAI_API_KEY ?? '',
          app_id: process.env.WEB_APP_ID ?? '',
          notification_id: process.env.NOTIF_ID_LEAD_FORM_SUBMISSION ?? '',
          subject: `New Lead: ${projectType ?? 'Project'} - ${fullName ?? 'Unknown'}`,
          body: htmlBody,
          is_html: true,
          recipient_email: 'millersscreenoffice@gmail.com',
          sender_email: `noreply@${hostname}`,
          sender_alias: "Miller's Screen",
        }),
      })

      const emailResult = await emailResponse?.json?.().catch(() => ({}))
      if (!emailResult?.success && !emailResult?.notification_disabled) {
        console.error('Email notification failed:', emailResult)
      }
    } catch (emailError) {
      console.error('Failed to send email notification:', emailError)
    }

    return NextResponse.json({ success: true, leadId: lead?.id ?? '' })
  } catch (error) {
    console.error('Lead submission error:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to submit lead' },
      { status: 500 }
    )
  }
}
