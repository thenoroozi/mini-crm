import { supabase } from '../../lib/supabase'
import type { Customer, CustomerFilters, CustomerInput } from './types'

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
}export async function createCustomer(input: CustomerInput): Promise<Customer> {
  const { data, error } = await supabase.from('customers').insert(input).select().single()
  if (error) throw error
  return data
}

export async function updateCustomer(id: string, input: CustomerInput): Promise<Customer> {
  const { data, error } = await supabase
    .from('customers')
    .update(input)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function deleteCustomer(id: string): Promise<void> {
  const { error } = await supabase.from('customers').delete().eq('id', id)
  if (error) throw error
}

export async function getCustomer(id: string): Promise<Customer | null> {
  const { data, error } = await supabase.from('customers').select('*').eq('id', id).maybeSingle()
  if (error) {
    // 22P02: the id is not a valid UUID, so no customer can match it.
    if (error.code === '22P02') return null
    throw error
  }
  return data
}
