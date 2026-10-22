import { Navigate, Outlet, useLocation } from 'react-router'
import { Skeleton } from '../../components/ui/Skeleton'
import { useAuth } from './useAuth'

function FullPageLoader() {
  return (
    <div role="status" aria-label="Loading" className="flex min-h-screen items-center justify-center">
      <Skeleton className="h-10 w-40" />
    </div>
  )
}

export function ProtectedRoute() {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (loading) return <FullPageLoader />
  if (!session) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return <Outlet />
}

export function PublicOnlyRoute() {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (loading) return <FullPageLoader />
  if (session) {
    const from = (location.state as { from?: string } | null)?.from ?? '/dashboard'
    return <Navigate to={from} replace />
  }
  return <Outlet />
}