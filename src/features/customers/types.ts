import type { Tables } from '../../types/database.types'

export type Customer = Tables<'customers'>
export type CustomerStatus = 'active' | 'inactive'

export type CustomerFilters = {
  search: string
  status: CustomerStatus | 'all'
  page: number
  pageSize: number
}