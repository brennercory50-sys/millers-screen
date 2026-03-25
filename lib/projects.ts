export type Category = 'Pool Enclosures' | 'Screen Rooms' | 'MegaView®'
export type Style = 'Mansard' | 'Dome' | 'Hip' | 'Gable' | 'Elite' | 'UX'
export type Build = 'Roof-Over' | 'Under Existing Gable' | 'Free Standing' | 'Attached to House'

export interface Project {
  id: string
  category: Category
  style: Style
  build: Build
  label: string
  image: string
  beforeImage?: string
  description?: string
}

export const CATEGORIES: Category[] = ['Pool Enclosures', 'Screen Rooms', 'MegaView®']

export const STYLES: Style[] = ['Mansard', 'Dome', 'Hip', 'Gable', 'Elite', 'UX']

export const BUILDS: Build[] = ['Roof-Over', 'Under Existing Gable', 'Free Standing', 'Attached to House']

export const projects: Project[] = [
  {
    id: '1',
    category: 'Pool Enclosures',
    style: 'Mansard',
    build: 'Roof-Over',
    label: 'Mansard – Roof-Over',
    image: '/projects/project-122978.jpg',
    beforeImage: '/projects/project-72576.jpg',
  },
  {
    id: '2',
    category: 'Pool Enclosures',
    style: 'Mansard',
    build: 'Under Existing Gable',
    label: 'Mansard – Under Existing Gable',
    image: '/projects/project-122980.jpg',
  },
  {
    id: '3',
    category: 'MegaView®',
    style: 'UX',
    build: 'Roof-Over',
    label: 'UX – Roof-Over',
    image: '/projects/project-122977.jpg',
    beforeImage: '/projects/project-72577.jpg',
  },
  {
    id: '4',
    category: 'Pool Enclosures',
    style: 'Gable',
    build: 'Free Standing',
    label: 'Gable – Free Standing',
    image: '/projects/project-122981.jpg',
  },
  {
    id: '5',
    category: 'Pool Enclosures',
    style: 'Hip',
    build: 'Roof-Over',
    label: 'Hip – Roof-Over',
    image: '/projects/project-72552.jpg',
  },
  {
    id: '6',
    category: 'Screen Rooms',
    style: 'Elite',
    build: 'Attached to House',
    label: 'Elite – Attached to House',
    image: '/projects/project-72553.jpg',
  },
  {
    id: '7',
    category: 'Pool Enclosures',
    style: 'Mansard',
    build: 'Roof-Over',
    label: 'Mansard – Roof-Over',
    image: '/projects/project-72554.jpg',
  },
  {
    id: '8',
    category: 'Pool Enclosures',
    style: 'Dome',
    build: 'Free Standing',
    label: 'Dome – Free Standing',
    image: '/projects/project-72555.jpg',
  },
  {
    id: '9',
    category: 'Screen Rooms',
    style: 'Elite',
    build: 'Attached to House',
    label: 'Elite – Attached to House',
    image: '/projects/project-72556.jpg',
  },
  {
    id: '10',
    category: 'Pool Enclosures',
    style: 'Hip',
    build: 'Roof-Over',
    label: 'Hip – Roof-Over',
    image: '/projects/project-72557.jpg',
  },
  {
    id: '11',
    category: 'MegaView®',
    style: 'UX',
    build: 'Roof-Over',
    label: 'UX – Roof-Over',
    image: '/projects/project-72558.jpg',
  },
  {
    id: '12',
    category: 'Pool Enclosures',
    style: 'Mansard',
    build: 'Under Existing Gable',
    label: 'Mansard – Under Existing Gable',
    image: '/projects/project-72559.jpg',
  },
  {
    id: '13',
    category: 'Pool Enclosures',
    style: 'Gable',
    build: 'Under Existing Gable',
    label: 'Gable – Under Existing Gable',
    image: '/projects/project-72560.jpg',
  },
  {
    id: '14',
    category: 'Screen Rooms',
    style: 'Elite',
    build: 'Attached to House',
    label: 'Elite – Attached to House',
    image: '/projects/project-72561.jpg',
  },
  {
    id: '15',
    category: 'Pool Enclosures',
    style: 'Hip',
    build: 'Roof-Over',
    label: 'Hip – Roof-Over',
    image: '/projects/project-72562.jpg',
  },
  {
    id: '16',
    category: 'MegaView®',
    style: 'UX',
    build: 'Roof-Over',
    label: 'UX – Roof-Over',
    image: '/projects/project-72563.jpg',
    beforeImage: '/projects/project-72578.jpg',
  },
  {
    id: '17',
    category: 'Pool Enclosures',
    style: 'Mansard',
    build: 'Roof-Over',
    label: 'Mansard – Roof-Over',
    image: '/projects/project-72564.jpg',
  },
  {
    id: '18',
    category: 'Pool Enclosures',
    style: 'Mansard',
    build: 'Roof-Over',
    label: 'Mansard – Roof-Over',
    image: '/projects/project-72565.jpg',
  },
  {
    id: '19',
    category: 'Screen Rooms',
    style: 'Elite',
    build: 'Attached to House',
    label: 'Elite – Attached to House',
    image: '/projects/project-72566.jpg',
  },
  {
    id: '20',
    category: 'Pool Enclosures',
    style: 'Gable',
    build: 'Under Existing Gable',
    label: 'Gable – Under Existing Gable',
    image: '/projects/project-72567.jpg',
  },
  {
    id: '21',
    category: 'Pool Enclosures',
    style: 'Hip',
    build: 'Roof-Over',
    label: 'Hip – Roof-Over',
    image: '/projects/project-72568.jpg',
  },
  {
    id: '22',
    category: 'MegaView®',
    style: 'UX',
    build: 'Roof-Over',
    label: 'UX – Roof-Over',
    image: '/projects/project-72569.jpg',
    beforeImage: '/projects/project-72579.jpg',
  },
  {
    id: '23',
    category: 'Pool Enclosures',
    style: 'Mansard',
    build: 'Under Existing Gable',
    label: 'Mansard – Under Existing Gable',
    image: '/projects/project-72570.jpg',
  },
  {
    id: '24',
    category: 'Pool Enclosures',
    style: 'Dome',
    build: 'Free Standing',
    label: 'Dome – Free Standing',
    image: '/projects/project-72571.jpg',
  },
  {
    id: '25',
    category: 'Screen Rooms',
    style: 'Elite',
    build: 'Attached to House',
    label: 'Elite – Attached to House',
    image: '/projects/project-72572.jpg',
  },
  {
    id: '26',
    category: 'Pool Enclosures',
    style: 'Mansard',
    build: 'Roof-Over',
    label: 'Mansard – Roof-Over',
    image: '/projects/project-72573.jpg',
  },
  {
    id: '27',
    category: 'Pool Enclosures',
    style: 'Hip',
    build: 'Roof-Over',
    label: 'Hip – Roof-Over',
    image: '/projects/project-72574.jpg',
  },
  {
    id: '28',
    category: 'MegaView®',
    style: 'UX',
    build: 'Roof-Over',
    label: 'UX – Roof-Over',
    image: '/projects/project-72575.jpg',
    beforeImage: '/projects/project-72580.jpg',
  },
]

export function filterProjects(
  category?: Category | null,
  style?: Style | null,
  build?: Build | null
): Project[] {
  return projects.filter((project) => {
    if (category && project.category !== category) return false
    if (style && project.style !== style) return false
    if (build && project.build !== build) return false
    return true
  })
}

export function getStylesForCategory(category: Category): Style[] {
  const categoryProjects = projects.filter((p) => p.category === category)
  const stylesSet = new Set(categoryProjects.map((p) => p.style))
  return STYLES.filter((s) => stylesSet.has(s))
}

export function getBuildsForStyle(style: Style): Build[] {
  const styleProjects = projects.filter((p) => p.style === style)
  const buildsSet = new Set(styleProjects.map((p) => p.build))
  return BUILDS.filter((b) => buildsSet.has(b))
}
