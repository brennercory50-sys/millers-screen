import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: "Miller's Screen privacy policy. How we collect, use, and protect your information when you visit our website or request a quote.",
  alternates: { canonical: 'https://millersscreen.com/privacy' },
  robots: { index: true, follow: true },
}

export default function PrivacyPolicyPage() {
  const lastUpdated = 'May 5, 2026'

  return (
    <main className="bg-bg-0 min-h-screen pt-24 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-5xl font-black text-text-primary mb-4">Privacy Policy</h1>
        <p className="text-muted text-sm mb-12">Last updated: {lastUpdated}</p>

        <div className="prose prose-invert max-w-none space-y-6 text-text-primary">
          <section>
            <h2 className="text-2xl font-bold mt-8 mb-3">Who we are</h2>
            <p className="text-muted leading-relaxed">
              Miller&apos;s Screen (&ldquo;we&rdquo;, &ldquo;us&rdquo;) is a licensed screen enclosure contractor based in
              South Daytona, Florida (CBC#1262142). This policy explains how we handle information collected
              through millersscreen.com.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-3">Information we collect</h2>
            <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed">
              <li><strong className="text-text-primary">Quote requests:</strong> name, phone, email, ZIP/city, project type, and any message you send through our forms.</li>
              <li><strong className="text-text-primary">Analytics:</strong> page views, device type, referring source (Google, Facebook, direct, etc.), and UTM campaign tags via Google Analytics 4.</li>
              <li><strong className="text-text-primary">Chat:</strong> messages sent through the on-site chat assistant.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-3">How we use it</h2>
            <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed">
              <li>Contacting you about your project and providing estimates.</li>
              <li>Improving our website, ads, and service offerings.</li>
              <li>Following up on past inquiries and sending occasional service updates.</li>
            </ul>
            <p className="text-muted leading-relaxed mt-3">
              We do <strong className="text-text-primary">not</strong> sell your personal information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-3">Cookies and tracking</h2>
            <p className="text-muted leading-relaxed">
              We use cookies and similar technologies for analytics and to remember the source of your visit
              (UTM tags). You can decline non-essential cookies via the consent banner shown on your first
              visit, or by clearing cookies in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-3">Third-party services</h2>
            <ul className="list-disc list-inside space-y-2 text-muted leading-relaxed">
              <li>Google Analytics 4 — anonymized site usage data.</li>
              <li>Supabase — secure storage of submitted lead information.</li>
              <li>CompanyCam — project photo display on our gallery.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-3">Your rights</h2>
            <p className="text-muted leading-relaxed">
              You can request access to, correction of, or deletion of your information at any time by emailing{' '}
              <a href="mailto:millersscreenoffice@gmail.com" className="text-accent-red hover:underline">
                millersscreenoffice@gmail.com
              </a>{' '}
              or calling{' '}
              <a href="tel:+13867568770" className="text-accent-red hover:underline">386-756-8770</a>.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mt-8 mb-3">Contact</h2>
            <p className="text-muted leading-relaxed">
              Miller&apos;s Screen<br />
              3111 Opportunity Ct, Suite D<br />
              South Daytona, FL 32119<br />
              Phone: <a href="tel:+13867568770" className="text-accent-red hover:underline">386-756-8770</a>
            </p>
          </section>

          <div className="pt-8 mt-12 border-t border-line">
            <Link href="/" className="text-accent-red hover:underline text-sm">← Back to home</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
