import { Badge } from '../../../components/ui/Badge'

export function StatusBadge({ status }: { status: string }) {
  return status === 'active' ? (
    <Badge tone="success">Active</Badge>
  ) : (
    <Badge tone="neutral">Inactive</Badge>
  )
}