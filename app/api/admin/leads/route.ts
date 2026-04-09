import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getSupabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

async function isAuthorized(): Promise<boolean> {
  const session = await getServerSession(authOptions)
  return !!session
}

export async function GET(request: Request) {
  const authorized = await isAuthorized()
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabase()
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  try {
    const { searchParams } = new URL(request?.url ?? '')
    const search = searchParams?.get('search') ?? ''
    const page = parseInt(searchParams?.get('page') ?? '1')
    const pageSize = parseInt(searchParams?.get('pageSize') ?? '20')
    const offset = (page - 1) * pageSize

    let query = supabase
      .from('leads')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + pageSize - 1)

    if (search) {
      query = query.or(`full_name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%`)
    }

    const { data: leads, error: leadsError, count } = await query

    if (leadsError) {
      console.error('Failed to fetch leads:', leadsError)
      return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
    }

    return NextResponse.json({
      leads: leads ?? [],
      pagination: {
        page,
        pageSize,
        total: count ?? 0,
        totalPages: Math.ceil((count ?? 0) / pageSize),
      },
      stats: {
        total: count ?? 0,
        emailOptIns: 0,
        byStatus: [],
      },
    })
  } catch (error) {
    console.error('Admin leads fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  const authorized = await isAuthorized()
  if (!authorized) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = getSupabase()
  if (!supabase) {
    return NextResponse.json({ error: 'Database not configured' }, { status: 503 })
  }

  try {
    const data = await request?.json?.()
    const { id, notes, status, followUpDate } = data ?? {}

    if (!id) {
      return NextResponse.json({ error: 'Lead ID required' }, { status: 400 })
    }

    const updateData: Record<string, any> = {}
    if (notes !== undefined) updateData.message = notes
    if (status !== undefined) updateData.status = status
    if (followUpDate !== undefined) updateData.follow_up_date = followUpDate

    const { data: lead, error } = await supabase
      .from('leads')
      .update(updateData)
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Failed to update lead:', error)
      return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 })
    }

    return NextResponse.json({ success: true, lead })
  } catch (error) {
    console.error('Admin lead update error:', error)
    return NextResponse.json({ error: 'Failed to update lead' }, { status: 500 })
  }
}
