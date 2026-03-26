import { createClient, SupabaseClient } from '@supabase/supabase-js'

let supabaseInstance: SupabaseClient | null = null

export function getSupabase(): SupabaseClient | null {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return null
  }

  if (!supabaseInstance) {
    supabaseInstance = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    )
  }

  return supabaseInstance
}

export const supabase = {
  from: (table: string) => getSupabase()?.from(table) ?? {
    insert: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }),
    select: () => ({ single: () => Promise.resolve({ data: null, error: { message: 'Supabase not configured' } }) }),
  }
}
