// Types matching actual CompanyCam API v2 response shapes

export interface CompanyCamAddress {
  street_address_1: string | null
  street_address_2: string | null
  city: string | null
  state: string | null
  postal_code: string | null
  country: string | null
}

export interface CompanyCamImageVariant {
  type: 'original' | 'web' | 'thumbnail'
  uri: string
  url: string
}

export interface CompanyCamProject {
  id: string
  company_id: string
  creator_id: string
  creator_type: string
  creator_name: string
  status: string
  archived: boolean
  public: boolean
  name: string
  address: CompanyCamAddress
  feature_image: CompanyCamImageVariant[]
  slug: string
  project_url: string
  public_url: string
  coordinates: { lat: number; lon: number }
  created_at: number
  updated_at: number
  photo_count: number
}

export interface CompanyCamPhoto {
  id: string
  project_id: string
  uri?: string[]
  url: string
  thumbnail_url?: string
  title?: string
  created_at: number
  updated_at: number
  creator_name?: string
  project?: {
    name?: string
    address?: string
    city?: string
    state?: string
    zip?: string
  }
}

// Normalized project shape for the frontend
export interface ProjectCard {
  id: string
  name: string
  address: string
  city: string
  state: string
  coverImageUrl: string
  thumbnailUrl: string
  latitude: number
  longitude: number
  photoCount: number
  createdAt: number
  updatedAt: number
  creatorName: string
  publicUrl: string
  status: 'active' | 'archived'
}

export interface JobLocation {
  id: string
  projectName: string
  address: string
  latitude: number
  longitude: number
  coverImageUrl: string
  updatedAt: number
}

export function formatAddress(addr: CompanyCamAddress): string {
  return [addr.street_address_1, addr.city, addr.state, addr.postal_code]
    .filter(Boolean)
    .join(', ')
}

export function getImageUrl(images: CompanyCamImageVariant[], type: 'web' | 'thumbnail' | 'original' = 'web'): string {
  const match = images.find(img => img.type === type)
  return match?.url || images[0]?.url || ''
}

export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * 1000)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`

  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
  })
}
