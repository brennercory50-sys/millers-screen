import { Metadata } from 'next'
import HeroSection from '@/components/hero-section'
import CTABlock from '@/components/cta-block'
import { Check, Zap, Shield, CreditCard, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: "Financing Options for Screen Enclosures | Easy Payment Plans",
  description: "Affordable financing options for your screen enclosure project. 0% interest for 18 months available. Get the outdoor space you want now and pay over time. Apply today.",
  keywords: ['financing', 'payment plans', 'screen enclosure loan', 'pool enclosure financing', '0% interest', 'easy payments'],
  alternates: { canonical: 'https://millersscreen.com/financing' },
  openGraph: {
    title: "Financing Options | Miller's Screen",
    description: "Affordable financing options for your screen enclosure project. 0% interest for 18 months available.",
  },
}

const trustItems = [
  { icon: Zap, text: 'Fast application' },
  { icon: Shield, text: 'Flexible payment options' },
  { icon: CreditCard, text: 'Qualified buyers may access promotional plans' },
  { icon: Calendar, text: 'Backed by trusted lending partners' },
]

const financingCards = [
  {
    title: 'Promotional Financing',
    bullets: ['Fast online application', 'Credit-based approval', 'Promotional offers may vary', 'Great for larger projects'],
  },
  {
    title: 'Fixed Payment Plans',
    bullets: ['Set monthly payments', 'Multiple term options', 'Straightforward repayment structure', 'Helpful for budget planning'],
  },
]

const steps = [
  {
    num: '1',
    title: 'Apply Online',
    desc: 'Complete the quick GreenSky® application using our secure financing link.',
  },
  {
    num: '2',
    title: 'Review Available Offers',
    desc: 'Qualified applicants can review available financing offers and plan options.',
  },
  {
    num: '3',
    title: 'Start Your Project',
    desc: 'Once approved, we can move forward with scheduling and project planning.',
  },
]

export default function FinancingPage() {
  return (
    <>
      <HeroSection
        headline="FINANCING OPTIONS"
        subheadline="Flexible Financing for Your Screen Enclosure Project"
        image="/projects/project-72555.jpg"
        ctaPrimary={{ label: 'Apply for Financing', href: 'https://apply.greensky.com/' }}
        ctaSecondary={{ label: 'Request an Estimate', href: '/contact#form' }}
      />

      <section className="py-12 md:py-16 bg-bg-1">
        <div className="section-container">
          <p className="text-center text-muted max-w-2xl mx-auto mb-10">
            Start your project now with approved financing options through GreenSky®. Fast application. Flexible payment plans. No money down options may be available for qualified buyers.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {trustItems.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.text} className="flex flex-col items-center text-center gap-2">
                  <div className="w-12 h-12 rounded-lg bg-accent-red/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-accent-red" />
                  </div>
                  <p className="text-sm text-text-primary font-medium">{item.text}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="section-container">
          <h2 className="text-text-primary text-center text-2xl md:text-3xl font-bold mb-10">Financing Options</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {financingCards.map((card) => (
              <div key={card.title} className="card border border-line hover:border-accent-red/30 transition-colors">
                <h3 className="text-xl font-bold text-text-primary mb-4">{card.title}</h3>
                
                <ul className="space-y-2 mb-6">
                  {card.bullets.map((bullet, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-muted">
                      <Check className="w-4 h-4 text-accent-red flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://apply.greensky.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-primary justify-center"
                >
                  Apply for Financing
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-bg-1">
        <div className="section-container">
          <h2 className="text-text-primary text-center text-2xl md:text-3xl font-bold mb-10">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step) => (
              <div key={step.num} className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent-red text-white font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {step.num}
                </div>
                <h3 className="text-lg font-bold text-text-primary mb-2">{step.title}</h3>
                <p className="text-muted text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-bg-1">
        <div className="section-container">
          <div className="bg-panel rounded-lg p-6 border-l-4 border-accent-red max-w-4xl mx-auto">
            <p className="text-muted text-sm leading-relaxed">
              Financing is subject to credit approval. Terms, rates, and promotional offers vary by applicant and lender program.
            </p>
            <p className="text-muted text-sm leading-relaxed mt-3">
              Financing for the GreenSky® consumer loan program is provided by Equal Opportunity Lenders. GreenSky® is a registered trademark of GreenSky, LLC, a subsidiary of Goldman Sachs Bank USA. NMLS #1416362. Loans originated by Goldman Sachs are issued by Goldman Sachs Bank USA, Salt Lake City Branch. NMLS #208156. www.nmlsconsumeraccess.org
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
