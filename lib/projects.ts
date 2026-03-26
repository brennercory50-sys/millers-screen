export type Category = 
  | 'Mansard'
  | 'Dome'
  | 'Hip'
  | 'Gable'
  | 'Pool Enclosures'
  | 'Screen Rooms'
  | 'MegaView'

export interface Project {
  id: string
  category: Category
  style: string
  build: string
  label: string
  image: string
  beforeImage?: string
}

export const CATEGORIES: Category[] = [
  'Mansard',
  'Dome',
  'Hip',
  'Gable',
  'Pool Enclosures',
  'Screen Rooms',
  'MegaView'
]

export const projects: Project[] = [
  {
    id: '1',
    category: 'Mansard',
    style: 'Roof-Over',
    build: 'Standard',
    label: 'Mansard Pool Enclosure',
    image: '/projects/project-122978.jpg',
    beforeImage: '/projects/project-72576.jpg',
  },
  {
    id: '2',
    category: 'Mansard',
    style: 'Under Existing Gable',
    build: 'Tie-In',
    label: 'Mansard Under Gable',
    image: '/projects/project-122980.jpg',
  },
  {
    id: '3',
    category: 'MegaView',
    style: 'Roof-Over',
    build: 'Premium',
    label: 'MegaView Premium',
    image: '/projects/project-122977.jpg',
    beforeImage: '/projects/project-72577.jpg',
  },
  {
    id: '4',
    category: 'Gable',
    style: 'Free Standing',
    build: 'Full Structure',
    label: 'Gable Free Standing',
    image: '/projects/project-122981.jpg',
  },
  {
    id: '5',
    category: 'Hip',
    style: 'Roof-Over',
    build: 'Standard',
    label: 'Hip Pool Enclosure',
    image: '/projects/project-72552.jpg',
  },
  {
    id: '6',
    category: 'Screen Rooms',
    style: 'Attached',
    build: 'Elite',
    label: 'Screen Room Elite',
    image: '/projects/project-72553.jpg',
  },
  {
    id: '7',
    category: 'Mansard',
    style: 'Roof-Over',
    build: 'Standard',
    label: 'Mansard Pool Enclosure',
    image: '/projects/project-72554.jpg',
  },
  {
    id: '8',
    category: 'Dome',
    style: 'Free Standing',
    build: 'Full Dome',
    label: 'Dome Pool Enclosure',
    image: '/projects/project-72555.jpg',
  },
  {
    id: '9',
    category: 'Screen Rooms',
    style: 'Attached',
    build: 'Elite',
    label: 'Screen Room Elite',
    image: '/projects/project-72556.jpg',
  },
  {
    id: '10',
    category: 'Hip',
    style: 'Roof-Over',
    build: 'Standard',
    label: 'Hip Pool Enclosure',
    image: '/projects/project-72557.jpg',
  },
  {
    id: '11',
    category: 'MegaView',
    style: 'Roof-Over',
    build: 'Premium',
    label: 'MegaView Premium',
    image: '/projects/project-72558.jpg',
  },
  {
    id: '12',
    category: 'Mansard',
    style: 'Under Existing Gable',
    build: 'Tie-In',
    label: 'Mansard Under Gable',
    image: '/projects/project-72559.jpg',
  },
  {
    id: '13',
    category: 'Gable',
    style: 'Under Existing Gable',
    build: 'Tie-In',
    label: 'Gable Under Gable',
    image: '/projects/project-72560.jpg',
  },
  {
    id: '14',
    category: 'Screen Rooms',
    style: 'Attached',
    build: 'Elite',
    label: 'Screen Room Elite',
    image: '/projects/project-72561.jpg',
  },
  {
    id: '15',
    category: 'Hip',
    style: 'Roof-Over',
    build: 'Standard',
    label: 'Hip Pool Enclosure',
    image: '/projects/project-72562.jpg',
  },
  {
    id: '16',
    category: 'MegaView',
    style: 'Roof-Over',
    build: 'Premium',
    label: 'MegaView Premium',
    image: '/projects/project-72563.jpg',
    beforeImage: '/projects/project-72578.jpg',
  },
  {
    id: '17',
    category: 'Mansard',
    style: 'Roof-Over',
    build: 'Standard',
    label: 'Mansard Pool Enclosure',
    image: '/projects/project-72564.jpg',
  },
  {
    id: '18',
    category: 'Mansard',
    style: 'Roof-Over',
    build: 'Standard',
    label: 'Mansard Pool Enclosure',
    image: '/projects/project-72565.jpg',
  },
  {
    id: '19',
    category: 'Screen Rooms',
    style: 'Attached',
    build: 'Elite',
    label: 'Screen Room Elite',
    image: '/projects/project-72566.jpg',
  },
  {
    id: '20',
    category: 'Gable',
    style: 'Under Existing Gable',
    build: 'Tie-In',
    label: 'Gable Under Gable',
    image: '/projects/project-72567.jpg',
  },
  {
    id: '21',
    category: 'Hip',
    style: 'Roof-Over',
    build: 'Standard',
    label: 'Hip Pool Enclosure',
    image: '/projects/project-72568.jpg',
  },
  {
    id: '22',
    category: 'MegaView',
    style: 'Roof-Over',
    build: 'Premium',
    label: 'MegaView Premium',
    image: '/projects/project-72569.jpg',
    beforeImage: '/projects/project-72579.jpg',
  },
  {
    id: '23',
    category: 'Mansard',
    style: 'Under Existing Gable',
    build: 'Tie-In',
    label: 'Mansard Under Gable',
    image: '/projects/project-72570.jpg',
  },
  {
    id: '24',
    category: 'Dome',
    style: 'Free Standing',
    build: 'Full Dome',
    label: 'Dome Pool Enclosure',
    image: '/projects/project-72571.jpg',
  },
  {
    id: '25',
    category: 'Screen Rooms',
    style: 'Attached',
    build: 'Elite',
    label: 'Screen Room Elite',
    image: '/projects/project-72572.jpg',
  },
  {
    id: '26',
    category: 'Mansard',
    style: 'Roof-Over',
    build: 'Standard',
    label: 'Mansard Pool Enclosure',
    image: '/projects/project-72573.jpg',
  },
  {
    id: '27',
    category: 'Hip',
    style: 'Roof-Over',
    build: 'Standard',
    label: 'Hip Pool Enclosure',
    image: '/projects/project-72574.jpg',
  },
  {
    id: '28',
    category: 'MegaView',
    style: 'Roof-Over',
    build: 'Premium',
    label: 'MegaView Premium',
    image: '/projects/project-72575.jpg',
    beforeImage: '/projects/project-72580.jpg',
  },
]

export function getProjectsByCategory(category: Category): Project[] {
  return projects.filter((p) => p.category === category)
}

export function getCategoryCoverImage(category: Category): string {
  const categoryProjects = getProjectsByCategory(category)
  return categoryProjects[0]?.image || '/projects/project-122978.jpg'
}
