import { Metadata } from 'next'
import HeroSection from '@/components/hero-section'
import PlanCards from '@/components/plan-cards'
import CTABlock from '@/components/cta-block'

export const metadata: Metadata = {
  title: "Financing Options for Screen Enclosures | Easy Payment Plans",
  description: "Affordable financing options for your screen enclosure project. 0% interest for 18 months available. Get the outdoor space you want now and pay over time. Apply today.",
  keywords: ['financing', 'payment plans', 'screen enclosure loan', 'pool enclosure financing', '0% interest', 'easy payments'],
  openGraph: {
    title: "Financing Options | Miller's Screen",
    description: "Affordable financing options for your screen enclosure project. 0% interest for 18 months available.",
  },
}

export default function FinancingPage() {
  return (
    <>
      <HeroSection
        headline="FINANCING"
        subheadline="Make your project happen now. Flexible options available."
        image="/projects/project-72555.jpg"
        ctaPrimary={{ label: 'Apply Now', href: '#apply' }}
        ctaSecondary={{ label: 'Request an Estimate', href: '/contact#form' }}
      />
      <PlanCards />
      <section className="py-12 bg-bg-1">
        <div className="section-container">
          <div className="bg-panel rounded-lg p-6 border-l-4 border-accent-red">
            <h3 className="text-lg font-bold text-text-primary mb-2">Financing Disclaimer</h3>
            <p className="text-muted text-sm leading-relaxed">
              Financing is subject to credit approval. Terms, rates, and promotional offers vary by applicant and lender program. Ask us for current options.
            </p>
          </div>
        </div>
      </section>
      <CTABlock
        title="Want pricing first?"
        cta={{ label: 'Request an Estimate', href: '/contact#form' }}
      />
    </>
  )
}
