import { Metadata } from 'next'

interface SEOMetadata {
  title: string
  description: string
  keywords?: string[]
  path: string
  type?: 'website' | 'article'
  image?: string
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
  }
}

export function generateFAQSchema(page: string): Array<{ question: string; answer: string }> {
  const faqMap: Record<string, Array<{ question: string; answer: string }>> = {
    poolEnclosures: [
      {
        question: "How much does a pool enclosure cost in Volusia County?",
        answer: "Pool enclosure costs in Volusia County typically start around $12,000 for a standard mid-size cage and range to $38,000+ for larger premium structures. Pricing depends on size, roof style, screen type, and permitting. Miller's Screen provides free on-site estimates with no obligation — our pricing includes engineering, permits, and in-house installation."
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
        answer: "Screen room costs in Volusia County typically start around $8,000 for a standard attached patio room and range to $25,000+ for custom designs with premium materials. Miller's Screen provides free on-site estimates to give you an accurate price for your specific project."
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
    concretePavers: [
      {
        question: "How much does concrete or paver installation cost in Volusia County?",
        answer: "Concrete and paver costs in Volusia County vary based on project size, materials, and design complexity. Driveways typically start around $3,000-$5,000, while patios and pool decks range from $5,000-$15,000+. We provide free detailed estimates with no obligation."
      },
      {
        question: "What are the benefits of pavers over concrete?",
        answer: "Pavers offer several advantages over poured concrete: they're more resistant to cracking in Florida's climate, can be easily replaced if damaged, come in endless colors and styles, and add more visual appeal. They also allow for better drainage and are less slippery around pools."
      },
      {
        question: "Do I need a permit for concrete or paver work?",
        answer: "Most residential concrete and paver projects don't require permits in Volusia County. However, if the project involves significant grading, drainage modifications, or is part of a larger construction project, permits may be needed. We'll advise you on permit requirements during your estimate."
      },
      {
        question: "How long does concrete or paver installation take?",
        answer: "Project timelines vary by size: a typical driveway takes 3-5 days, while larger patios or pool decks may take 1-2 weeks. We use our own experienced crew for reliable scheduling and quality results."
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


