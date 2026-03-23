import { Metadata } from 'next'

interface SEOMetadata {
  title: string
  description: string
  keywords?: string[]
  path: string
  type?: 'website' | 'article'
  image?: string
}

const KEYWORDS = {
  poolEnclosures: ['pool enclosure', 'pool cage', 'pool screen enclosure', 'screen pool enclosure', 'florida pool enclosure', 'daytona beach pool enclosure'],
  screenRooms: ['screen room', 'screen enclosure', 'patio enclosure', 'lanai', 'florida screen room', 'outdoor living space'],
  megaview: ['megaview enclosure', 'cableless enclosure', 'unobstructed view enclosure', 'modern screen enclosure', 'premium pool enclosure'],
  general: ['screen repair', 'rescreen', 'volusia county', 'daytona beach', 'florida', 'aluminum construction', 'pool cage', 'screen enclosure contractor'],
}

function generateTitle(page: string, location?: string): string {
  const titles: Record<string, string> = {
    home: "Volusia County's #1 Screen Enclosure Contractor | Miller's Screen",
    poolEnclosures: location 
      ? `${location} Pool Enclosure Contractor | Licensed & Insured`
      : "Pool Enclosure Experts in Volusia County | Licensed & Permitted",
    screenRooms: location
      ? `${location} Screen Room Builder | Custom Patio Enclosures`
      : "Custom Screen Rooms & Patio Enclosures | Volusia County",
    megaview: "MegaView® Enclosures Volusia County | Exclusive Cable-Free Design",
    showcase: "Our Screen Enclosure Projects | View Completed Jobs",
    financing: "Financing Options for Screen Enclosures | Easy Payment Plans",
    warranty: "Warranty & Maintenance | Miller's Screen",
    about: "About Miller's Screen | 40+ Years Volusia County Experience",
    contact: "Get a Free Screen Enclosure Estimate | Contact Miller's Screen",
  }
  return titles[page] || titles.home
}

function generateDescription(page: string, location?: string): string {
  const descriptions: Record<string, string> = {
    home: "Volusia County's most trusted screen enclosure contractor. Pool enclosures, screen rooms, and MegaView® installations. 40+ years experience, in-house crews, licensed & permitted. Free estimates. Call 386-756-8770.",
    poolEnclosures: location
      ? `Professional ${location} pool enclosure contractor. Full-service installation with permits, engineering, and in-house crews. Pool cages starting at $X. Free estimate. Call 386-756-8770.`
      : "Expert pool enclosure installation in Volusia County, FL. Engineering, permitting, and installation all handled by our in-house crews. Licensed contractors with 40+ years experience. Request your free estimate today.",
    screenRooms: location
      ? `Custom ${location} screen room builder. Transform your patio into a comfortable outdoor living space. Permitted installs, premium materials, expert craftsmanship. Free estimate. Call 386-756-8770.`
      : "Custom screen rooms and patio enclosures in Volusia County. Expert design, quality construction, and professional installation. Create the outdoor living space you've always wanted. Get your free estimate.",
    megaview: "Miller's Screen is the ONLY authorized MegaView® builder in Volusia County. Experience the clearest views with our exclusive cable-supported, post-free enclosure design. Request a MegaView consultation today.",
    showcase: "Browse our portfolio of completed pool enclosures, screen rooms, and MegaView® projects. 1000+ completed jobs across Volusia County. See the quality of our craftsmanship.",
    financing: "Affordable financing options for your screen enclosure project. 0% interest for 18 months available. Get the outdoor space you want now and pay over time. Apply today.",
    warranty: "Miller's Screen workmanship warranty and maintenance guide. One-year warranty on all installations. Learn how to care for your screen enclosure.",
    about: "Family-owned and operated for 40+ years. Miller's Screen has completed over 1,000 projects in Volusia County. Meet our team of experienced installers, designers, and support staff.",
    contact: "Contact Miller's Screen for your free pool enclosure or screen room estimate. Call 386-756-8770 or request online. Fast response, no-obligation quotes, in-house crews.",
  }
  return descriptions[page] || descriptions.home
}

export function generateSEOMetadata(config: SEOMetadata): Metadata {
  const { title, description, keywords = [], path, type = 'website', image } = config
  
  const canonicalUrl = `https://millersscreen.com${path}`
  const ogImage = image || '/og-image.png'

  return {
    title,
    description,
    keywords: keywords.join(', '),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type,
      locale: 'en_US',
      url: canonicalUrl,
      siteName: "Miller's Screen",
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
      site: "@MillersScreen",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    other: {
      'geo.region': 'US-FL',
      'geo.placename': 'South Daytona',
      'geo.position': '29.1697;-81.0056',
      'ICBM': '29.1697, -81.0056',
    },
  }
}

export function generateFAQSchema(page: string): Array<{ question: string; answer: string }> {
  const faqMap: Record<string, Array<{ question: string; answer: string }>> = {
    poolEnclosures: [
      {
        question: "How much does a pool enclosure cost in Volusia County?",
        answer: "Pool enclosure costs in Volusia County typically range from $8,000 to $30,000+ depending on size, materials, and design. At Miller's Screen, we provide free detailed estimates with no obligation. Our pricing includes engineering, permits, and professional installation by our in-house crews."
      },
      {
        question: "Do I need a permit for a pool enclosure in Florida?",
        answer: "Yes, a building permit is required for pool enclosures in Volusia County, Florida. This requirement is set by your local municipality and the Florida Building Code. At Miller's Screen, we handle all permitting as part of our service - we submit the application, provide engineering drawings, and coordinate with the building department."
      },
      {
        question: "How long does it take to build a pool enclosure?",
        answer: "Most pool enclosure installations take 1-3 days once permits are approved. The permitting process typically adds 2-4 weeks depending on your municipality. From signing to completion, expect 3-6 weeks total. We use our own in-house crews for faster, more reliable scheduling."
      },
      {
        question: "What's the difference between a pool cage and a pool enclosure?",
        answer: "Pool cage and pool enclosure are often used interchangeably in Florida. Both refer to aluminum-framed structures with screen walls and a screen roof that surrounds your pool area. The term 'cage' is more common in the Orlando and Daytona Beach areas, while 'enclosure' is used throughout Florida."
      },
    ],
    screenRooms: [
      {
        question: "What is the average cost of a screen room in Florida?",
        answer: "Screen room costs in Volusia County typically range from $5,000 to $25,000 depending on size, design complexity, and finish options. Miller's Screen provides free on-site estimates to give you an accurate price for your specific project."
      },
      {
        question: "Can I add a screen room to my existing patio?",
        answer: "Yes! We frequently build screen rooms that attach to existing structures. Our team will assess your existing concrete, roof connection points, and design the best approach. We can often build a screen room that integrates seamlessly with your home's architecture."
      },
      {
        question: "Do screen rooms add value to my home?",
        answer: "Yes, screen rooms typically provide a strong return on investment. They expand your living space, protect from insects and weather, and are attractive to buyers in Florida. A well-built screen room can add both functional square footage and aesthetic value to your property."
      },
    ],
    megaview: [
      {
        question: "What is a MegaView enclosure?",
        answer: "MegaView is a premium frameless screen enclosure system that provides unobstructed panoramic views of your pool and backyard. Unlike traditional enclosures with vertical screen panels every 10 feet, MegaView uses horizontal cable supports for massive uninterrupted spans. Miller's Screen is the ONLY authorized MegaView builder in Volusia County."
      },
      {
        question: "Is MegaView more expensive than traditional enclosures?",
        answer: "MegaView enclosures typically cost 20-40% more than traditional screen enclosures due to the specialized engineering and premium materials. However, many homeowners consider the unobstructed views and modern aesthetic worth the investment. Ask about our financing options."
      },
      {
        question: "Are MegaView enclosures as strong as traditional ones?",
        answer: "Yes, MegaView enclosures are engineered to meet or exceed Florida's building codes for screen enclosures. The cable support system has been tested for wind loads and meets all structural requirements. We provide the same warranty on MegaView installations as our traditional enclosures."
      },
    ],
    home: [
      {
        question: "Do I need a permit for a pool enclosure in Volusia County?",
        answer: "Yes, a building permit is required for pool enclosures in Volusia County, Florida. At Miller's Screen, we handle all permitting for you. Our team submits the permit application, provides engineering drawings, and coordinates with local building departments in Daytona Beach, Port Orange, Ormond Beach, New Smyrna Beach, DeLand, Deltona, and throughout Volusia County."
      },
      {
        question: "How long does it take to build a pool enclosure?",
        answer: "Most pool enclosure projects take 1-3 days for installation once permits are approved. The permitting process typically takes 2-4 weeks depending on your municipality. Total timeline from signing to completion is usually 3-6 weeks. We use our own in-house crews (no subcontractors) which means faster, more reliable scheduling."
      },
      {
        question: "What is a MegaView enclosure?",
        answer: "MegaView is a premium frameless screen enclosure system that provides unobstructed views of your pool and backyard. Unlike traditional enclosures with vertical screen panels every 10 feet, MegaView uses horizontal cable supports allowing for massive uninterrupted spans. Miller's Screen is the ONLY authorized MegaView builder in Volusia County."
      },
      {
        question: "Do you offer financing for screen enclosures?",
        answer: "Yes! We offer 0% interest financing for 18 months with no payments during that period. This makes it easy to get your dream pool enclosure or screen room without the financial burden upfront. Ask about our financing options when you schedule your free estimate."
      },
      {
        question: "What areas do you serve?",
        answer: "Miller's Screen serves all of Volusia County including Daytona Beach, South Daytona, Port Orange, Ormond Beach, Holly Hill, New Smyrna Beach, Edgewater, DeLand, Deltona, Orange City, DeBary, and surrounding areas. We've been serving the community for over 40 years."
      },
      {
        question: "What's included in a free estimate?",
        answer: "Our free estimate includes an on-site visit to measure your space, discuss your needs, review material options, and provide a detailed written quote. We'll explain the permit process, timeline, and answer all your questions. There's no obligation and no pressure."
      },
    ],
  }

  return faqMap[page] || faqMap.home
}

export { generateTitle, generateDescription, KEYWORDS }
