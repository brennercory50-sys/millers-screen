import { NextResponse } from 'next/server'
import type { CompanyCamPhoto, CompanyCamProject, JobLocation, JobProject, JobType, JobsData } from '@/lib/companycam'

const COMPANYCAM_API_BASE = 'https://api.companycam.com/v2'

export const dynamic = 'force-dynamic'
export const revalidate = 60

async function getApiKey(): Promise<string | null> {
  return process.env.COMPANYCAM_API_KEY ?? null
}

async function fetchWithAuth(endpoint: string): Promise<any> {
  const apiKey = await getApiKey()
  if (!apiKey) {
    throw new Error('CompanyCam API key not configured')
  }

  const response = await fetch(`${COMPANYCAM_API_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`CompanyCam API error: ${response.status} - ${error}`)
  }

  return response.json()
}

function inferJobType(projectName: string): JobType {
  const name = projectName.toLowerCase()
  if (name.includes('pool') || name.includes('enclosure')) return 'pool-enclosure'
  if (name.includes('screen room') || name.includes('screenroom')) return 'screen-room'
  if (name.includes('concrete') || name.includes('paver')) return 'concrete-pavers'
  if (name.includes('repair') || name.includes('fix') || name.includes('patch')) return 'repairs'
  return 'other'
}

function getAddress(project: CompanyCamProject): string {
  return [
    project.address,
    project.city,
    project.state,
    project.zip,
  ].filter(Boolean).join(', ')
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request?.url ?? '')
    const page = parseInt(searchParams?.get('page') ?? '1')
    const limit = parseInt(searchParams?.get('limit') ?? '20')
    const offset = (page - 1) * limit

    const apiKey = await getApiKey()
    if (!apiKey) {
      return NextResponse.json(
        { error: 'CompanyCam API not configured. Add COMPANYCAM_API_KEY to environment.' },
        { status: 503 }
      )
    }

    const [photosData, projectsData] = await Promise.all([
      fetchWithAuth(`/photos?sort=created_at desc&per_page=${limit}&page=${page}`),
      fetchWithAuth('/projects?per_page=500'),
    ])

    const projectsMap = new Map<string, CompanyCamProject>()
    if (projectsData.projects) {
      projectsData.projects.forEach((project: CompanyCamProject) => {
        projectsMap.set(String(project.id), project)
      })
    }

    const photos: CompanyCamPhoto[] = (photosData.photos || []).map((photo: CompanyCamPhoto) => {
      const project = photo.project_id ? projectsMap.get(String(photo.project_id)) : undefined
      return {
        ...photo,
        project,
      }
    })

    const jobsMap = new Map<string, JobProject>()
    const photoCountByProject = new Map<string, number>()
    const crewSet = new Set<string>()
    const jobTypeSet = new Set<JobType>()

    photos.forEach((photo) => {
      const projectId = String(photo.project_id)
      if (!photo.project) return

      photoCountByProject.set(projectId, (photoCountByProject.get(projectId) || 0) + 1)

      if (photo.creator_name) {
        crewSet.add(photo.creator_name)
      }

      if (!jobsMap.has(projectId)) {
        const jobType = inferJobType(photo.project.name)
        jobTypeSet.add(jobType)

        const address = getAddress(photo.project)
        const latitude = photo.latitude || photo.project.latitude
        const longitude = photo.longitude || photo.project.longitude

        jobsMap.set(projectId, {
          id: projectId,
          projectName: photo.project.name,
          address: address || 'Address not set',
          jobType,
          crew: photo.creator_name || 'Unknown',
          latestPhotoUrl: photo.thumbnail_url || photo.url,
          latestPhotoDate: photo.created_at,
          photoCount: 1,
          latitude,
          longitude,
        })
      } else {
        const existingJob = jobsMap.get(projectId)!
        if (photo.created_at > existingJob.latestPhotoDate) {
          existingJob.latestPhotoDate = photo.created_at
          existingJob.latestPhotoUrl = photo.thumbnail_url || photo.url
          existingJob.crew = photo.creator_name || existingJob.crew
        }
      }
    })

    const jobs = Array.from(jobsMap.values()).sort((a, b) => b.latestPhotoDate - a.latestPhotoDate)

    const locationsMap = new Map<string, JobLocation>()
    jobs.forEach((job) => {
      if (job.latitude && job.longitude) {
        locationsMap.set(job.id, {
          id: parseInt(job.id),
          projectName: job.projectName,
          address: job.address,
          latitude: job.latitude,
          longitude: job.longitude,
          latestPhotoUrl: job.latestPhotoUrl,
          latestPhotoDate: job.latestPhotoDate,
        })
      }
    })

    const locations = Array.from(locationsMap.values())

    const totalPhotos = photosData.total_count ?? photosData.photos?.length ?? 0

    return NextResponse.json({
      jobs,
      locations,
      filters: {
        crewMembers: Array.from(crewSet).sort(),
        jobTypes: Array.from(jobTypeSet),
      },
      pagination: {
        page,
        limit,
        total: totalPhotos,
        hasMore: photosData.photos?.length === limit,
      },
    })
  } catch (error) {
    console.error('CompanyCam API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch jobs data' },
      { status: 500 }
    )
  }
}
