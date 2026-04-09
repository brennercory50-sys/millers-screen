import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Phone, CheckCircle, ArrowRight, Star, Clock } from 'lucide-react'
import MobileCTABar from '@/components/mobile-cta-bar'

const CITIES: Record<string, { name: string; description: string; neighborhoods: string[] }> = {
  'daytona-beach': {
    name: 'Daytona Beach',
    description: 'Daytona Beach homeowners trust Miller\'s Screen for pool enclosures and screen rooms. From beachside to the mainland, we\'ve built hundreds of enclosures throughout Daytona Beach.',
    neighborhoods: ['Daytona Beach Shores', 'South Daytona', 'Holly Hill', 'Ormond-by-the-Sea', 'Pelican Bay'],
  },
  'port-orange': {
    name: 'Port Orange',
    description: 'Port Orange residents choose Miller\'s Screen for their enclosure projects. Our in-house crews service all of Port Orange with fast, professional installations backed by 40+ years of experience.',
    neighborhoods: ['Halifax Plantation', 'The Villages', 'Lakeside', 'Cypress Woods', 'Cobblestone'],
  },
  'ormond-beach': {
    name: 'Ormond Beach',
    description: 'Ormond Beach homeowners trust Miller\'s Screen for premium pool enclosures and screen rooms. We understand the unique needs of coastal construction in the Ormond Beach area.',
    neighborhoods: ['Ormond Beach', 'Breakaway Trails', 'Hunters Ridge', 'Benton Creek', 'The Trails'],
  },
  'new-smyrna-beach': {
    name: 'New Smyrna Beach',
    description: 'New Smyrna Beach\'s coastal climate demands durable, well-engineered enclosures. Miller\'s Screen has served NSB for decades with enclosures built to withstand salt air and coastal conditions.',
    neighborhoods: ['Coral Bay', 'Silver Sands', 'Coastal Woods', 'Samsula', 'Gleneagles'],
  },
  'deland': {
    name: 'DeLand',
    description: 'DeLand homeowners choose Miller\'s Screen for professional enclosure installations. From historic homes downtown to new construction in DeLand\'s growing neighborhoods, we deliver quality.',
    neighborhoods: ['Victoria Park', 'Ridgecrest', 'Sunset Hills', 'Lake Woodruff', 'DeLand Highlands'],
  },
  'deltona': {
    name: 'Deltona',
    description: 'Deltona families trust Miller\'s Screen for their pool enclosures and screen rooms. We\'ve completed hundreds of projects in Deltona, serving this growing community with expert installations.',
    neighborhoods: ['Deltona Woods', 'Lake Forest', 'Spring Hill', 'Deltona Lakes', 'Pine Trail'],
  },
  'south-daytona': {
    name: 'South Daytona',
    description: 'As a local South Daytona business, Miller\'s Screen has deep roots in this community. We\'re your neighbors, and we treat every project like we\'re building for family.',
    neighborhoods: ['Halifax Heights', 'McDonald Terrace', 'McGinnis Heights', 'Rose Park', 'Sunset Park'],
  },
}

const SERVICES: Record<string, { name: string; pluralName: string; description: string; benefits: string[] }> = {
  'pool-enclosures': {
    name: 'Pool Enclosure',
    pluralName: 'Pool Enclosures',
    description: 'Protect your pool and create outdoor living space with a professionally engineered pool enclosure. Our in-house crews handle everything from permits to final inspection.',
    benefits: [
      'Engineered for Florida wind loads',
      'Permits handled by our team',
      'In-house installation crews',
      'Multiple finish options',
      '1-year workmanship warranty',
    ],
  },
  'screen-rooms': {
    name: 'Screen Room',
    pluralName: 'Screen Rooms',
    description: 'Transform your patio into a comfortable, pest-free outdoor living space. Our screen rooms are built to match your home\'s architecture and provide years of maintenance-free enjoyment.',
    benefits: [
      'Custom designs for any size',
      'Multiple roof styles available',
      'Integrated with existing structures',
      'Premium screen options',
      'Professional installation',
    ],
  },
  'concrete-pavers': {
    name: 'Concrete / Pavers',
    pluralName: 'Concrete / Pavers',
    description: 'Add beauty and functionality to your outdoor space with professional concrete and paver installations. From driveways to patios, we deliver durable, lasting results.',
    benefits: [
      'Professional concrete work',
      'Decorative paver installations',
      'Driveways and walkways',
      'Patios and pool decks',
      'Quality materials and craftsmanship',
    ],
  },
}

const BASE_PROJECTS = [
  { image: '/projects/project-122978.jpg', alt: 'Pool enclosure project' },
  { image: '/projects/project-122980.jpg', alt: 'Screen enclosure project' },
  { image: '/projects/project-72552.jpg', alt: 'Florida pool cage' },
  { image: '/projects/project-72554.jpg', alt: 'Custom enclosure project' },
]

interface Props {
  params: Promise<{ city: string; service: string }>
}

export async function generateStaticParams() {
  const cities = Object.keys(CITIES)
  const services = Object.keys(SERVICES)
  const params: { city: string; service: string }[] = []

  cities.forEach(city => {
    services.forEach(service => {
      params.push({ city, service })
    })
  })

  return params
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, service } = await params
  const cityData = CITIES[city]
  const serviceData = SERVICES[service]

  if (!cityData || !serviceData) {
    return { title: 'Not Found' }
  }

  const title = `${cityData.name} ${serviceData.pluralName} | Miller's Screen`
  const description = `Professional ${serviceData.name.toLowerCase()} installation in ${cityData.name}. Licensed contractor, in-house crews, permits included. Get your free estimate today. Call 386-756-8770.`

  return {
    title,
    description,
    alternates: {
      canonical: `https://millersscreen.com/${city}/${service}`,
    },
    openGraph: {
      title,
      description,
      locale: 'en_US',
      type: 'website',
      url: `https://millersscreen.com/${city}/${service}`,
      siteName: "Miller's Screen",
    },
  }
}

export default async function ServiceAreaPage({ params }: Props) {
  const { city, service } = await params
  const cityData = CITIES[city]
  const serviceData = SERVICES[service]

  if (!cityData || !serviceData) {
    notFound()
  }

  const pageUrl = `https://millersscreen.com/${city}/${service}`
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `How much does a ${serviceData.name.toLowerCase()} cost in ${cityData.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Prices for ${serviceData.name.toLowerCase()}s in ${cityData.name} vary based on size and specifications. Miller's Screen provides free, detailed estimates with no obligation. Contact us at 386-756-8770 for your personalized quote.`,
        },
      },
      {
        '@type': 'Question',
        name: `Do I need a permit for a ${serviceData.name.toLowerCase()} in ${cityData.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Yes, building permits are typically required. At Miller's Screen, we handle all permitting as part of our service. Our team submits the application, provides engineering drawings, and coordinates with local building departments.`,
        },
      },
      {
        '@type': 'Question',
        name: `How long does a ${serviceData.name.toLowerCase()} take in ${cityData.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Installation typically takes 1-3 days once permits are approved. The permitting process adds 2-4 weeks depending on your municipality. We use our own in-house crews for faster, more reliable scheduling.`,
        },
      },
      {
        '@type': 'Question',
        name: `Why choose Miller's Screen in ${cityData.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Miller's Screen has served Volusia County for 40+ years with over 1,000 completed projects. We're family-owned, use our own in-house crews (no subcontractors), and handle every aspect from permits to final inspection.`,
        },
      },
    ],
  }

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://millersscreen.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: cityData.name,
        item: `https://millersscreen.com/${city}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: serviceData.pluralName,
        item: pageUrl,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] md:min-h-[70vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-bg-0 via-bg-0/95 to-accent-red/20" />
        </div>
        <div className="section-container relative z-10 py-16 md:py-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent-red/10 text-accent-red px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <MapPin className="w-4 h-4" />
              Serving {cityData.name} & All Volusia County
            </div>
            <h1 className="text-text-primary text-3xl sm:text-4xl md:text-5xl font-black leading-[1.1] mb-4">
              {cityData.name} {serviceData.pluralName}
            </h1>
            <p className="text-base md:text-xl text-muted mb-8 leading-relaxed max-w-xl">
              {cityData.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact#form" className="btn-primary text-base md:text-lg px-8 py-4 min-h-[52px] text-center inline-flex items-center justify-center gap-2">
                Get Free Estimate
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:386-756-8770" className="btn-secondary text-base md:text-lg px-8 py-4 min-h-[52px] text-center inline-flex items-center justify-center gap-2">
                <Phone className="w-5 h-5" />
                Call 386-756-8770
              </a>
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
              <p className="text-sm text-muted">Projects Completed</p>
            </div>
            <div>
              <div className="text-3xl font-black text-accent-red">5★</div>
              <p className="text-sm text-muted">Customer Rating</p>
            </div>
            <div>
              <div className="text-3xl font-black text-accent-red">100%</div>
              <p className="text-sm text-muted">In-House Crews</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-text-primary text-3xl md:text-4xl font-bold mb-6">
                Professional {serviceData.name} Installation in {cityData.name}
              </h2>
              <p className="text-muted leading-relaxed mb-6">
                {serviceData.description}
              </p>
              <ul className="space-y-3">
                {serviceData.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-text-primary">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="bg-panel rounded-xl p-6 border border-line">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-full bg-accent-red flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-muted">Review</p>
                    <p className="font-bold text-text-primary">5.0 Stars</p>
                  </div>
                </div>
                <blockquote className="text-text-primary italic mb-4">
                  &ldquo;Miller&apos;s Screen did an excellent job on our pool enclosure. Professional crew, clean work, finished ahead of schedule. Highly recommend for anyone in Daytona Beach!&rdquo;
                </blockquote>
                <p className="text-sm text-muted">— Verified Customer, {cityData.name}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-12 md:py-16 bg-bg-1">
        <div className="section-container">
          <h2 className="text-text-primary text-2xl md:text-3xl font-bold mb-6">
            {cityData.name} Areas We Serve
          </h2>
          <p className="text-muted mb-6">
            We service all neighborhoods in {cityData.name} and surrounding areas:
          </p>
          <div className="flex flex-wrap gap-2">
            {cityData.neighborhoods.map((neighborhood, i) => (
              <a
                key={i}
                href={`#form`}
                className="bg-panel px-4 py-2 rounded-full text-sm text-text-primary hover:bg-accent-red hover:text-white transition-colors cursor-pointer"
              >
                {neighborhood}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-accent-red">
        <div className="section-container text-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your {cityData.name} Project?
          </h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            Get your free, no-obligation estimate today. We&apos;ll visit your property, discuss your needs, and provide a detailed quote.
          </p>
          <p className="text-white/60 text-sm mb-6 flex items-center justify-center gap-2">
            <Clock className="w-4 h-4" />
            We respond within 1 hour
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact#form" className="bg-white text-accent-red font-bold px-8 py-4 rounded-md hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2">
              Get Free Estimate
              <ArrowRight className="w-5 h-5" />
            </Link>
            <a href="tel:386-756-8770" className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-md hover:bg-white/10 transition-colors inline-flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              Call 386-756-8770
            </a>
          </div>
        </div>
      </section>

      {/* Other Services */}
      <section className="py-12 md:py-16">
        <div className="section-container">
          <h2 className="text-text-primary text-2xl font-bold mb-6">Other Services in {cityData.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(SERVICES)
              .filter(([key]) => key !== service)
              .map(([key, data]) => (
                <Link
                  key={key}
                  href={`/${city}/${key}`}
                  className="card p-6 hover:border-accent-red/50 transition-colors group"
                >
                  <h3 className="font-bold text-text-primary group-hover:text-accent-red transition-colors mb-2">
                    {data.pluralName}
                  </h3>
                  <p className="text-sm text-muted">{data.description.substring(0, 100)}...</p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* Other Cities */}
      <section className="py-12 md:py-16 bg-bg-1">
        <div className="section-container">
          <h2 className="text-text-primary text-2xl font-bold mb-6">Other Areas We Serve</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {Object.entries(CITIES)
              .filter(([key]) => key !== city)
              .map(([key, data]) => (
                <Link
                  key={key}
                  href={`/${key}/${service}`}
                  className="text-center p-4 rounded-lg bg-panel hover:bg-accent-red hover:text-white transition-colors"
                >
                  <MapPin className="w-5 h-5 mx-auto mb-2" />
                  <span className="font-medium">{data.name}</span>
                </Link>
              ))}
          </div>
        </div>
      </section>

      <MobileCTABar />
    </>
  )
}
