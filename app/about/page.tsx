import { Metadata } from 'next'
import HeroSection from '@/components/hero-section'
import ContentBlock from '@/components/content-block'
import TeamCard from '@/components/team-card'
import { Users, Heart, Award, Briefcase, Wrench, Building, HardHat } from 'lucide-react'

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
  { name: 'Niko', role: 'The GOAT', image: '/team/niko.jpg', bio: 'Legendary installer with unmatched skill. The gold standard for quality and speed.', galleryImages: ['/team/niko-2.jpg', '/team/niko-3.jpg', '/team/niko-4.jpg'] },
  { name: 'Blake R', role: 'Installer', image: '/team/blake-r.jpg', bio: 'Young gun learning the ropes fast. Already running his own crews on smaller jobs. One to watch.' },
  { name: 'JoJo', role: 'Warranty / Inspector', image: '/team/jojo.jpg', bio: 'Handles all warranty calls and inspections. If something\'s not right, JoJo makes it right. Fast.' },
  { name: 'Shane', role: 'Installer', image: '/team/shane.jpg', bio: 'New to the team but learning fast. Ready to help on any job.' },
]

const concreteDivision = [
  { name: 'Dale', role: 'Concrete Division', image: '/team/dale.jpg', bio: 'Handles all concrete work for our enclosure projects. From footers to slabs, Dale delivers a solid foundation every time.' },
  { name: 'Ricky', role: 'Helper', image: '/team/ricky.jpg', bio: 'Keeps our equipment running. If it\'s got an engine or motor, Ricky can fix it.' },
]

const shopCrew = [
  { name: 'Brandon', role: 'Shop Crew', image: '/team/brandon-shop.jpg', bio: 'Assists with aluminum prep and fabrication. Keeps the shop running smoothly so the crews have everything they need.' },
  { name: 'Thomas', role: 'Shop Crew', image: '/team/thomas.jpg', bio: 'Cuts and preps all the aluminum in our shop. Every piece that leaves here is cut to spec, every time.' },
  { name: 'Derek', role: 'Shop Crew', image: '/team/derek.jpg', bio: 'Loads the trucks and keeps inventory stocked. The crews always have what they need because Derek stays on top of it.' },
]

const helpers = [
  { name: 'Brandon F', role: 'Helper', image: '/team/brandon-f.jpg', bio: 'Learning the trade from the ground up. Already knows more about screen work than most guys with five years in.' },
  { name: 'Gage', role: 'Helper', image: '/team/gage.jpg', bio: 'Eager to learn and quick to pitch in. The crews fight over who gets him on their jobs.' },
  { name: 'Cory', role: 'Helper', image: '/team/cory.jpg', bio: 'Started last summer and hasn\'t slowed down. Strong work ethic and always on time.' },
  { name: 'Hunter', role: 'Helper', image: '/team/hunter.jpg', bio: 'Eager to learn the trade. Ready to help wherever needed.' },
]

type TeamMemberType = {
  name: string
  role: string
  subtitle?: string
  image: string
  memorial?: boolean
  bio?: string
  galleryImages?: string[]
}

function TeamSection({ title, icon: Icon, members }: { title: string; icon: typeof Users; members: TeamMemberType[] }) {
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
              <span className="hidden md:inline">Hover over any team member to learn more about them</span>
              <span className="md:hidden">Tap any team member to read their bio</span>
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
          <TeamSection title="Concrete Division" icon={HardHat} members={concreteDivision} />
          <TeamSection title="Shop Crew" icon={Building} members={shopCrew} />
          <TeamSection title="Helpers" icon={Users} members={helpers} />
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
