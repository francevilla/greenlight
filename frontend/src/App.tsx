import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from '@/hooks/useAuth'
import { Toaster } from '@/components/ui/Toaster'
import SemaforoSite from '@/pages/SemaforoSite'
import LoginPage from '@/pages/LoginPage'
import RegisterPage from '@/pages/RegisterPage'
import LegaliPage from '@/pages/LegaliPage'
import ForgotPasswordPage from '@/pages/ForgotPasswordPage'
import ManifestoPage from '@/pages/ManifestoPage'

const DashboardPage = lazy(() => import('@/pages/DashboardPage'))

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return user ? <Navigate to="/dashboard" replace /> : <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<SemaforoSite />} />
      <Route path="/semaforo" element={<Navigate to="/" replace />} />
      <Route 
        path="/login" 
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        } 
      />
      <Route 
        path="/register" 
        element={
          <PublicRoute>
            <RegisterPage />
          </PublicRoute>
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          </Suspense>
        } 
      />
      <Route path="/legali" element={<LegaliPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/manifesto" element={<ManifestoPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
      <Toaster />
    </AuthProvider>
  )
}