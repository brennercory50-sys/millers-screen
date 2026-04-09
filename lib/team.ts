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
  firstName: string
  nickname?: string
  lastName?: string
  role: string
  subtitle?: string
  image?: string
  bio: string
  memorial?: boolean
  gallery?: string[]
  specialties?: string[]
  imagePosition?: string
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
        firstName: 'Chip',
        role: '"Legend" Rest in Paradise',
        subtitle: '1952-2022',
        image: '/team/chip-miller.jpg',
        memorial: true,
        bio: "Founder of Miller's Screen & Repair. Started with a toolbelt and a truck in 1984. Built this company one handshake at a time. Never missed a fishing trip or a chance to help a neighbor. His legacy lives on in every enclosure we build.",
      },
      {
        id: 'blake-miller',
        name: 'Blake',
        firstName: 'Blake',
        role: 'President',
        image: '/team/blake-miller.jpg',
        bio: 'Second-generation owner who took over the family business and grew it into Volusia County\'s most trusted screen enclosure company. Brings the same handshake values his dad started with — but now with a fleet of crews and a whole lot more enclosures.',
        gallery: ['/team/blake-president-1.jpg', '/team/blake-president-2.jpg', '/team/blake-president-3.jpg'],
      },
      {
        id: 'meagan-miller',
        name: 'Meagan Miller',
        firstName: 'Meagan',
        role: 'Permits',
        image: '/team/meagan-miller.jpg',
        bio: 'The permit wizard. Knows every code inspector in Volusia County by name. Can navigate city hall faster than anyone. Keeps the paperwork flowing so the crews can keep building.',
        gallery: ['/team/meagan-2.jpg', '/team/meagan-3.jpg', '/team/meagan-4.jpg', '/team/meagan-5.jpg'],
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
        firstName: 'Jen',
        role: 'Office Manager',
        image: '/team/jen.jpg',
        bio: 'Born and raised in Daytona Beach. I have a 7year old son and we enjoy being outside from camping, fishing, and going to the beach. I was in the medical field for 21 years and decided to make a change and join Miller\'s Screen family business and I\'m so glad I did. I enjoy getting up and coming to my job every day.',
        gallery: ['/team/jen-1.jpg', '/team/jen-2.jpg'],
      },
      {
        id: 'zach',
        name: 'Zach',
        firstName: 'Zach',
        role: 'Designer',
        image: '/team/zach.jpg',
        bio: 'Zach is a dedicated draftsman at Miller\'s Screen who takes pride in doing quality work and helping projects come together the right way. Outside of work, family is what matters most to him, and he enjoys spending as much time with them as he can. He also likes staying busy, working with his hands, and taking on projects that keep him active and involved.',
        gallery: ['/team/zach-2.jpg', '/team/zach-3.jpg', '/team/zach-4.jpg', '/team/zach-5.jpg'],
      },
      {
        id: 'bowen',
        name: 'Bowen',
        firstName: 'Bowen',
        role: 'Sales',
        image: '/team/bowen.jpg',
        bio: 'Straight shooter who tells it like it is. Won\'t try to sell you something you don\'t need. Knows screen enclosures inside and out.',
        gallery: ['/team/bowen-2.jpg', '/team/bowen-3.jpg', '/team/bowen-4.jpg'],
      },
      {
        id: 'mark',
        name: 'Mark',
        firstName: 'Mark',
        role: 'Sales',
        image: '/team/mark.jpg',
        bio: 'I was born & raised in Illinois. Went to college in Minnesota, then moved to Orlando, Fl and opened a dance studio where I taught ballroom dance for 7 years. I moved to Daytona Beach and have been a DJ for 30 years. I have 1 daughter & 3 grandkids.',
      },
      {
        id: 'dave',
        name: 'Dave',
        firstName: 'Dave',
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
        id: 'brandon-bearclaw-miller',
        name: 'Brandon "Bear Claw" Miller',
        firstName: 'Brandon',
        nickname: 'Bear Claw',
        lastName: 'Miller',
        role: 'Head Installer',
        image: '/team/brandon-bearclaw-miller.jpg',
        bio: 'Leads crews on the biggest pool enclosure jobs. His frames are plumb, his screen is tight, and his work speaks for itself.',
        gallery: ['/team/bearclaw-1.jpg'],
      },
      {
        id: 'robby',
        name: 'Robby',
        firstName: 'Robby',
        role: 'Head Installer',
        image: '/team/robby.jpg',
        bio: 'Specializes in the tricky jobs other companies won\'t touch. Odd angles? No problem. He figures it out.',
        gallery: ['/team/robby-1.jpg'],
      },
      {
        id: 'niko',
        name: 'Niko',
        firstName: 'Niko',
        role: 'Head Installer',
        subtitle: 'THE GOAT',
        image: '/team/niko.jpg',
        bio: 'Handles our screen room projects. Takes pride in clean corners and straight lines. His attention to detail is unmatched.',
        gallery: ['/team/niko-2.jpg', '/team/niko-3.jpg', '/team/niko-4.jpg'],
      },
      {
        id: 'blake-r',
        name: 'Blake R "Thor"',
        firstName: 'Blake',
        nickname: 'Thor',
        role: 'Installer',
        image: '/team/blake-r.jpg',
        bio: 'Young gun learning the ropes fast. Already running his own crews on smaller jobs. One to watch.',
        gallery: ['/team/blake-r-2.jpg', '/team/blake-r-3.jpg', '/team/blake-r-4.jpg'],
      },
      {
        id: 'shane',
        name: 'Shane',
        firstName: 'Shane',
        role: 'Installer',
        bio: 'Shane is a family-oriented man who values time with his loved ones above all else. Most of his free time is spent with his family and daughter, making memories and enjoying every moment together. He also enjoys being outdoors, especially fishing and spending time at the beach, and takes pride in working hard and staying active both on and off the job.',
        gallery: ['/team/shane-2.jpg', '/team/shane-3.jpg', '/team/shane-5.jpg', '/team/shane-6.jpg'],
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
        firstName: 'Dale',
        role: 'Concrete Division',
        bio: 'Handles all concrete work for our enclosure projects. From footers to slabs, Dale delivers a solid foundation every time.',
        gallery: ['/team/dale-2.jpg', '/team/dale-3.jpg', '/team/dale-5.jpg'],
      },
      {
        id: 'ricky',
        name: 'Ricky',
        firstName: 'Ricky',
        role: 'Helper',
        image: '/team/ricky.jpg',
        bio: 'Keeps our equipment running. If it\'s got an engine or motor, Ricky can fix it.',
        gallery: ['/team/ricky-2.jpg', '/team/ricky-3.jpg'],
      },
    ],
  },
  {
    title: 'Shop Crew',
    icon: 'Building',
    members: [
      {
        id: 'brandon-brenden-pending',
        name: 'Brandon "Brenden" LAST_NAME_PENDING',
        firstName: 'Brandon',
        nickname: 'Brenden',
        lastName: 'LAST_NAME_PENDING',
        role: 'Shop Crew',
        image: '/team/brandon-brenden-pending.jpg',
        bio: 'Assists with aluminum prep and fabrication. Keeps the shop running smoothly so the crews have everything they need.',
      },
      {
        id: 'thomas',
        name: 'Thomas',
        firstName: 'Thomas',
        role: 'Shop Crew',
        image: '/team/thomas.jpg',
        bio: 'Cuts and preps all the aluminum in our shop. Every piece that leaves here is cut to spec, every time.',
      },
      {
        id: 'derek',
        name: 'Derek',
        firstName: 'Derek',
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
        id: 'brendon-bartlett',
        name: 'Brendon Bartlett',
        firstName: 'Brendon',
        lastName: 'Bartlett',
        role: 'Helper',
        image: '/team/brendon-bartlett.jpg',
        bio: 'Learning the trade from the ground up. Already knows more about screen work than most guys with five years in.',
        gallery: ['/team/brendon-bartlett-2.jpg', '/team/brendon-bartlett-3.jpg', '/team/brendon-bartlett-4.jpg'],
      },
      {
        id: 'gage',
        name: 'Gage',
        firstName: 'Gage',
        role: 'Helper',
        image: '/team/gage.jpg',
        bio: 'Eager to learn and quick to pitch in. The crews fight over who gets him on their jobs.',
      },
      {
        id: 'cory',
        name: 'Cory',
        firstName: 'Cory',
        role: 'Helper',
        image: '/team/cory.jpg',
        bio: 'Started last summer and hasn\'t slowed down. Strong work ethic and always on time.',
        gallery: ['/team/cory-2.jpg', '/team/cory-3.jpg', '/team/cory-4.jpg'],
      },
      {
        id: 'hunter',
        name: 'Hunter',
        firstName: 'Hunter',
        role: 'Helper',
        image: '/team/hunter-2.jpg',
        bio: 'Eager to learn the trade. Ready to help wherever needed.',
        gallery: ['/team/hunter-3.jpg'],
      },
    ],
  },
]
