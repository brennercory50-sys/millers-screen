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
