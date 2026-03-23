import { Metadata } from 'next'
import Image from 'next/image'
import HeroSection from '@/components/hero-section'
import ContentBlock from '@/components/content-block'
import { Users, Heart, Award, Briefcase, Wrench, Building } from 'lucide-react'

export const metadata: Metadata = {
  title: "About Miller's Screen | 40+ Years Volusia County Experience",
  description: "Family-owned and operated for 40+ years. Miller's Screen has completed over 1,000 projects in Volusia County. Meet our team of experienced installers, designers, and support staff.",
  keywords: ['about millers screen', 'volusia county contractor', 'daytona beach screen enclosure', 'family owned contractor', 'florida enclosure company'],
  openGraph: {
    title: "About Miller's Screen | 40+ Years Experience",
    description: "Family-owned and operated for 40+ years. Miller's Screen has completed over 1,000 projects in Volusia County.",
  },
}

const leadership = [
  {
    name: 'Chip Miller',
    role: '"Legend" Rest in Paradise',
    subtitle: '1952-2022',
    image: '/team/chip-miller.jpg',
    memorial: true,
    bio: 'Founder of Miller\'s Screen & Repair. Started with a toolbelt and a truck in 1984. Built this company one handshake at a time. Never missed a fishing trip or a chance to help a neighbor. His legacy lives on in every enclosure we build.',
  },
  {
    name: 'Blake',
    role: 'President',
    image: '/team/blake-miller.jpg',
    bio: 'Grew up on job sites learning the trade from his dad. Took over operations in 2020 and hasn\'t looked back. When he\'s not running the show, you\'ll find him on the water or coaching little league.',
  },
  {
    name: 'Meagan Miller',
    role: 'Permits',
    image: '/team/meagan-miller.jpg',
    bio: 'The permit wizard. Knows every code inspector in Volusia County by name. Can navigate city hall faster than anyone. Keeps the paperwork flowing so the crews can keep building.',
  },
]

const officeSales = [
  { name: 'Jen', role: 'Office Manager', image: '/team/jen.jpg', bio: 'Runs the front desk like a well-oiled machine. If you\'ve called our office, you\'ve talked to Jen. She remembers every customer and their project details.' },
  { name: 'Zach', role: 'Designer', image: '/team/zach.jpg', bio: 'Turns your backyard dreams into CAD drawings. Has an eye for what works and what won\'t. His designs have won over even the pickiest HOAs.' },
  { name: 'Bowen', role: 'Sales', image: '/team/bowen.jpg', bio: 'Straight shooter who tells it like it is. Won\'t try to sell you something you don\'t need. Knows screen enclosures inside and out.' },
  { name: 'Mark', role: 'Sales', image: '/team/mark.jpg', bio: 'Been selling enclosures for 15 years. Can eyeball a job and give you a solid estimate on the spot. Customers love his no-nonsense approach.' },
  { name: 'Dave', role: 'Sales', image: '/team/dave.jpg', bio: 'The MegaView® specialist. If you want the clearest views possible, Dave\'s your guy. He\'ll show you why it\'s worth the upgrade.' },
]

const installation = [
  { name: 'Brandon', role: 'Head Installer', image: '/team/brandon.jpg', bio: 'Leads crews on the biggest pool enclosure jobs. His frames are plumb, his screen is tight, and his work speaks for itself.' },
  { name: 'Robby', role: 'Head Installer', image: '/team/robby.jpg', bio: 'Specializes in the tricky jobs other companies won\'t touch. Odd angles? No problem. He figures it out.' },
  { name: 'Michael', role: 'Head Installer', image: '/team/michael.jpg', bio: 'The fastest screen installer in Volusia County. Quality never suffers though—he just makes it look easy.' },
  { name: 'Devon', role: 'Head Installer', image: '/team/devon.jpg', bio: 'Handles our screen room projects. Takes pride in clean corners and straight lines. His attention to detail is unmatched.' },
  { name: 'Blake R', role: 'Installer', image: '/team/blake-r.jpg', bio: 'Young gun learning the ropes fast. Already running his own crews on smaller jobs. One to watch.' },
  { name: 'Brendon', role: 'Warranty Division', image: '/team/brendon.jpg', bio: 'Handles all warranty calls and repairs. If something\'s not right, Brendon makes it right. Fast.' },
]

const shopCrew = [
  { name: 'Thomas', role: 'Shop Crew', image: '/team/thomas.jpg', bio: 'Cuts and preps all the aluminum in our shop. Every piece that leaves here is cut to spec, every time.' },
  { name: 'Derek', role: 'Shop Crew', image: '/team/derek.jpg', bio: 'Loads the trucks and keeps inventory stocked. The crews always have what they need because Derek stays on top of it.' },
  { name: 'Wyatt', role: 'Shop Crew', image: '/team/wyatt.jpg', bio: 'Handles screen cutting and prep work. Takes pride in zero waste and perfect rolls every time.' },
  { name: 'Ricky', role: 'Shop Crew', image: '/team/ricky.jpg', bio: 'Keeps our equipment running. If it\'s got an engine or motor, Ricky can fix it.' },
]

const helpers = [
  { name: 'Brandon F', role: 'Helper', image: '/team/brandon-f.jpg', bio: 'Learning the trade from the ground up. Already knows more about screen work than most guys with five years in.' },
  { name: 'Gage', role: 'Helper', image: '/team/gage.jpg', bio: 'Eager to learn and quick to pitch in. The crews fight over who gets him on their jobs.' },
  { name: 'Cory', role: 'Helper', image: '/team/cory.jpg', bio: 'Started last summer and hasn\'t slowed down. Strong work ethic and always on time.' },
]

interface TeamMember {
  name: string
  role: string
  subtitle?: string
  image: string
  memorial?: boolean
  bio?: string
}

function TeamCard({ member }: { member: TeamMember }) {
  return (
    <div className="group">
      <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-panel ring-1 ring-line transition-all duration-500 md:hover:ring-accent-red md:hover:shadow-lg md:hover:shadow-accent-red/20">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover object-top transition-all duration-700 md:group-hover:scale-110 md:group-hover:brightness-[0.35]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/30 to-transparent transition-opacity duration-500 md:group-hover:opacity-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-0 via-bg-0/95 to-bg-0/80 opacity-0 md:group-hover:opacity-100 transition-all duration-500 hidden md:flex flex-col justify-end p-5">
          <div className="transform translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
            <h3 className="text-lg font-bold text-text-primary mb-1">{member.name}</h3>
            <p className={`text-sm font-semibold ${member.memorial ? 'text-accent-red italic' : 'text-accent-red'} mb-2`}>
              {member.role}
            </p>
            {member.subtitle && <p className="text-xs text-muted mb-2">{member.subtitle}</p>}
            <p className="text-sm text-muted leading-relaxed opacity-0 md:group-hover:opacity-100 transition-opacity duration-700 delay-100">
              {member.bio}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-base md:text-lg font-bold text-text-primary">{member.name}</h3>
          <p className={`text-sm font-medium ${member.memorial ? 'text-accent-red italic' : 'text-accent-red'}`}>
            {member.role}
          </p>
          {member.subtitle && <p className="text-xs text-muted mt-0.5">{member.subtitle}</p>}
        </div>
      </div>
    </div>
  )
}

function TeamSection({ title, icon: Icon, members }: { title: string; icon: typeof Users; members: TeamMember[] }) {
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
          <TeamCard key={member.name} member={member} />
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
        image="/team/sales-team.jpg"
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
              <span className="hidden md:inline">Hover over any team member to learn more about them</span>
            </p>
          </div>

          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent-red/10 flex items-center justify-center">
                <Award className="w-5 h-5 text-accent-red" />
              </div>
              <h3 className="text-xl font-bold text-text-primary uppercase tracking-wide">Leadership</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-3xl">
              {leadership.map((member) => (
                <TeamCard key={member.name} member={member} />
              ))}
            </div>
          </div>

          <TeamSection title="Office & Sales" icon={Briefcase} members={officeSales} />
          <TeamSection title="Installation Crew" icon={Wrench} members={installation} />
          <TeamSection title="Shop Crew" icon={Building} members={shopCrew} />
          <TeamSection title="Helpers" icon={Users} members={helpers} />

          <div className="mt-12 pt-8 border-t border-line">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-accent-red/10 flex items-center justify-center">
                <span className="text-lg">🐾</span>
              </div>
              <h3 className="text-xl font-bold text-text-primary uppercase tracking-wide">Company Mascot</h3>
            </div>
            <div className="group flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl bg-panel ring-1 ring-line hover:ring-accent-red transition-all duration-500 hover:shadow-lg hover:shadow-accent-red/10 max-w-xl">
              <div className="relative w-28 h-28 rounded-full overflow-hidden bg-bg-0 ring-4 ring-accent-red/30 group-hover:ring-accent-red transition-all duration-500 flex-shrink-0">
                <Image
                  src="/team/chewie.jpg"
                  alt="Chewie - Company Mascot"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="text-center sm:text-left">
                <h4 className="text-xl font-bold text-text-primary">Chewie</h4>
                <p className="text-accent-red text-sm font-semibold mb-2">Chief Morale Officer</p>
                <p className="text-muted text-sm leading-relaxed">
                  The real boss around here. Greets every customer, inspects every truck, and makes sure the shop stays happy. Prefers belly rubs over paychecks.
                </p>
              </div>
            </div>
          </div>
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
