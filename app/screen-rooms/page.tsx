import { Metadata } from 'next'
import HeroSection from '@/components/hero-section'
import ContentBlock from '@/components/content-block'
import GalleryGrid from '@/components/gallery-grid'
import CTABlock from '@/components/cta-block'
import FAQSection from '@/components/faq-section'
import { generateFAQSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: "Custom Screen Rooms & Patio Enclosures | Volusia County",
  description: "Custom screen rooms and patio enclosures in Volusia County. Expert design, quality construction, and professional installation. Create the outdoor living space you've always wanted. Get your free estimate.",
  keywords: ['screen room', 'screen enclosure', 'patio enclosure', 'lanai', 'florida screen room', 'outdoor living space', 'volusia county screen room'],
  alternates: { canonical: 'https://millersscreen.com/screen-rooms' },
  openGraph: {
    title: "Custom Screen Rooms & Patio Enclosures | Miller's Screen",
    description: "Custom screen rooms and patio enclosures in Volusia County. Expert design, quality construction, and professional installation. Get your free estimate.",
  },
}

const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": generateFAQSchema('screenRooms').map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
}

const roomImages = [
  '/projects/project-72553.jpg',
  '/projects/project-72556.jpg',
  '/projects/project-72561.jpg',
  '/projects/project-72566.jpg',
  '/projects/project-72572.jpg',
  '/projects/project-72560.jpg',
  '/projects/project-72581.jpg',
  '/projects/project-72582.jpg',
  '/projects/project-72583.jpg',
  '/projects/project-72587.jpg',
  '/projects/project-72588.jpg',
  '/projects/project-72589.jpg',
  '/projects/project-72590.jpg',
  '/projects/project-72591.jpg',
  '/projects/project-72592.jpg',
  '/projects/project-72593.jpg',
  '/projects/project-72594.jpg',
  '/projects/project-72595.jpg',
  '/projects/project-72596.jpg',
  '/projects/project-72597.jpg',
  '/projects/project-72598.jpg',
]

export default function ScreenRoomsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Screen Room Construction",
            "description": "Custom screen rooms and patio enclosures in Volusia County, Florida. Expert design and professional installation.",
            "provider": {
              "@id": "https://millersscreen.com/#business"
            },
            "areaServed": {
              "@type": "State",
              "name": "Florida"
            },
            "serviceType": "Construction"
          })
        }}
      />
      <HeroSection
        headline="SCREEN ROOMS"
        subheadline="Add livable space without sacrificing your home's look."
        image="/projects/project-72561.jpg"
        ctaPrimary={{ label: 'Request an Estimate', href: '/contact#form' }}
        ctaSecondary={{ label: 'View Screen Rooms', href: '/showcase' }}
      />
      <ContentBlock
        title="Built to match your home"
        copy="A well-designed screen room should look intentional — proportioned correctly, clean corners, strong attachment points, and a finish that doesn't scream 'add-on.'"
      />

      {/* Pricing Range */}
      <section className="py-10 md:py-14 bg-bg-1">
        <div className="section-container">
          <h2 className="text-text-primary text-2xl md:text-3xl font-bold mb-2">How Much Does a Screen Room Cost?</h2>
          <p className="text-muted mb-8 max-w-2xl">
            Screen room pricing depends on square footage, roof style, attachment type, and permit requirements. Here&apos;s what homeowners in Volusia County typically spend:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl">
            {[
              { tier: 'Attached Patio Room', range: 'From $8,000', desc: 'Standard attached screened patio, single access door' },
              { tier: 'Custom Screen Room', range: '$14,000 – $25,000', desc: 'Gable or hip roof, larger footprint, upgraded screens' },
              { tier: 'Elite Screen Room', range: '$25,000+', desc: 'Premium materials, complex design, or full room addition' },
            ].map((item) => (
              <div key={item.tier} className="bg-panel border border-line rounded-xl p-5">
                <p className="text-xs font-semibold text-accent-red uppercase tracking-wider mb-1">{item.tier}</p>
                <p className="text-2xl font-black text-text-primary mb-2">{item.range}</p>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted/60 mt-5">Prices are estimates only. Get an exact, no-obligation quote with a free in-person walkthrough.</p>
        </div>
      </section>

      {/* Inline Estimate CTA */}
      <section className="py-12 md:py-16 bg-bg-1">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-text-primary text-2xl md:text-3xl font-bold mb-4">
              Ready to Expand Your Living Space?
            </h2>
            <p className="text-muted mb-6">
              A screen room adds usable square footage to your home while preserving the outdoor feel.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact#form" className="btn-primary">
                Request an Estimate
              </a>
              <a href="tel:386-756-8770" className="btn-secondary">
                Call 386-756-8770
              </a>
            </div>
          </div>
        </div>
      </section>

      <GalleryGrid title="Recent screen rooms" images={roomImages} />
      <FAQSection />
      <CTABlock
        title="Tell us what you want to build."
        cta={{ label: 'Start Your Project', href: '/contact#form' }}
      />
    </>
  )
}
