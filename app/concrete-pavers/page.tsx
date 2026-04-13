import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Check, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: "Concrete & Paver Services in Volusia County | Driveways, Patios & More",
  description: "Professional concrete and paver installation in Volusia County, FL. Driveways, patios, pool decks, and more. Licensed contractor with 40+ years experience. Request your free estimate today.",
  keywords: ['concrete', 'pavers', 'driveway', 'patio', 'pool deck', 'volusia county', 'daytona beach', 'port orange'],
  openGraph: {
    title: "Concrete & Paver Services | Miller's Screen",
    description: "Professional concrete and paver installation in Volusia County. Driveways, patios, pool decks, and more.",
  },
}

const serviceAreas = [
  'Daytona Beach',
  'Port Orange',
  'Ormond Beach',
  'New Smyrna Beach',
  'DeLand',
  'Deltona',
]

const services = [
  {
    title: 'Driveways',
    description: 'Durable, attractive concrete driveways built to last. From standard pours to decorative stamped concrete.',
  },
  {
    title: 'Patios',
    description: 'Transform your backyard with a custom patio. Concrete or pavers to match your style.',
  },
  {
    title: 'Pool Decks',
    description: 'Slip-resistant pool deck solutions that look great and handle Florida weather.',
  },
  {
    title: 'Walkways',
    description: 'Elegant walkways that connect your outdoor spaces with durable, low-maintenance materials.',
  },
  {
    title: 'Slabs & Footers',
    description: 'Solid foundations for your enclosure projects. Proper preparation for lasting results.',
  },
  {
    title: 'Decorative Pavers',
    description: 'Add visual interest with pavers in various patterns and colors for driveways, walkways, and more.',
  },
]

const benefits = [
  'Licensed and insured',
  '40+ years experience',
  'Free estimates',
  'In-house crews',
  'Permits handled',
  'Quality materials',
]

export default function ConcretePaversPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/projects/project-72552.jpg"
            alt="Concrete and paver project"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-0 via-bg-0/90 to-bg-0/30" />
        </div>

        <div className="section-container relative z-10 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-accent-red/10 text-accent-red px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <MapPin className="w-4 h-4" />
              Volusia County, Florida
            </div>
            <h1 className="text-text-primary text-4xl sm:text-5xl md:text-6xl font-black leading-[1.1] mb-4">
              Concrete & Pavers
            </h1>
            <p className="text-xl md:text-2xl text-white mb-6">
              Durable, beautiful concrete and paver installations for driveways, patios, pool decks, and more.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link href="/contact#form" className="btn-primary text-lg px-8 py-4 min-h-[52px] text-center inline-flex items-center justify-center gap-2">
                Get a Free Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:386-756-8770" className="btn-secondary text-lg px-8 py-4 min-h-[52px] text-center inline-flex items-center justify-center gap-2">
                Call 386-756-8770
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Strip */}
      <section className="py-8 bg-bg-1 border-y border-line">
        <div className="section-container">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 text-sm">
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-text-primary font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-24">
        <div className="section-container">
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-12">
            What We Offer
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-panel rounded-xl p-6 border border-line hover:border-accent-red/30 transition-colors"
              >
                <h3 className="text-xl font-bold text-text-primary mb-3">{service.title}</h3>
                <p className="text-muted">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 md:py-24 bg-bg-1">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-6">
                Why Choose Miller&apos;s Screen?
              </h2>
              <p className="text-muted mb-6 leading-relaxed">
                When you need concrete or paver work, you want it done right the first time. We bring 40+ years of construction experience to every project, with in-house crews who take pride in their craft.
              </p>
              <ul className="space-y-4">
                {[
                  'In-house crews (no subcontractors)',
                  'Proper preparation and base work',
                  'Quality materials from trusted suppliers',
                  'Clean, professional installation',
                  'Cleanup included',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-4 h-4 text-green-500" />
                    </div>
                    <span className="text-text-primary">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-panel">
                <Image
                  src="/projects/project-72552.jpg"
                  alt="Concrete work"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-6 p-6 bg-accent-red rounded-xl">
                <p className="text-white font-bold text-lg mb-2">Ready to start your project?</p>
                <p className="text-white/80 text-sm mb-4">Get a free, no-obligation estimate today.</p>
                <Link href="/contact#form" className="inline-flex items-center gap-2 bg-white text-accent-red font-bold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
                  Get Your Free Quote
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 md:py-20">
        <div className="section-container">
          <h2 className="text-2xl md:text-3xl font-bold text-text-primary text-center mb-8">
            Areas We Serve
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {serviceAreas.map((area, index) => (
              <span key={index} className="flex items-center gap-2 bg-panel px-4 py-2 rounded-full text-sm text-text-primary">
                <MapPin className="w-4 h-4 text-accent-red" />
                {area}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-24 bg-accent-red">
        <div className="section-container text-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Whether you need a new driveway, patio, or pool deck, we&apos;ve got you covered. Free estimates, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact#form" className="bg-white text-accent-red font-bold px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2">
              Get Free Estimate
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:386-756-8770" className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-lg hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2">
              Call 386-756-8770
            </a>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 md:py-16 bg-bg-1">
        <div className="section-container">
          <h3 className="text-lg font-semibold text-text-primary mb-6 text-center">You might also be interested in:</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/daytona-beach/pool-enclosures" className="text-accent-red hover:underline font-medium">
              Pool Enclosures in Daytona Beach →
            </Link>
            <Link href="/screen-rooms" className="text-accent-red hover:underline font-medium">
              Screen Rooms →
            </Link>
            <Link href="/megaview" className="text-accent-red hover:underline font-medium">
              MegaView® Enclosures →
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
