import { Metadata } from 'next'
import HeroSection from '@/components/hero-section'
import CTABlock from '@/components/cta-block'
import FAQSection from '@/components/faq-section'
import Link from 'next/link'
import { ArrowRight, Check, Wrench, Shield, Clock, AlertTriangle } from 'lucide-react'

export const metadata: Metadata = {
  title: "Screen Enclosure Repair Volusia County | Pool Cage & Frame Repair",
  description: "Professional screen enclosure repair in Volusia County. Frame fixes, sagging screens, door repairs, rust removal, and more. Licensed crew, free estimates. Call 386-756-8770.",
  keywords: ['screen repair', 'pool cage repair', 'enclosure repair', 'frame repair', 'screen door repair', 'rust removal', 'volusia county', 'daytona beach'],
  openGraph: {
    title: "Screen Enclosure Repair | Miller's Screen",
    description: "Professional screen enclosure repair in Volusia County. Licensed crew, free estimates.",
  },
}

const repairFaqs = [
  {
    question: "How much does screen enclosure repair cost?",
    answer: "Repair costs vary depending on the extent of damage and what needs to be fixed. Minor repairs may cost a few hundred dollars while major frame work can run higher. We provide free estimates so you know the cost before we start."
  },
  {
    question: "Can you repair just part of my enclosure?",
    answer: "Yes! We can repair individual sections, panels, doors, or frame components without replacing the entire enclosure. We'll assess what's needed and recommend the most cost-effective solution."
  },
  {
    question: "My screen is sagging - can it be repaired?",
    answer: "Sagging screens are usually caused by loose spring tension or damaged spline. In most cases, we can re-tension or replace just the affected panel without a full rescreen."
  },
  {
    question: "Do you fix screen doors?",
    answer: "Yes! We repair all types of screen doors including pool cage doors, slider doors, and hinged doors. We can replace door screens, fix frames, adjust closing, and replace hardware."
  },
  {
    question: "What causes rust on my enclosure frame?",
    answer: "Florida's salt air and humidity cause oxidation on aluminum frames over time. We offer rust treatment and conversion coating to slow future corrosion and extend your enclosure's life."
  },
]

const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": repairFaqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
}

const services = [
  {
    title: 'Frame Repair',
    description: 'Bent or damaged aluminum frame sections repaired or replaced. We maintain structural integrity.'
  },
  {
    title: 'Screen Replacement',
    description: 'Torn, sagging, or damaged screens replaced with your choice of mesh material.'
  },
  {
    title: 'Door Repair',
    description: 'Screen doors adjusted, rescreened, or hardware replaced for smooth operation.'
  },
  {
    title: 'Rust Treatment',
    description: 'Frame rust cleaned, treated, and coated to prevent future corrosion from salt air.'
  },
  {
    title: 'Panel Re-Tensioning',
    description: 'Loose or sagging screens re-tensioned and re-splined without full replacement.'
  },
  {
    title: 'Seal & Gasket Repair',
    description: 'Weather stripping and seals replaced to prevent water intrusion and drafts.'
  },
]

export default function RepairPage() {
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
            "name": "Screen Enclosure Repair",
            description: "Professional screen enclosure repair in Volusia County, Florida. Frame repair, screen replacement, door repair, and rust treatment services.",
            "provider": {
              "@id": "https://millersscreen.com/#business"
            },
            "areaServed": {
              "@type": "State",
              "name": "Florida"
            },
            "serviceType": "Repair"
          })
        }}
      />
      <HeroSection
        headline="SCREEN ENCLOSURE REPAIR"
        subheadline="We fix what's broken. Restore your enclosure instead of replacing it."
        image="/projects/project-72554.jpg"
        ctaPrimary={{ label: 'Request an Estimate', href: '/contact#form' }}
        ctaSecondary={{ label: 'Call Now', href: 'tel:386-756-8770' }}
        trustBullets={[
          '40+ Years Experience',
          'In-House Repair Crews',
          'Free Estimates',
        ]}
      />

      {/* Services We Offer */}
      <section className="py-12 md:py-16 bg-bg-1">
        <div className="section-container">
          <h2 className="text-text-primary text-2xl md:text-3xl font-bold mb-6 text-center">
            Repair Services We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={i} className="bg-panel rounded-lg p-6 border border-line">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-accent-red/10 flex items-center justify-center flex-shrink-0">
                    <Wrench className="w-5 h-5 text-accent-red" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary mb-2">{service.title}</h3>
                    <p className="text-muted text-sm">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Signs You Need Repair */}
      <section className="py-12 md:py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-text-primary text-2xl md:text-3xl font-bold mb-6">
                Signs Your Enclosure Needs Repair
              </h2>
              <div className="space-y-4">
                {[
                  'Torn or hole in screen mesh',
                  'Sagging or loose screens',
                  'Door won\'t close properly',
                  'Visible rust on frame',
                  'Water leaking during storms',
                  'Gaps around frame edges',
                  'Damaged or bent frame',
                  'Missing or broken screen clips'
                ].map((sign, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-accent-red flex-shrink-0" />
                    <span className="text-text-primary">{sign}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="bg-panel rounded-xl p-6 border border-line">
                <h3 className="text-xl font-bold text-text-primary mb-4">Why Repair vs Replace?</h3>
                <div className="space-y-4">
                  {[
                    { title: 'Cost Effective', desc: 'Repairs are typically 30-50% of replacement cost' },
                    { title: 'Faster', desc: 'Most repairs completed in 1-2 days' },
                    { title: 'Preserve Investment', desc: 'Keep your existing good frame and structure' },
                    { title: 'Know When to Replace', desc: 'We\'ll honestly advise if replacement makes more sense' }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-text-primary">{item.title}</span>
                        <p className="text-sm text-muted">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-8 bg-bg-1 border-y border-line">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-black text-accent-red">40+</div>
              <p className="text-sm text-muted">Years Experience</p>
            </div>
            <div>
              <div className="text-3xl font-black text-accent-red">1,000+</div>
              <p className="text-sm text-muted">Repairs Completed</p>
            </div>
            <div>
              <div className="text-3xl font-black text-accent-red">100%</div>
              <p className="text-sm text-muted">In-House Crews</p>
            </div>
            <div>
              <div className="text-3xl font-black text-accent-red">1</div>
              <p className="text-sm text-muted">Year Warranty</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 bg-accent-red">
        <div className="section-container text-center">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
            Need Repairs Done Right?
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            We'll assess the damage and give you an honest recommendation - repair if possible, replacement if needed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact#form" className="bg-white text-accent-red font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              Get Free Estimate
            </Link>
            <a href="tel:386-756-8770" className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center">
              Call 386-756-8770
            </a>
          </div>
        </div>
      </section>

      <FAQSection faqs={repairFaqs} />

      {/* Related Services */}
      <section className="py-12 md:py-16 bg-bg-1">
        <div className="section-container">
          <h3 className="text-lg font-semibold text-text-primary mb-6 text-center">You might also need:</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/rescreen" className="text-accent-red hover:underline font-medium flex items-center gap-2">
              Rescreening <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/pool-enclosures" className="text-accent-red hover:underline font-medium flex items-center gap-2">
              New Enclosure <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/megaview" className="text-accent-red hover:underline font-medium flex items-center gap-2">
              MegaView Upgrade <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <CTABlock
        title="Need a repair estimate?"
        cta={{ label: 'Get Free Estimate', href: '/contact#form' }}
      />
    </>
  )
}