import { supabase } from '../../lib/supabase'
import type { Activity, ActivityInput } from './types'

export async function getActivities(customerId: string): Promise<Activity[]> {
  const { data, error } = await supabase
    .from('activities')
    .select('*')
    .eq('customer_id', customerId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}

export async function createActivity(input: ActivityInput): Promise<Activity> {
  const { data, error } = await supabase.from('activities').insert(input).select().single()
  if (error) throw error
  return data
}