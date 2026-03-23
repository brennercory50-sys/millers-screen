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
      <GalleryGrid title="Recent pool enclosures" images={poolImages} />
      <FAQSection />
      <CTABlock
        title="Ready to build yours?"
        cta={{ label: 'Start Your Project', href: '/contact#form' }}
      />
    </>
  )
}
