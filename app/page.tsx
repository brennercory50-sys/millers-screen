import HeroSection from '@/components/hero-section'
import AuthorityStrip from '@/components/authority-strip'
import ServicePackages from '@/components/service-packages'
import MegaviewBanner from '@/components/megaview-banner'
import FinancingBanner from '@/components/financing-banner'
import GalleryPreview from '@/components/gallery-preview'
import TestimonialsSection from '@/components/testimonials-section'
import FAQSection from '@/components/faq-section'
import LeadForm from '@/components/lead-form'
import { Award, Star, CheckCircle } from 'lucide-react'
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
      <HeroSection
        headline="SCREEN ENCLOSURES"
        headlineLine2="BUILT RIGHT. BUILT TO LAST."
        subheadline="Pool enclosures, screen rooms, and MegaView® installations by Volusia County's most experienced crew. Licensed, permitted, in-house."
        image="/projects/project-122978.jpg"
        ctaPrimary={{ label: 'Get My Free Quote', href: '/contact#form' }}
        ctaSecondary={{ label: 'Call Now', href: 'tel:386-756-8770' }}
        trustBullets={['40+ years Volusia County', 'In-house crews only', 'Licensed CBC#1262142']}
        isHomepage
      />

      <TestimonialsSection />

      <AuthorityStrip />
      
      {/* Trust Badges Section */}
      <section className="py-8 md:py-10 border-b border-line bg-bg-1">
        <div className="section-container">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-accent-red flex items-center justify-center flex-shrink-0">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted">Licensed</p>
                <p className="font-bold text-text-primary text-sm">CBC#1262142</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted">In-House</p>
                <p className="font-bold text-text-primary text-sm">No Subcontractors</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted">MegaView®</p>
                <p className="font-bold text-text-primary text-sm">Only Authorized Builder</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-yellow-600 flex items-center justify-center flex-shrink-0">
                <Star className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted">BBB</p>
                <p className="font-bold text-text-primary text-sm">A+ Rated</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ServicePackages />
      <MegaviewBanner />

      <FAQSection />
      <FinancingBanner />
      <GalleryPreview />
    </>
  )
}
