import HomeHero from '@/components/home-hero'
import TrustStrip from '@/components/trust-strip'
import GalleryCarousel from '@/components/gallery-carousel'
import TestimonialsSection from '@/components/testimonials-section'
import AuthorityStrip from '@/components/authority-strip'
import FAQSection from '@/components/faq-section'
import FinancingBanner from '@/components/financing-banner'
import GalleryPreview from '@/components/gallery-preview'
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
      <GalleryCarousel />
      <TestimonialsSection />
      <AuthorityStrip />
      <FAQSection />
      <FinancingBanner />
      <GalleryPreview />
    </>
  )
}
