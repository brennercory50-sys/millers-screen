import { NextResponse } from 'next/server'
import type { CompanyCamProject } from '@/lib/companycam'
import { getImageUrl } from '@/lib/companycam'

export const dynamic = 'force-dynamic'
export const revalidate = 300

export interface GalleryProject {
  id: string
  name: string
  city: string
  coverImageUrl: string
  thumbnailUrl: string
  publicUrl: string
  category: string
}

export interface GalleryApiResponse {
  categories: Record<string, GalleryProject[]>
}

const CATEGORY_KEYWORDS = [
  { category: 'Mansard',        keywords: ['mansard'] },
  { category: 'Dome',           keywords: ['dome'] },
  { category: 'Gable',          keywords: ['gable'] },
  { category: 'Hip',            keywords: ['hip'] },
  { category: 'Elite Room',     keywords: ['elite room', 'elite', 'screen room', 'screen-room', 'screened room', 'screen porch'] },
  { category: 'Under Existing', keywords: ['under existing', 'tie-in', 'tie in'] },
  { category: 'Flat',           keywords: ['flat', 'low profile', 'patio enclosure'] },
]

function classifyProject(name: string): string {
  const lower = name.toLowerCase()
  for (const { category, keywords } of CATEGORY_KEYWORDS) {
    if (keywords.some(kw => lower.includes(kw))) return category
  }
  return 'Other'
}

async function fetchWithAuth(endpoint: string): Promise<any> {
  const apiKey = process.env.COMPANYCAM_API_KEY
  if (!apiKey) throw new Error('CompanyCam API key not configured')

  const response = await fetch(`https://api.companycam.com/v2${endpoint}`, {
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
      return NextResponse.json({ categories: {} }, { status: 503 })
    }

    const rawProjects: CompanyCamProject[] = await fetchWithAuth(
      '/projects?per_page=100&sort=updated_at+desc'
    )

    const categories: Record<string, GalleryProject[]> = {}
    const ONE_DAY_MS = 1 * 24 * 60 * 60 * 1000
    const cutoffDate = new Date(Date.now() - ONE_DAY_MS)

    for (const p of rawProjects) {
      if (p.status !== 'active' || p.archived) continue

      const updatedAt = new Date(p.updated_at)
      if (updatedAt < cutoffDate) continue

      const coverImageUrl = getImageUrl(p.feature_image, 'web')
      if (!coverImageUrl) continue

      const category = classifyProject(p.name)
      if (category === 'Other') continue

      if (!categories[category]) categories[category] = []

      categories[category].push({
        id: p.id,
        name: p.name,
        city: p.address?.city ?? '',
        coverImageUrl,
        thumbnailUrl: getImageUrl(p.feature_image, 'thumbnail') || coverImageUrl,
        publicUrl: p.public_url ?? '',
        category,
      })
    }

    return NextResponse.json({ categories })
  } catch (error) {
    console.error('Gallery API error:', error)
    return NextResponse.json({ categories: {} }, { status: 500 })
  }
}
