import { Metadata } from 'next'
import HeroSection from '@/components/hero-section'
import ContentBlock from '@/components/content-block'
import GalleryGrid from '@/components/gallery-grid'
import CTABlock from '@/components/cta-block'
import FAQSection from '@/components/faq-section'
import { generateFAQSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: "Pool Enclosure Experts in Volusia County | Licensed & Permitted",
  description: "Expert pool enclosure installation in Volusia County, FL. Engineering, permitting, and installation all handled by our in-house crews. Licensed contractors with 40+ years experience. Request your free estimate.",
  keywords: ['pool enclosure', 'pool cage', 'pool screen enclosure', 'florida pool enclosure', 'daytona beach pool enclosure', 'screen pool cage', 'volusia county pool enclosure'],
  alternates: { canonical: 'https://millersscreen.com/pool-enclosures' },
  openGraph: {
    title: "Pool Enclosure Experts in Volusia County | Miller's Screen",
    description: "Expert pool enclosure installation in Volusia County, FL. Engineering, permitting, and installation all handled by our in-house crews. Request your free estimate today.",
  },
}

const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": generateFAQSchema('poolEnclosures').map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
}

const poolImages = [
  '/projects/project-122978.jpg',
  '/projects/project-122980.jpg',
  '/projects/project-72552.jpg',
  '/projects/project-72554.jpg',
  '/projects/project-72555.jpg',
  '/projects/project-72557.jpg',
  '/projects/project-72584.jpg',
  '/projects/project-72585.jpg',
  '/projects/project-72586.jpg',
]

export default function PoolEnclosuresPage() {
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
            "name": "Pool Enclosure Installation",
            "description": "Expert pool enclosure installation in Volusia County, Florida. Engineering, permitting, and professional installation by in-house crews.",
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
        headline="POOL ENCLOSURES"
        subheadline="Built for Florida. Clean lines. Built to last."
        image="/projects/project-122978.jpg"
        ctaPrimary={{ label: 'Request an Estimate', href: '/contact#form' }}
        ctaSecondary={{ label: 'View Pool Projects', href: '/showcase' }}
      />
      <ContentBlock
        title="What you get"
        bullets={[
          'Engineered for local conditions',
          'Permitting handled correctly',
          'In-house installation crews',
          'Premium hardware and finish options',
        ]}
      />

      {/* Pricing Range */}
      <section className="py-10 md:py-14 bg-bg-1">
        <div className="section-container">
          <h2 className="text-text-primary text-2xl md:text-3xl font-bold mb-2">What Does a Pool Enclosure Cost?</h2>
          <p className="text-muted mb-8 max-w-2xl">
            Every enclosure is custom — size, roof style, screen type, and permit complexity all affect the final number. Here&apos;s a realistic starting range for Volusia County:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl">
            {[
              { tier: 'Standard Pool Cage', range: 'From $12,000', desc: 'Flat or hip roof, standard screen, single door' },
              { tier: 'Mid-Range Enclosure', range: '$18,000 – $30,000', desc: 'Gable or mansard, upgraded screen, custom doors' },
              { tier: 'Premium / Large', range: '$30,000+', desc: 'MegaView®, oversized structure, or complex roofline' },
            ].map((item) => (
              <div key={item.tier} className="bg-panel border border-line rounded-xl p-5">
                <p className="text-xs font-semibold text-accent-red uppercase tracking-wider mb-1">{item.tier}</p>
                <p className="text-2xl font-black text-text-primary mb-2">{item.range}</p>
                <p className="text-sm text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted/60 mt-5">Prices are estimates only. Your free in-person walkthrough gives you an exact, no-obligation quote.</p>
        </div>
      </section>

      <GalleryGrid title="Recent pool enclosures" images={poolImages} />
      <FAQSection />
      <CTABlock
        title="Ready to build yours?"
        cta={{ label: 'Start Your Project', href: '/contact#form' }}
      />
    </>
  )
}
