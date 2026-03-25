import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = 'force-dynamic'

const ADMIN_SECRET = process.env.ADMIN_SECRET ?? ''

function isAuthorized(request: Request): boolean {
  if (!ADMIN_SECRET) return false
  const authHeader = request?.headers?.get('authorization')
  return authHeader === `Bearer ${ADMIN_SECRET}`
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request?.url ?? '')
    const status = searchParams?.get('status') ?? 'all'
    const search = searchParams?.get('search') ?? ''
    const source = searchParams?.get('source') ?? 'all'
    const optIn = searchParams?.get('optIn') ?? 'all'

    const where: Record<string, unknown> = {}

    if (status && status !== 'all') {
      where.status = status
    }

    if (source && source !== 'all') {
      where.leadSource = source
    }

    if (optIn === 'true') {
      where.emailMarketingConsent = true
    } else if (optIn === 'false') {
      where.emailMarketingConsent = false
    }

    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
      ]
    }

    const leads = await prisma?.lead?.findMany?.({
      where,
      orderBy: { createdAt: 'desc' },
    })

    const totals = await prisma?.lead?.groupBy?.({
      by: ['status'],
      _count: true,
    })

    const total = await prisma?.lead?.count?.()
    const emailOptIns = await prisma?.lead?.count?.({
      where: { emailMarketingConsent: true },
    })

    return NextResponse.json({
      leads: leads ?? [],
      stats: {
        total: total ?? 0,
        emailOptIns: emailOptIns ?? 0,
        byStatus: totals ?? [],
      },
    })
  } catch (error) {
    console.error('Admin leads fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request?.json?.()
    const { id, status, followUpStage, notes } = data ?? {}

    if (!id) {
      return NextResponse.json({ error: 'Lead ID required' }, { status: 400 })
    }

    const updateData: Record<string, unknown> = {}
    if (status !== undefined) updateData.status = status
    if (followUpStage !== undefined) updateData.followUpStage = followUpStage
    if (notes !== undefined) updateData.notes = notes

    const lead = await prisma?.lead?.update?.({
      where: { id },
      data: updateData,
    })

    return NextResponse.json({ success: true, lead })
  } catch (error) {
    console.error('Admin lead update error:', error)
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 })
  }
}
