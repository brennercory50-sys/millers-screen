import HeroSection from '@/components/hero-section'
import AuthorityStrip from '@/components/authority-strip'
import ServicePackages from '@/components/service-packages'
import MegaviewBanner from '@/components/megaview-banner'
import FinancingBanner from '@/components/financing-banner'
import GalleryPreview from '@/components/gallery-preview'
import ContactStrip from '@/components/contact-strip'
import TestimonialsSection from '@/components/testimonials-section'
import FAQSection from '@/components/faq-section'
import QuickQuoteForm from '@/components/quick-quote-form'
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
        headline="SCREEN REPAIR & ENCLOSURES"
        headlineLine2="DONE RIGHT THE FIRST TIME."
        subheadline="Pool screens, lanais, and repairs completed fast. No hassle, no waiting. Serving Volusia County for 40+ years."
        image="/projects/project-122978.jpg"
        ctaPrimary={{ label: 'Get My Free Quote', href: '/contact#form' }}
        ctaSecondary={{ label: 'Call Now', href: 'tel:386-756-8770' }}
        trustBullets={['1,000+ jobs completed', '5-star rated locally', 'Fast turnaround']}
        isHomepage
      />

      {/* Inline testimonial strip right under hero */}
      <TestimonialsSection />

      <AuthorityStrip />
      
      {/* Awards & Accreditations Section */}
      <section className="py-8 md:py-10 border-b border-line bg-bg-1">
        <div className="section-container">
          <p className="text-center text-sm text-muted uppercase tracking-wider mb-5">Awards & Accreditations</p>
          <div className="flex flex-wrap items-center justify-center gap-5 md:gap-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-red flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted">2024 & 2025</p>
                <p className="font-semibold text-text-primary text-sm">Choice Awards Winner</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted">HomeAdvisor</p>
                <p className="font-semibold text-text-primary text-sm">Elite Service</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted">HomeAdvisor</p>
                <p className="font-semibold text-text-primary text-sm">Screened & Approved</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-600 flex items-center justify-center flex-shrink-0">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xs text-muted">News-Journal</p>
                <p className="font-semibold text-text-primary text-sm">Readers&apos; Choice 2014-2016</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <ServicePackages />
      <MegaviewBanner />

      {/* Quick Quote Form Section */}
      <section id="quick-quote" className="py-12 md:py-20 bg-bg-1">
        <div className="section-container max-w-2xl">
          <QuickQuoteForm />
        </div>
      </section>

      <FAQSection />
      <FinancingBanner />
      <GalleryPreview />
      <ContactStrip />
    </>
  )
}
