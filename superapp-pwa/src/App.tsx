import { Navigate, Route, Routes } from 'react-router-dom'
import { AuthGuard } from './components/AuthGuard'
import { LoginPage } from './pages/Login/LoginPage'
import { ClientApp } from './pages/Client/ClientApp'
import { FranchiseeApp } from './pages/Franchisee/FranchiseeApp'
import { ProductionApp } from './pages/Production/ProductionApp'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />

      <Route
        path="/client/*"
        element={
          <AuthGuard requiredRole="client">
            <ClientApp />
          </AuthGuard>
        }
      />
      <Route
        path="/franchisee/*"
        element={
          <AuthGuard requiredRole="franchisee">
            <FranchiseeApp />
          </AuthGuard>
        }
      />
      <Route
        path="/production/*"
        element={
          <AuthGuard requiredRole="production">
            <ProductionApp />
          </AuthGuard>
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
