import { Metadata } from 'next'
import HeroSection from '@/components/hero-section'
import CTABlock from '@/components/cta-block'
import FAQSection from '@/components/faq-section'
import { generateFAQSchema } from '@/lib/seo'

export const metadata: Metadata = {
  title: "Screen Rescreening Services Volusia County | Pool Enclosure Rescreen",
  description: "Professional screen rescreening in Volusia County. Replace worn screens, fix storm damage, restore your pool enclosure or screen room. Fast service, free estimates. Call 386-756-8770.",
  keywords: ['rescreen', 'rescreening', 'screen replacement', 'pool cage rescreen', 'screen repair', 'volusia county', 'daytona beach', 'screen mesh replacement'],
  alternates: { canonical: 'https://millersscreen.com/rescreen' },
  openGraph: {
    title: "Screen Rescreening Services | Miller's Screen",
    description: "Professional screen rescreening in Volusia County. Fast service, free estimates.",
  },
}

const rescreenFaqs = [
  {
    question: "How much does rescreening cost in Volusia County?",
    answer: "Rescreening costs in Volusia County typically range from $500 to $3,000+ depending on the size of the area, type of screen mesh you choose, and extent of the damage. At Miller's Screen, we provide free estimates with no obligation."
  },
  {
    question: "How long does rescreening take?",
    answer: "Most rescreening projects take 1-2 days depending on the size. Smaller areas like a single screen room can often be completed in a few hours. We'll give you a timeline when we provide your estimate."
  },
  {
    question: "What screen mesh options do you offer?",
    answer: "We offer several screen mesh options including standard fiberglass, pet-resistant screen (heavier duty), solar screen (reduces heat), and no-see-um screen (finer mesh for insects). We'll help you choose the best option for your needs and budget."
  },
  {
    question: "Can you rescreen after storm damage?",
    answer: "Yes! We frequently handle rescreening after storms, hurricanes, or wind damage. If your screens were damaged, we can assess the damage and replace just the screens or recommend a more durable option going forward."
  },
  {
    question: "Do I need a permit for rescreening?",
    answer: "Typically no - rescreening is considered maintenance and doesn't require a permit. However, if we're replacing structural components or doing frame repairs, permits may be required. We'll let you know during your estimate."
  },
]

const faqData = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": rescreenFaqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
}

export default function RescreenPage() {
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
            "name": "Screen Rescreening Services",
            "description": "Professional screen rescreening in Volusia County, Florida. Screen replacement, storm damage repair, and maintenance services.",
            "provider": {
              "@id": "https://millersscreen.com/#business"
            },
            "areaServed": {
              "@type": "State",
              "name": "Florida"
            },
            "serviceType": "Maintenance"
          })
        }}
      />
      <HeroSection
        headline="RESCREENING SERVICES"
        subheadline="Restore your views. Replace worn screens. Get your enclosure looking like new."
        image="/projects/project-72552.jpg"
        ctaPrimary={{ label: 'Request an Estimate', href: '/contact#form' }}
        ctaSecondary={{ label: 'Call Now', href: 'tel:386-756-8770' }}
        trustBullets={[
          'Same-Day Estimates Available',
          'Multiple Screen Options',
          'Storm Damage Specialists',
        ]}
      />

      {/* Why Rescreen */}
      <section className="py-12 md:py-16 bg-bg-1">
        <div className="section-container">
          <h2 className="text-text-primary text-2xl md:text-3xl font-bold mb-6">
            Why Rescreen?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Restore Your View',
                description: 'Over time, screens become faded, torn, or cloudy. New screens restore crystal-clear views of your pool and backyard.'
              },
              {
                title: 'Florida Weather Wear',
                description: 'Sun, salt air, and humidity take a toll. Florida screens typically need replacement every 7-10 years.'
              },
              {
                title: 'Storm Damage',
                description: 'Storms and high winds can tear or puncture screens. We can replace individual panels or entire enclosures.'
              },
              {
                title: 'Pet Damage',
                description: 'Dogs and cats can damage screens over time. We offer pet-resistant screen mesh for extra durability.'
              },
              {
                title: 'Better Airflow',
                description: 'New screens with smaller mesh can actually improve airflow while keeping out gnats and no-see-ums.'
              },
              {
                title: 'Increase Home Value',
                description: 'A well-maintained screen enclosure adds to your home\'s value and appeal if you\'re considering selling.'
              },
            ].map((item, i) => (
              <div key={i} className="bg-panel rounded-lg p-6 border border-line">
                <h3 className="text-lg font-bold text-text-primary mb-2">{item.title}</h3>
                <p className="text-muted text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screen Options */}
      <section className="py-12 md:py-16">
        <div className="section-container">
          <h2 className="text-text-primary text-2xl md:text-3xl font-bold mb-6 text-center">
            Screen Mesh Options
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { name: 'Standard Fiberglass', price: 'Most Affordable', features: ['Standard 18×16 mesh', 'Grey or Charcoal', '3-5 year lifespan'] },
              { name: 'Pet-Resistant', price: 'Extra Durable', features: ['Thicker 7mil mesh', 'Lifetime warranty option', 'Dog and cat proof'] },
              { name: 'Solar Screen', price: 'Heat Reduction', features: ['Blocks 65% of heat', 'UV resistant', 'Lower energy costs'] },
              { name: 'No-See-Um', price: 'Fine Mesh', features: ['Keeps tiny insects out', '20×20 mesh', 'Great for pools'] },
            ].map((option, i) => (
              <div key={i} className="bg-panel rounded-lg p-5 border border-line hover:border-accent-red/30 transition-colors">
                <h3 className="font-bold text-text-primary mb-1">{option.name}</h3>
                <p className="text-xs text-accent-red font-medium mb-3">{option.price}</p>
                <ul className="space-y-1">
                  {option.features.map((feature, j) => (
                    <li key={j} className="text-xs text-muted">• {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 bg-accent-red">
        <div className="section-container text-center">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
            Need Screens Replaced?
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto">
            Whether it's general wear and tear or storm damage, we'll get your enclosure looking like new.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact#form" className="bg-white text-accent-red font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center">
              Get Free Estimate
            </a>
            <a href="tel:386-756-8770" className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center">
              Call 386-756-8770
            </a>
          </div>
        </div>
      </section>

      <FAQSection faqs={rescreenFaqs} />

      <CTABlock
        title="Ready to restore your enclosure?"
        cta={{ label: 'Get Free Estimate', href: '/contact#form' }}
      />
    </>
  )
}