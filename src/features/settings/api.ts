import { supabase } from '../../lib/supabase'

export async function updateProfileName(userId: string, fullName: string): Promise<void> {
  const { error: profileError } = await supabase
    .from('profiles')
    .update({ full_name: fullName })
    .eq('id', userId)
  if (profileError) throw profileError

  // The UI reads the name from the auth session, so update it there too.
  const { error: authError } = await supabase.auth.updateUser({ data: { full_name: fullName } })
  if (authError) throw authError
}

export async function changePassword(password: string): Promise<void> {
  const { error } = await supabase.auth.updateUser({ password })
  if (error) throw error
}