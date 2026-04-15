import { NextResponse } from 'next/server'
import type { CompanyCamProject, CompanyCamPhoto } from '@/lib/companycam'

const COMPANYCAM_API_BASE = 'https://api.companycam.com/v2'

export const dynamic = 'force-dynamic'
export const revalidate = 300

async function fetchWithAuth(endpoint: string): Promise<any> {
  const apiKey = process.env.COMPANYCAM_API_KEY
  if (!apiKey) throw new Error('CompanyCam API key not configured')

  const response = await fetch(`${COMPANYCAM_API_BASE}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    next: { revalidate: 300 },
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`CompanyCam API error: ${response.status} - ${error}`)
  }

  return response.json()
}

export async function GET() {
  try {
    const apiKey = process.env.COMPANYCAM_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'CompanyCam API not configured', photos: [] },
        { status: 503 }
      )
    }

    // Fetch recent projects and filter to MegaView ones
    const allProjects: CompanyCamProject[] = await fetchWithAuth(
      '/projects?per_page=100&sort=updated_at+desc'
    )

    const megaviewProjects = allProjects.filter(p =>
      p.name?.toLowerCase().includes('megaview') ||
      p.name?.toLowerCase().includes('mega view')
    )

    if (megaviewProjects.length === 0) {
      return NextResponse.json({ photos: [], projectCount: 0 })
    }

    // Fetch photos from each MegaView project (up to 5 projects, 10 photos each)
    const photoResults = await Promise.allSettled(
      megaviewProjects.slice(0, 5).map(async (project) => {
        const photos: CompanyCamPhoto[] = await fetchWithAuth(
          `/projects/${project.id}/photos?per_page=10&sort=created_at+desc`
        )
        return photos.map(photo => ({
          id: photo.id,
          url: photo.url,
          thumbnail_url: photo.thumbnail_url || photo.url,
          title: photo.title || project.name,
          created_at: photo.created_at,
          project: {
            name: project.name,
            city: project.address?.city || '',
          },
        }))
      })
    )

    const photos = photoResults
      .filter((r): r is PromiseFulfilledResult<any[]> => r.status === 'fulfilled')
      .flatMap(r => r.value)

    return NextResponse.json({
      photos,
      projectCount: megaviewProjects.length,
    })
  } catch (error) {
    console.error('MegaView photos API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch photos', photos: [] },
      { status: 500 }
    )
  }
}
