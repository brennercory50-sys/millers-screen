import { Metadata } from 'next'
import HeroSection from '@/components/hero-section'
import ContentBlock from '@/components/content-block'
import TeamCard from '@/components/team-card'
import { Users, Heart, Award, Briefcase, Wrench, Building, HardHat } from 'lucide-react'
import { TEAM_DATA, TeamCategory } from '@/lib/team'

const iconMap: Record<TeamCategory, typeof Award> = {
  'Leadership': Award,
  'Office & Sales': Briefcase,
  'Installation Crew': Wrench,
  'Concrete Division': HardHat,
  'Shop Crew': Building,
  'Helpers': Users,
}

export const metadata: Metadata = {
  title: "About Miller's Screen | 40+ Years Volusia County Experience",
  description: "Family-owned and operated for 40+ years. Miller's Screen has completed over 1,000 projects in Volusia County. Meet our team of experienced installers, designers, and support staff.",
  keywords: ['about millers screen', 'volusia county contractor', 'daytona beach screen enclosure', 'family owned contractor', 'florida enclosure company'],
  openGraph: {
    title: "About Miller's Screen | 40+ Years Experience",
    description: "Family-owned and operated for 40+ years. Miller's Screen has completed over 1,000 projects in Volusia County.",
  },
}

function TeamSection({ title, icon: Icon, members }: { title: string; icon: typeof Award; members: typeof TEAM_DATA[0]['members'] }) {
  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-accent-red/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-accent-red" />
        </div>
        <h3 className="text-xl font-bold text-text-primary uppercase tracking-wide">{title}</h3>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
        {members.map((member) => (
          <TeamCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
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
        title="Who we are"
        copy="With over 40 years of experience in the aluminum construction business, Miller's Screen & Repair is family-owned and family-run. We take pride in our projects and stay involved from the beginning to the final inspection."
      />

      <section id="team" className="py-16 md:py-24 bg-bg-1">
        <div className="section-container">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-accent-red/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent-red" />
              </div>
              <span className="text-sm font-semibold text-accent-red uppercase tracking-wider">Our Team</span>
            </div>
            <h2 className="text-text-primary text-3xl md:text-4xl font-bold">MEET THE PEOPLE BEHIND THE WORK</h2>
            <p className="text-muted mt-3 max-w-2xl mx-auto">
              <span className="hidden md:inline">Click any team member to learn more about them</span>
              <span className="md:hidden">Tap any team member to read their bio</span>
            </p>
          </div>

          {TEAM_DATA.map((section) => {
            const Icon = iconMap[section.title]
            return (
              <TeamSection 
                key={section.title} 
                title={section.title} 
                icon={Icon} 
                members={section.members} 
              />
            )
          })}
        </div>
      </section>

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