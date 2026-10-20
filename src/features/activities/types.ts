import type { Tables, TablesInsert } from '../../types/database.types'

export type Activity = Tables<'activities'>
export type ActivityType = 'note' | 'call' | 'email'
export type ActivityInput = Pick<TablesInsert<'activities'>, 'customer_id' | 'type' | 'description'>