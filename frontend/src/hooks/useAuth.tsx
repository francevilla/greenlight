import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { api } from '@/lib/api'
import type { UserResponse } from '@/types/api'

interface AuthContextType {
  user: UserResponse | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name?: string) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserResponse | null>(null)
  const [loading, setLoading] = useState(true)

  const refreshUser = async () => {
    if (!api.isAuthenticated()) {
      setUser(null)
      setLoading(false)
      return
    }
    try {
      const userData = await api.getMe()
      setUser(userData)
    } catch {
      setUser(null)
      api.clearAuth()
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshUser()
  }, [])

  const login = async (email: string, password: string) => {
    await api.login(email, password)
    await refreshUser()
  }

  const register = async (email: string, password: string, name?: string) => {
    await api.register(email, password, name)
    await refreshUser()
  }

  const logout = async () => {
    await api.logout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve essere usato all\'interno di AuthProvider')
  }
  return context
}