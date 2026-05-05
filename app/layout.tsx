import type { Metadata } from 'next'
import Script from 'next/script'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
})
import Header from '@/components/header'
import Footer from '@/components/footer'
import MobileCTABar from '@/components/mobile-cta-bar'
import ChatbotWidget from '@/components/chatbot-widget'
import GoogleAnalytics from '@/components/google-analytics'
import { TeamModalProvider } from '@/context/TeamModalContext'
import { Providers } from '@/components/providers'

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXTAUTH_URL || 'https://millersscreen.com'
  
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: "Volusia County's Trusted Screen Enclosure Contractor | Miller's Screen",
      template: "%s | Miller's Screen"
    },
    description: "Volusia County's most trusted screen enclosure contractor. Pool enclosures, screen rooms, MegaView®, rescreening & repairs. 40+ years experience, in-house crews, licensed & permitted. Free estimates.",
    keywords: ['pool enclosure', 'screen room', 'volusia county', 'daytona beach', 'florida', 'megaview', 'rescreening', 'screen repair', 'aluminum construction'],
    authors: [{ name: "Miller's Screen" }],
    creator: "Miller's Screen",
    publisher: "Miller's Screen",
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
    icons: {
      icon: '/favicon.svg',
      shortcut: '/favicon.svg',
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: "Miller's Screen",
      title: "Volusia County's Trusted Screen Enclosure Contractor | Miller's Screen",
      description: "Volusia County's most trusted screen enclosure contractor. Pool enclosures, screen rooms, MegaView®, rescreening & repairs. 40+ years experience, in-house crews, licensed & permitted. Free estimates.",
      url: baseUrl,
      images: [{ 
        url: '/og-image.png', 
        width: 1200, 
        height: 630,
        alt: "Miller's Screen - Premium Screen Enclosures in Volusia County"
      }],
    },
twitter: {
      card: 'summary_large_image',
      site: '@MillersScreen',
      creator: '@MillersScreen',
      title: "Volusia County's Trusted Screen Enclosure Contractor | Miller's Screen",
      description: "Volusia County's most trusted screen enclosure contractor. Pool enclosures, screen rooms, MegaView®, rescreening & repairs. 40+ years experience, in-house crews.",
      images: ['/og-image.png'],
    },
    other: {
      'geo.region': 'US-FL',
      'geo.placename': 'South Daytona',
      'geo.position': '29.1697;-81.0056',
      'ICBM': '29.1697, -81.0056',
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script src="https://apps.abacus.ai/chatllm/appllm-lib.js" strategy="lazyOnload" />
        
        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "@id": "https://millersscreen.com/#business",
              "name": "Miller's Screen",
              "image": "https://millersscreen.com/og-image.png",
              "url": "https://millersscreen.com",
              "telephone": "+1-386-756-8770",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "3111 Opportunity Ct Suite D",
                "addressLocality": "South Daytona",
                "addressRegion": "FL",
                "postalCode": "32119",
                "addressCountry": "US"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 29.1697,
                "longitude": -81.0056
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  "opens": "08:00",
                  "closes": "17:00"
                }
              ],
              "areaServed": [
                { "@type": "City", "name": "Daytona Beach" },
                { "@type": "City", "name": "Port Orange" },
                { "@type": "City", "name": "Ormond Beach" },
                { "@type": "City", "name": "New Smyrna Beach" },
                { "@type": "City", "name": "DeLand" },
                { "@type": "City", "name": "Deltona" },
                { "@type": "City", "name": "South Daytona" },
                { "@type": "City", "name": "Holly Hill" },
                { "@type": "City", "name": "Edgewater" },
                { "@type": "City", "name": "Orange City" },
                { "@type": "City", "name": "DeBary" }
              ],
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Screen Enclosure Services",
                "itemListElement": [
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Pool Enclosures" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Screen Rooms" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "MegaView Enclosures" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Rescreening" } },
                  { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Screen Repairs" } }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5",
                "reviewCount": "3",
                "bestRating": "5"
              },
              "sameAs": ["https://www.facebook.com/millersscreen"]
            })
          }}
        />

        {/* Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": "https://millersscreen.com/#organization",
              "name": "Miller's Screen",
              "url": "https://millersscreen.com",
              "logo": "https://millersscreen.com/logo.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-386-756-8770",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "foundingDate": "1984",
              "foundingLocation": "South Daytona, FL",
              "sameAs": ["https://www.facebook.com/millersscreen"]
            })
          }}
        />

        {/* WebSite Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": "https://millersscreen.com/#website",
              "name": "Miller's Screen",
              "url": "https://millersscreen.com"
            })
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-bg-0 text-text-primary`}>
        <div className="bg-layer">
          <svg width="100%" height="100%" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
            <polygon points="0,0 1050,0 750,250 0,170" fill="rgba(25,70,160,.25)"/>
            <polygon points="700,0 1920,0 1920,200 960,290" fill="rgba(35,90,180,.18)"/>
            <polygon points="1550,0 1920,0 1920,350 1650,300" fill="rgba(50,120,200,.28)"/>
            <polygon points="0,0 130,0 0,200" fill="rgba(50,120,200,.20)"/>
            <polygon points="0,780 850,650 600,1080 0,1080" fill="rgba(190,35,35,.20)"/>
            <polygon points="1000,830 1920,720 1920,1080 800,1080" fill="rgba(190,35,35,.18)"/>
            <polygon points="1600,810 1920,780 1920,1080 1500,1080" fill="rgba(210,50,50,.28)"/>
          </svg>
        </div>
        <GoogleAnalytics />
        <Header />
        <main className="flex-1 pt-16 md:pt-20">
          <Providers>
            <TeamModalProvider>
              {children}
            </TeamModalProvider>
          </Providers>
        </main>
        <Footer />
        <MobileCTABar />
        <ChatbotWidget />
      </body>
    </html>
  )
}
