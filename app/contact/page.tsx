import { Metadata } from 'next'
import HeroSection from '@/components/hero-section'
import LeadForm from '@/components/lead-form'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: "Get a Free Screen Enclosure Estimate | Contact Miller's Screen",
  description: "Contact Miller's Screen for your free pool enclosure or screen room estimate. Call 386-756-8770 or request online. Fast response, no-obligation quotes, in-house crews.",
  keywords: ['contact millers screen', 'screen enclosure estimate', 'pool enclosure quote', 'daytona beach contractor', 'volusia county enclosure'],
  openGraph: {
    title: "Get a Free Screen Enclosure Estimate | Miller's Screen",
    description: "Contact Miller's Screen for your free pool enclosure or screen room estimate. Fast response, no-obligation quotes, in-house crews.",
  },
}

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            "mainEntity": {
              "@type": "LocalBusiness",
              "@id": "https://millersscreen.com/#business"
            }
          })
        }}
      />
      <HeroSection
        headline="CONTACT"
        subheadline="Fast estimates. Clean builds. Real crews."
        image="/projects/project-72570.jpg"
        ctaPrimary={{ label: 'Call Now', href: 'tel:386-756-8770' }}
        ctaSecondary={{ label: 'Request an Estimate', href: '#form' }}
      />

      <section className="py-12 md:py-16">
        <div className="section-container">
          {/* Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <a
              href="tel:386-756-8770"
              className="card flex items-center gap-4 hover:border-accent-red/50 border border-transparent transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-accent-red/10 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-accent-red" />
              </div>
              <div>
                <p className="text-sm text-muted">Phone</p>
                <p className="font-semibold text-text-primary">386-756-8770</p>
              </div>
            </a>

            <a
              href="mailto:millersscreenoffice@gmail.com"
              className="card flex items-center gap-4 hover:border-accent-red/50 border border-transparent transition-colors"
            >
              <div className="w-12 h-12 rounded-lg bg-accent-red/10 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-accent-red" />
              </div>
              <div>
                <p className="text-sm text-muted">Email</p>
                <p className="font-semibold text-text-primary text-sm">millersscreenoffice@gmail.com</p>
              </div>
            </a>

            <div className="card flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent-red/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-accent-red" />
              </div>
              <div>
                <p className="text-sm text-muted">Address</p>
                <p className="font-semibold text-text-primary text-sm">3111 Opportunity Ct Suite D, South Daytona, FL 32119</p>
              </div>
            </div>

            <div className="card flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-accent-red/10 flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-accent-red" />
              </div>
              <div>
                <p className="text-sm text-muted">Business Hours</p>
                <p className="font-semibold text-text-primary">Mon - Fri: 8AM - 5PM</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div id="form" className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-text-primary mb-4">Request an Estimate</h2>
              <p className="text-muted mb-6 leading-relaxed">
                Fill out the form with your project details and we'll get back to you promptly. For immediate assistance, give us a call.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-muted">
                  <Clock className="w-5 h-5 text-accent-red" />
                  <span className="text-sm">Typical response time: Within 24 hours</span>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-semibold text-text-primary mb-3">Service Area</h3>
                <p className="text-muted text-sm leading-relaxed">
                  Serving Volusia County including Daytona Beach, South Daytona, Port Orange, Ormond Beach, New Smyrna Beach, DeLand, Deltona, Edgewater, Orange City, and DeBary.
                </p>
              </div>
            </div>

            <LeadForm />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 bg-bg-1">
        <div className="section-container">
          <h2 className="text-text-primary mb-6">Visit / Service Area</h2>
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-img overflow-hidden bg-panel">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3458.8!2d-81.0!3d29.17!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e6d8f6c0e7e7e7%3A0x0!2s3111%20Opportunity%20Ct%20Suite%20D%2C%20South%20Daytona%2C%20FL%2032119!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(100%) invert(92%) contrast(83%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>
        </div>
      </section>
    </>
  )
}
