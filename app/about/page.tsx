import { Metadata } from 'next'
import HeroSection from '@/components/hero-section'
import ContentBlock from '@/components/content-block'
import TeamSectionClient from '@/components/team-section-client'
import { Heart } from 'lucide-react'

export const metadata: Metadata = {
  title: "About Miller's Screen | 40+ Years Volusia County Experience",
  description: "Family-owned and operated for 40+ years. Miller's Screen has completed over 1,000 projects in Volusia County. Meet our team of experienced installers, designers, and support staff.",
  keywords: ['about millers screen', 'volusia county contractor', 'daytona beach screen enclosure', 'family owned contractor', 'florida enclosure company'],
  openGraph: {
    title: "About Miller's Screen | 40+ Years Experience",
    description: "Family-owned and operated for 40+ years. Miller's Screen has completed over 1,000 projects in Volusia County.",
  },
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "mainEntity": {
              "@type": "Organization",
              "@id": "https://millersscreen.com/#organization",
              "name": "Miller's Screen",
              "foundingDate": "1984",
              "foundingLocation": "South Daytona, FL",
              "numberOfEmployees": {
                "@type": "QuantitativeValue",
                "value": 20
              }
            }
          })
        }}
      />
      <HeroSection
        headline="MEET THE TEAM"
        subheadline="Florida&apos;s aluminum construction pros."
        image="/projects/project-122978.jpg"
        ctaPrimary={{ label: 'Call 386-756-8770', href: 'tel:386-756-8770' }}
      />
      
      <ContentBlock
        title="Meet Florida&apos;s Aluminum Construction Pros"
        copy="With over 40 years of experience in the aluminum construction business, Miller&apos;s Screen & Repair is family-owned and family-run. We take pride in our projects and are personally involved in every aspect of the project from beginning to end. We have a great Install Team and office staff that make it possible to be &ldquo;One Team One Dream.&rdquo; We all come together to be the best, build the best and give our customer&apos;s the best experience ever in choosing us to meet all of their aluminum needs. Give us a call today and experience the difference it makes working with Miller&apos;s Screens!"
      />

      <ContentBlock
        title="Why Choose Miller's Screen"
        copy="Stainless Steel Fasteners Always Used • Expert Layout & Design • Committed to Customer Satisfaction • No Subcontracting • State Certified Contractor • Quality Control Systems • Exclusive S.P.E Sidewall Construction • Prompt and Courteous Service • Fair Pricing • Family Owned/Operated • Locally Owned"
      />

      <ContentBlock
        title="Our Services"
        copy="Screen Pool Enclosures • Florida Screen Room • Screen Rooms • Carports • Vinyl Rooms • Concrete Slabs • Room Additions • Pavers"
      />

      <TeamSectionClient />

      <section className="py-16 md:py-20">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-accent-red mb-2">40+</div>
              <p className="text-muted">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-accent-red mb-2">1000+</div>
              <p className="text-muted">Projects Done</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-accent-red mb-2">100%</div>
              <p className="text-muted">In-House Crews</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-black text-accent-red mb-2">5★</div>
              <p className="text-muted">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-bg-1">
        <div className="section-container">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-accent-red/10 flex items-center justify-center">
              <Heart className="w-5 h-5 text-accent-red" />
            </div>
            <span className="text-sm font-semibold text-accent-red uppercase tracking-wider">Community</span>
          </div>
          <h2 className="text-text-primary text-2xl md:text-3xl font-bold mb-6">WE DO MORE TO SERVE OUR COMMUNITIES</h2>
          <p className="text-muted leading-relaxed max-w-2xl text-lg">
            We support the community through local school sponsorships and outreach. We love supporting Volusia County in more ways than one.
          </p>
        </div>
      </section>
    </>
  )
}