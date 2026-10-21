import type { User } from '@supabase/supabase-js'

export function getDisplayName(user: User | null): string {
  const name = user?.user_metadata?.full_name
  if (typeof name === 'string' && name.trim()) return name
  return user?.email ?? 'User'
}