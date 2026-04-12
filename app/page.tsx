import HomeHero from '@/components/home-hero'
import TrustStrip from '@/components/trust-strip'
import AuthorityStrip from '@/components/authority-strip'
import ServicePackages from '@/components/service-packages'
import MegaviewBanner from '@/components/megaview-banner'
import FinancingBanner from '@/components/financing-banner'
import GalleryPreview from '@/components/gallery-preview'
import TestimonialsSection from '@/components/testimonials-section'
import FAQSection from '@/components/faq-section'
import { generateFAQSchema } from '@/lib/seo'

export default function HomePage() {
  const homeFaqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": generateFAQSchema('home').map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homeFaqData) }}
      />
      <HomeHero />
      <TrustStrip />

      <TestimonialsSection />

      <AuthorityStrip />

      <ServicePackages />
      <MegaviewBanner />

      <FAQSection />
      <FinancingBanner />
      <GalleryPreview />
    </>
  )
}
