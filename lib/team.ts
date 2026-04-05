export type TeamCategory = 
  | 'Leadership'
  | 'Office & Sales'
  | 'Installation Crew'
  | 'Concrete Division'
  | 'Shop Crew'
  | 'Helpers'

export interface TeamMember {
  id: string
  name: string
  role: string
  subtitle?: string
  image: string
  bio: string
  memorial?: boolean
  gallery?: string[]
  specialties?: string[]
}

export interface TeamSection {
  title: TeamCategory
  icon: string
  members: TeamMember[]
}

export const TEAM_DATA: TeamSection[] = [
  {
    title: 'Leadership',
    icon: 'Award',
    members: [
      {
        id: 'chip-miller',
        name: 'Chip Miller',
        role: '"Legend" Rest in Paradise',
        subtitle: '1952-2022',
        image: '/team/chip-miller.jpg',
        memorial: true,
        bio: "Founder of Miller's Screen & Repair. Started with a toolbelt and a truck in 1984. Built this company one handshake at a time. Never missed a fishing trip or a chance to help a neighbor. His legacy lives on in every enclosure we build.",
      },
      {
        id: 'blake-miller',
        name: 'Blake',
        role: 'President',
        image: '/team/blake-miller.jpg',
        bio: 'Grew up on job sites learning the trade from his dad. Took over operations in 2020 and hasn\'t looked back. When he\'s not running the show, you\'ll find him on the water or coaching little league.',
      },
      {
        id: 'meagan-miller',
        name: 'Meagan Miller',
        role: 'Permits',
        image: '/team/meagan-miller.jpg',
        bio: 'The permit wizard. Knows every code inspector in Volusia County by name. Can navigate city hall faster than anyone. Keeps the paperwork flowing so the crews can keep building.',
      },
    ],
  },
  {
    title: 'Office & Sales',
    icon: 'Briefcase',
    members: [
      {
        id: 'jen',
        name: 'Jen',
        role: 'Office Manager',
        image: '/team/jen.jpg',
        bio: 'Runs the front desk like a well-oiled machine. If you\'ve called our office, you\'ve talked to Jen. She remembers every customer and their project details.',
      },
      {
        id: 'zach',
        name: 'Zach',
        role: 'Designer',
        image: '/team/zach.jpg',
        bio: 'Turns your backyard dreams into CAD drawings. Has an eye for what works and what won\'t. His designs have won over even the pickiest HOAs.',
      },
      {
        id: 'bowen',
        name: 'Bowen',
        role: 'Sales',
        image: '/team/bowen.jpg',
        bio: 'Straight shooter who tells it like it is. Won\'t try to sell you something you don\'t need. Knows screen enclosures inside and out.',
      },
      {
        id: 'mark',
        name: 'Mark',
        role: 'Sales',
        image: '/team/mark.jpg',
        bio: 'Been selling enclosures for 15 years. Can eyeball a job and give you a solid estimate on the spot. Customers love his no-nonsense approach.',
      },
      {
        id: 'dave',
        name: 'Dave',
        role: 'Sales',
        image: '/team/dave.jpg',
        bio: 'The MegaView® specialist. If you want the clearest views possible, Dave\'s your guy. He\'ll show you why it\'s worth the upgrade.',
      },
    ],
  },
  {
    title: 'Installation Crew',
    icon: 'Wrench',
    members: [
      {
        id: 'brandon',
        name: 'Brandon',
        role: 'Head Installer',
        image: '/team/brandon.jpg',
        bio: 'Leads crews on the biggest pool enclosure jobs. His frames are plumb, his screen is tight, and his work speaks for itself.',
      },
      {
        id: 'robby',
        name: 'Robby',
        role: 'Head Installer',
        image: '/team/robby.jpg',
        bio: 'Specializes in the tricky jobs other companies won\'t touch. Odd angles? No problem. He figures it out.',
      },
      {
        id: 'michael',
        name: 'Michael',
        role: 'Head Installer',
        image: '/team/michael.jpg',
        bio: 'The fastest screen installer in Volusia County. Quality never suffers though—he just makes it look easy.',
      },
      {
        id: 'niko',
        name: 'Niko',
        role: 'Head Installer',
        subtitle: 'THE GOAT',
        image: '/team/niko.jpg',
        bio: 'Handles our screen room projects. Takes pride in clean corners and straight lines. His attention to detail is unmatched.',
        gallery: ['/team/niko-2.jpg', '/team/niko-3.jpg', '/team/niko-4.jpg'],
      },
      {
        id: 'blake-r',
        name: 'Blake R',
        role: 'Installer',
        image: '/team/blake-r.jpg',
        bio: 'Young gun learning the ropes fast. Already running his own crews on smaller jobs. One to watch.',
      },
      {
        id: 'jojo',
        name: 'JoJo',
        role: 'Warranty / Inspector',
        image: '/team/jojo.jpg',
        bio: 'Handles all warranty calls and inspections. If something\'s not right, JoJo makes it right. Fast.',
      },
      {
        id: 'shane',
        name: 'Shane',
        role: 'Installer',
        image: '/team/shane.jpg',
        bio: 'New to the team but learning fast. Ready to help on any job.',
      },
    ],
  },
  {
    title: 'Concrete Division',
    icon: 'HardHat',
    members: [
      {
        id: 'dale',
        name: 'Dale',
        role: 'Concrete Division',
        image: '/team/dale.jpg',
        bio: 'Handles all concrete work for our enclosure projects. From footers to slabs, Dale delivers a solid foundation every time.',
      },
      {
        id: 'ricky',
        name: 'Ricky',
        role: 'Helper',
        image: '/team/ricky.jpg',
        bio: 'Keeps our equipment running. If it\'s got an engine or motor, Ricky can fix it.',
      },
    ],
  },
  {
    title: 'Shop Crew',
    icon: 'Building',
    members: [
      {
        id: 'brandon-shop',
        name: 'Brandon',
        role: 'Shop Crew',
        image: '/team/brandon-shop.jpg',
        bio: 'Assists with aluminum prep and fabrication. Keeps the shop running smoothly so the crews have everything they need.',
      },
      {
        id: 'thomas',
        name: 'Thomas',
        role: 'Shop Crew',
        image: '/team/thomas.jpg',
        bio: 'Cuts and preps all the aluminum in our shop. Every piece that leaves here is cut to spec, every time.',
      },
      {
        id: 'derek',
        name: 'Derek',
        role: 'Shop Crew',
        image: '/team/derek.jpg',
        bio: 'Loads the trucks and keeps inventory stocked. The crews always have what they need because Derek stays on top of it.',
      },
    ],
  },
  {
    title: 'Helpers',
    icon: 'Users',
    members: [
      {
        id: 'brandon-f',
        name: 'Brandon F',
        role: 'Helper',
        image: '/team/brandon-f.jpg',
        bio: 'Learning the trade from the ground up. Already knows more about screen work than most guys with five years in.',
      },
      {
        id: 'gage',
        name: 'Gage',
        role: 'Helper',
        image: '/team/gage.jpg',
        bio: 'Eager to learn and quick to pitch in. The crews fight over who gets him on their jobs.',
      },
      {
        id: 'cory',
        name: 'Cory',
        role: 'Helper',
        image: '/team/cory.jpg',
        bio: 'Started last summer and hasn\'t slowed down. Strong work ethic and always on time.',
      },
      {
        id: 'brendon',
        name: 'Brendon',
        role: 'Helper',
        image: '/team/brendon.jpg',
        bio: 'Handles all warranty calls and repairs. If something\'s not right, Brendon makes it right. Fast.',
      },
      {
        id: 'hunter',
        name: 'Hunter',
        role: 'Helper',
        image: '/team/hunter.jpg',
        bio: 'Eager to learn the trade. Ready to help wherever needed.',
      },
    ],
  },
]