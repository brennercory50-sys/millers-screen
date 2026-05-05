export interface BlogPost {
  slug: string
  title: string
  description: string
  publishedAt: string
  readMinutes: number
  category: 'Cost' | 'Buying Guide' | 'Maintenance' | 'Permits' | 'Local'
  coverImage: string
  body: { heading?: string; paragraphs: string[]; bullets?: string[] }[]
  faq?: { question: string; answer: string }[]
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'pool-enclosure-cost-volusia-county',
    title: 'How Much Does a Pool Enclosure Cost in Volusia County? (2026 Pricing Guide)',
    description: "Real pricing ranges for pool enclosures in Daytona Beach, Port Orange, and across Volusia County. What drives the cost, what's included, and how to get an accurate quote.",
    publishedAt: '2026-05-05',
    readMinutes: 6,
    category: 'Cost',
    coverImage: '/projects/project-122978.jpg',
    body: [
      {
        paragraphs: [
          "If you've started shopping for a pool enclosure in Volusia County, you've probably noticed pricing is hard to pin down. Some companies quote a flat per-square-foot rate. Others won't quote until they walk the property. Both approaches make it tough to know if you're getting a fair price.",
          "This guide breaks down what actually drives the cost of a pool enclosure in Volusia County, what's included in a typical quote, and what to ask before you sign a contract.",
        ],
      },
      {
        heading: 'Typical price ranges in 2026',
        paragraphs: [
          'Real-world pricing for pool enclosures in Volusia County generally falls into these ranges:',
        ],
        bullets: [
          'Standard mid-size pool enclosure (around 800–1,200 sq ft of screen): $12,000 – $22,000',
          'Larger pool enclosure with mansard or hip roof (1,200–1,800 sq ft): $20,000 – $38,000',
          'Premium MegaView® enclosure (no vertical bars): typically 25–40% more than a standard build',
          'Replacement cage on existing footers: lower end, often 20–30% less than a fully new install',
        ],
        // closing thought lives in next section to avoid empty trailing bullet feel
      },
      {
        heading: "What's actually included",
        paragraphs: [
          'A complete pool enclosure quote in Volusia County should cover:',
        ],
        bullets: [
          'Engineering and permit fees specific to your municipality',
          'All aluminum framing, fasteners, and screen mesh',
          'Doors (entry doors and any screen doors)',
          'Removal and disposal of existing structure if applicable',
          'Cleanup and final inspection',
        ],
      },
      {
        heading: 'What drives the price up or down',
        paragraphs: [
          'Even between two homes on the same street, pool enclosure pricing can differ by thousands. The biggest factors:',
        ],
        bullets: [
          'Roof style: hip and mansard cost more than flat or gable due to more framing',
          'Height: enclosures with taller peaks need more material and engineering',
          'Site access: limited access (small gates, slopes, neighboring fences) adds labor time',
          'Wind zone rating: coastal homes near the beach require higher wind ratings (HVHZ-style spec)',
          "Permit complexity: cities like Daytona Beach Shores have stricter rules than inland areas",
          'Existing damage: rotten footers, soil issues, or old slab work can add cost',
        ],
      },
      {
        heading: 'How to get an accurate quote',
        paragraphs: [
          "Avoid ballpark numbers over the phone — they're almost always either too high or too low. The fastest way to get a real number is an in-person walkthrough. Most reputable Volusia County contractors will quote within 48 hours of seeing the property.",
          "When you request a quote, share the following so the contractor can prep before they arrive: pool dimensions, any existing enclosure (and its condition), and the roof style you're considering.",
        ],
      },
    ],
    faq: [
      {
        question: 'Is the permit fee included in the price?',
        answer: 'A complete quote should include permit fees. Cities in Volusia County charge anywhere from $200 to $1,200+ for screen enclosure permits depending on size and scope.',
      },
      {
        question: 'How long does installation take?',
        answer: 'Most standard pool enclosures take 5–10 working days from permit approval to final inspection, weather permitting.',
      },
      {
        question: 'Do I need engineering drawings?',
        answer: "Yes — Florida code requires engineered drawings for any new screen enclosure. A reputable contractor handles the engineering and permitting as part of the project.",
      },
    ],
  },
  {
    slug: 'gable-vs-mansard-vs-hip-vs-flat',
    title: 'Pool Enclosure Roof Styles Explained: Flat, Gable, Hip, Mansard, and Dome',
    description: 'A side-by-side breakdown of the five main pool enclosure roof styles in Florida — what they look like, where they make sense, and how they affect cost.',
    publishedAt: '2026-05-05',
    readMinutes: 5,
    category: 'Buying Guide',
    coverImage: '/projects/project-72558.jpg',
    body: [
      {
        paragraphs: [
          'When homeowners shop for a pool enclosure, the first decision is rarely the brand or installer — it\'s the roof style. The shape of the roof affects how the enclosure looks, how much headroom you get over the pool, how it sheds water, and how much it costs.',
          'Here\'s how the five main styles compare in real Florida builds.',
        ],
      },
      {
        heading: 'Flat',
        paragraphs: [
          'A flat roof enclosure has a single horizontal screen panel across the top. It\'s the simplest and most affordable option, common over patios, lanais, and smaller pools.',
        ],
        bullets: [
          'Best for: smaller pools, attached patios, low ceiling clearances',
          'Cost: lowest of the five styles',
          'Trade-off: lower headroom and less of a "wow" look',
        ],
      },
      {
        heading: 'Gable',
        paragraphs: [
          'A gable roof has two sloping sides meeting at a peak in the middle, like a tent or a house roof. It gives strong headroom and a clean, traditional look.',
        ],
        bullets: [
          'Best for: medium to large freestanding pools',
          'Cost: mid-range',
          'Trade-off: drainage is good, but two end walls means more screen area to maintain',
        ],
      },
      {
        heading: 'Hip',
        paragraphs: [
          'A hip roof slopes down on all four sides toward the walls. The result is a balanced, pyramid-shaped peak that feels architectural and matches many Florida homes.',
        ],
        bullets: [
          'Best for: square or near-square pool decks; homes with hip-style house roofs',
          'Cost: higher than gable due to more framing pieces',
          'Trade-off: complex framing means a longer install',
        ],
      },
      {
        heading: 'Mansard',
        paragraphs: [
          'A mansard has a steep lower slope and a flatter top section, similar to a French chateau roof. It maximizes interior volume while keeping a strong silhouette.',
        ],
        bullets: [
          'Best for: large pools where the homeowner wants maximum headroom',
          'Cost: typically the highest of the five styles',
          'Trade-off: most expensive and most complex to engineer',
        ],
      },
      {
        heading: 'Dome',
        paragraphs: [
          'A dome enclosure curves continuously over the pool with no flat planes. It\'s the rarest style in Volusia County but creates a very distinctive look.',
        ],
        bullets: [
          'Best for: large round or oval pools, premium installs',
          'Cost: high — custom curved framing',
          'Trade-off: limited installer pool; only specialists build them',
        ],
      },
      {
        heading: 'How to choose',
        paragraphs: [
          "If your house has a hip-style roof, a hip enclosure usually looks most cohesive. If your home has a peaked roof, a gable enclosure tends to match. If you want maximum interior volume and budget isn't a primary constraint, mansard wins. If your pool is small or attached to the house, flat is usually the right call.",
          "The best way to decide is to walk the property with a contractor who's built all five styles. Photos help, but seeing the lot and the existing house in person is what makes the choice obvious.",
        ],
      },
    ],
  },
  {
    slug: 'when-to-rescreen-vs-replace',
    title: 'When to Rescreen vs. Replace Your Pool Enclosure',
    description: 'How to tell whether your enclosure just needs new screen panels or a full rebuild. Real signs to watch for in Florida pool cages.',
    publishedAt: '2026-05-05',
    readMinutes: 4,
    category: 'Maintenance',
    coverImage: '/projects/project-72572.jpg',
    body: [
      {
        paragraphs: [
          "If your screen enclosure is sagging, ripped, or just looks tired, the question becomes: rescreen it or rebuild it? Florida sun, salt air, and the occasional storm wear screen mesh out faster than the aluminum frame, so the right answer is rarely the same as your neighbor's.",
        ],
      },
      {
        heading: 'Rescreen if...',
        bullets: [
          'The aluminum frame is straight and tight to the slab',
          'Screws and connectors are intact (no rust bleed, no wobble)',
          'Damage is mostly torn or stretched mesh',
          'The enclosure is under 15 years old',
          'No standing water or sagging at the roof line',
        ],
        paragraphs: [
          'A rescreen typically costs 20–35% of a full replacement and lasts 7–12 years before the next rescreen.',
        ],
      },
      {
        heading: 'Rebuild if...',
        paragraphs: [],
        bullets: [
          'The frame is bent, leaning, or pulling away from the house',
          'Multiple corner connectors are corroded or popped',
          'You see active rust streaks down the aluminum',
          'The slab footer is cracked, sunken, or detached',
          'You\'ve been rescreening every 3–4 years (the frame is the real problem)',
          'Storm damage is structural, not just torn mesh',
        ],
      },
      {
        heading: 'Get a second opinion if you\'re unsure',
        paragraphs: [
          "Some installers default to recommending a rebuild because it's a bigger ticket. If you've been told to rebuild but the frame looks straight to you, get a second walkthrough. A reputable contractor will tell you the truth even if it costs them the bigger job.",
        ],
      },
    ],
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find(post => post.slug === slug)
}

export function getAllBlogSlugs(): string[] {
  return BLOG_POSTS.map(post => post.slug)
}
