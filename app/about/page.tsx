import { Metadata } from 'next'
import HeroSection from '@/components/hero-section'
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
        headline="ABOUT MILLER'S SCREEN"
        subheadline="Florida's family-owned aluminum construction experts since 1984."
        image="/projects/project-122978.jpg"
        ctaPrimary={{ label: 'Request an Estimate', href: '/contact#form' }}
        trustBullets={[
          'Family Owned & Operated',
          '40+ Years Experience',
          '1,000+ Projects Completed',
          'Licensed & Insured',
        ]}
      />

      <section className="py-10 md:py-14 bg-bg-0">
        <div className="section-container">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-2">
              <h2 className="text-text-primary text-2xl md:text-3xl font-bold mb-4">
                The Name in Florida Aluminum Construction
              </h2>
              <p className="text-muted text-lg leading-relaxed mb-5">
                Miller's Screen & Repair has been family-owned and family-run since 1984. 
                We take pride in being personally involved in every aspect of your project from 
                start to finish. Our install team and office staff work as one united team to 
                deliver the best experience and the best results for our customers.
              </p>
              <p className="text-muted text-lg leading-relaxed">
                From screen pool enclosures to custom screen rooms, concrete work to pavers — 
                we bring decades of experience to every build. We don't subcontract. 
                We do it all in-house, and we stand behind our work.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-panel rounded-lg p-4 border border-white/5">
                <div className="text-2xl md:text-3xl font-black text-accent-red mb-1">40+</div>
                <p className="text-muted text-xs">Years</p>
              </div>
              <div className="bg-panel rounded-lg p-4 border border-white/5">
                <div className="text-2xl md:text-3xl font-black text-accent-red mb-1">1000+</div>
                <p className="text-muted text-xs">Projects</p>
              </div>
              <div className="bg-panel rounded-lg p-4 border border-white/5">
                <div className="text-2xl md:text-3xl font-black text-accent-red mb-1">100%</div>
                <p className="text-muted text-xs">In-House</p>
              </div>
              <div className="bg-panel rounded-lg p-4 border border-white/5">
                <div className="text-2xl md:text-3xl font-black text-accent-red mb-1">5★</div>
                <p className="text-muted text-xs">Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-14 bg-bg-1">
        <div className="section-container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-panel rounded-lg p-5 border border-white/5">
              <div className="w-9 h-9 rounded-lg bg-accent-red/10 flex items-center justify-center mb-3">
                <svg className="w-4 h-4 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-text-primary font-bold text-sm mb-1">Stainless Fasteners</h3>
              <p className="text-muted text-xs">Always used</p>
            </div>
            <div className="bg-panel rounded-lg p-5 border border-white/5">
              <div className="w-9 h-9 rounded-lg bg-accent-red/10 flex items-center justify-center mb-3">
                <svg className="w-4 h-4 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-text-primary font-bold text-sm mb-1">State Certified</h3>
              <p className="text-muted text-xs">Licensed contractor</p>
            </div>
            <div className="bg-panel rounded-lg p-5 border border-white/5">
              <div className="w-9 h-9 rounded-lg bg-accent-red/10 flex items-center justify-center mb-3">
                <svg className="w-4 h-4 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-text-primary font-bold text-sm mb-1">In-House Crews</h3>
              <p className="text-muted text-xs">No subcontracting</p>
            </div>
            <div className="bg-panel rounded-lg p-5 border border-white/5">
              <div className="w-9 h-9 rounded-lg bg-accent-red/10 flex items-center justify-center mb-3">
                <svg className="w-4 h-4 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-text-primary font-bold text-sm mb-1">Locally Owned</h3>
              <p className="text-muted text-xs">South Daytona</p>
            </div>
          </div>
        </div>
      </section>

      <TeamSectionClient />

      <section className="py-10 md:py-14 bg-bg-0">
        <div className="section-container">
          <div className="flex flex-col md:flex-row gap-6 md:items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-accent-red/10 flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-accent-red" />
              </div>
              <span className="text-sm font-semibold text-accent-red uppercase tracking-wider">Community</span>
            </div>
            <div>
              <h2 className="text-text-primary text-xl md:text-2xl font-bold mb-2">
                We Do More to Serve Our Communities
              </h2>
              <p className="text-muted">
                We support local school sponsorships and community outreach. We love supporting Volusia County in more ways than one.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}