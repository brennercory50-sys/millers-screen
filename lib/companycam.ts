export interface CompanyCamProject {
  id: number
  name: string
  address?: string
  city?: string
  state?: string
  zip?: string
  latitude?: number
  longitude?: number
  created_at: number
  updated_at: number
}

export interface CompanyCamPhoto {
  id: string
  project_id: string
  project?: CompanyCamProject
  url: string
  thumbnail_url: string
  title?: string
  description?: string
  latitude?: number
  longitude?: number
  created_at: number
  updated_at: number
  captured_at?: number
  creator_id?: string
  creator_type?: string
  creator_name?: string
}

export interface CompanyCamPhotosResponse {
  photos: CompanyCamPhoto[]
  total_count: number
  page: number
  per_page: number
}

export interface CompanyCamProjectsResponse {
  projects: CompanyCamProject[]
  total_count: number
  page: number
  per_page: number
}

export interface JobLocation {
  id: number
  projectName: string
  address: string
  latitude: number
  longitude: number
  latestPhotoUrl?: string
  latestPhotoDate?: number
}

export type JobType = 'pool-enclosure' | 'screen-room' | 'concrete-pavers' | 'repairs' | 'other'

export interface JobProject {
  id: string
  projectName: string
  address: string
  jobType: JobType
  crew: string
  latestPhotoUrl: string
  latestPhotoDate: number
  photoCount: number
  latitude?: number
  longitude?: number
}

export interface JobsData {
  jobs: JobProject[]
  locations: JobLocation[]
  filters: {
    crewMembers: string[]
    jobTypes: JobType[]
  }
}

function inferJobType(projectName: string): JobType {
  const name = projectName.toLowerCase()
  if (name.includes('pool') || name.includes('enclosure')) return 'pool-enclosure'
  if (name.includes('screen room') || name.includes('room')) return 'screen-room'
  if (name.includes('concrete') || name.includes('paver')) return 'concrete-pavers'
  if (name.includes('repair') || name.includes('fix')) return 'repairs'
  return 'other'
}

export function getJobTypeLabel(type: JobType): string {
  switch (type) {
    case 'pool-enclosure': return 'Pool Enclosure'
    case 'screen-room': return 'Screen Room'
    case 'concrete-pavers': return 'Concrete / Pavers'
    case 'repairs': return 'Repairs'
    default: return 'Other'
  }
}

export { inferJobType }
