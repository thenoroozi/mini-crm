import type { Tables, TablesInsert } from '../../types/database.types'

export type Customer = Tables<'customers'>
export type CustomerStatus = 'active' | 'inactive'

export type CustomerInput = Pick<
  TablesInsert<'customers'>,
  'name' | 'phone' | 'email' | 'address' | 'status' | 'total_spent'
>

export type CustomerFilters = {
  search: string
  status: CustomerStatus | 'all'
  page: number
  pageSize: number
}