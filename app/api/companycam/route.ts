import { NextResponse } from 'next/server'
import type { CompanyCamProject, ProjectCard, JobLocation } from '@/lib/companycam'
import { formatAddress, getImageUrl } from '@/lib/companycam'

const COMPANYCAM_API_BASE = 'https://api.companycam.com/v2'

export const dynamic = 'force-dynamic'
export const revalidate = 60

async function fetchWithAuth(endpoint: string): Promise<any> {
  const apiKey = process.env.COMPANYCAM_API_KEY
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

export async function GET(request: Request) {
  try {
    const apiKey = process.env.COMPANYCAM_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: 'CompanyCam API not configured. Add COMPANYCAM_API_KEY to environment.' },
        { status: 503 }
      )
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') ?? '1')
    const perPage = parseInt(searchParams.get('per_page') ?? '50')

    // CompanyCam returns a flat array of projects, NOT { projects: [...] }
    const rawProjects: CompanyCamProject[] = await fetchWithAuth(
      `/projects?per_page=${perPage}&page=${page}&sort=updated_at+desc`
    )

    console.log(`[CompanyCam] Fetched ${rawProjects.length} projects (page ${page})`)

    // Filter to active, non-archived projects
    const activeProjects = rawProjects.filter(p => p.status === 'active' && !p.archived)

    const projects: ProjectCard[] = activeProjects.map((p) => ({
      id: p.id,
      name: p.name,
      address: formatAddress(p.address),
      city: p.address.city || '',
      state: p.address.state || '',
      coverImageUrl: getImageUrl(p.feature_image, 'web'),
      thumbnailUrl: getImageUrl(p.feature_image, 'thumbnail'),
      latitude: p.coordinates?.lat ?? 0,
      longitude: p.coordinates?.lon ?? 0,
      photoCount: p.photo_count ?? 0,
      createdAt: p.created_at,
      updatedAt: p.updated_at,
      creatorName: p.creator_name || 'Unknown',
      publicUrl: p.public_url || '',
      status: p.archived ? 'archived' as const : 'active' as const,
    }))

    const locations: JobLocation[] = projects
      .filter(p => p.latitude && p.longitude)
      .map(p => ({
        id: p.id,
        projectName: p.name,
        address: p.address,
        latitude: p.latitude,
        longitude: p.longitude,
        coverImageUrl: p.coverImageUrl,
        updatedAt: p.updatedAt,
      }))

    return NextResponse.json({
      projects,
      locations,
      pagination: {
        page,
        perPage,
        count: projects.length,
        hasMore: rawProjects.length === perPage,
      },
    })
  } catch (error) {
    console.error('CompanyCam API error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}
