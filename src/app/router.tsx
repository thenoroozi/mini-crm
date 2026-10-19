import { Route, Routes } from 'react-router'
import { AppLayout } from '../components/layout/AppLayout'
import { ProtectedRoute, PublicOnlyRoute } from '../features/auth/ProtectedRoute'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { CustomersPage } from '../pages/CustomersPage'

function Placeholder({ name }: { name: string }) {
  return <p className="text-muted">{name} page</p>
}

export function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route index element={<Placeholder name="Dashboard" />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="customers/:id" element={<Placeholder name="Customer detail" />} />
          <Route path="settings" element={<Placeholder name="Settings" />} />
        </Route>
      </Route>
    </Routes>
  )
}