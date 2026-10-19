import { supabase } from '../../lib/supabase'
import type { Customer, CustomerFilters } from './types'

export type CustomersPageData = {
  rows: Customer[]
  total: number
}

export async function getCustomers({
  search,
  status,
  page,
  pageSize,
}: CustomerFilters): Promise<CustomersPageData> {
  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  let query = supabase
    .from('customers')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (status !== 'all') query = query.eq('status', status)

  // Strip characters that have special meaning inside a PostgREST filter string.
  const term = search.replace(/[%_,()"\\]/g, ' ').trim()
  if (term) {
    query = query.or(`name.ilike.%${term}%,phone.ilike.%${term}%,email.ilike.%${term}%`)
  }

  const { data, error, count } = await query
  if (error) throw error

  return { rows: data, total: count ?? 0 }
}