'use client'

interface FAQItem {
  question: string
  answer: string
}

interface JsonLdProps {
  type: 'LocalBusiness' | 'Organization' | 'Service' | 'FAQ' | 'BreadcrumbList' | 'WebSite'
  data: Record<string, unknown>
}

export default function JsonLd({ type, data }: JsonLdProps) {
  const schemas: Record<string, object> = {
    LocalBusiness: {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': 'https://millersscreen.com/#business',
      name: "Miller's Screen",
      image: 'https://millersscreen.com/og-image.png',
      url: 'https://millersscreen.com',
      telephone: '+1-386-756-8770',
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '3111 Opportunity Ct Suite D',
        addressLocality: 'South Daytona',
        addressRegion: 'FL',
        postalCode: '32119',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 29.1697,
        longitude: -81.0056,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:00',
        },
      ],
      areaServed: [
        { '@type': 'City', name: 'Daytona Beach' },
        { '@type': 'City', name: 'Port Orange' },
        { '@type': 'City', name: 'Ormond Beach' },
        { '@type': 'City', name: 'New Smyrna Beach' },
        { '@type': 'City', name: 'DeLand' },
        { '@type': 'City', name: 'Deltona' },
        { '@type': 'City', name: 'South Daytona' },
        { '@type': 'City', name: 'Holly Hill' },
        { '@type': 'City', name: 'Edgewater' },
        { '@type': 'City', name: 'Orange City' },
        { '@type': 'City', name: 'DeBary' },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Screen Enclosure Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Pool Enclosures' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Screen Rooms' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'MegaView Enclosures' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Rescreening' },
          },
          {
            '@type': 'Offer',
            itemOffered: { '@type': 'Service', name: 'Screen Repairs' },
          },
        ],
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '100',
        bestRating: '5',
      },
      sameAs: ['https://www.facebook.com/millersscreen'],
      ...data,
    },
    Organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': 'https://millersscreen.com/#organization',
      name: "Miller's Screen",
      url: 'https://millersscreen.com',
      logo: 'https://millersscreen.com/logo.png',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+1-386-756-8770',
        contactType: 'customer service',
        availableLanguage: 'English',
      },
      foundingDate: '1984',
      foundingLocation: 'South Daytona, FL',
      numberOfEmployees: { '@type': 'QuantitativeValue', value: 20 },
    },
    Service: {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: data.name as string || 'Screen Enclosure Services',
      description: data.description as string || 'Premium screen enclosures, pool enclosures, and screen rooms in Volusia County',
      provider: {
        '@id': 'https://millersscreen.com/#business',
      },
      areaServed: {
        '@type': 'State',
        name: 'Florida',
      },
      serviceType: data.serviceType as string || 'Construction',
    },
    FAQ: {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: (data.faqs as Array<{ question: string; answer: string }>)?.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    BreadcrumbList: {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: (data.items as Array<{ name: string; url: string; position: number }>)?.map((item) => ({
        '@type': 'ListItem',
        position: item.position,
        name: item.name,
        item: item.url,
      })),
    },
    WebSite: {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': 'https://millersscreen.com/#website',
      name: "Miller's Screen",
      url: 'https://millersscreen.com',
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://millersscreen.com/search?q={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas[type]) }}
    />
  )
}
