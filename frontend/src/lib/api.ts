import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import Cookies from 'js-cookie'

const API_URL = import.meta.env.VITE_API_URL || '/api'

class ApiClient {
  private client: AxiosInstance
  private accessToken: string | null = null

  constructor() {
    this.client = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })

    this.client.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          this.clearAuth()
          window.location.href = '/login'
        }
        return Promise.reject(error)
      }
    )

    // Load token from cookie on init
    this.accessToken = Cookies.get('access_token') || null
  }

  setToken(token: string | null) {
    this.accessToken = token
    if (token) {
      Cookies.set('access_token', token, { expires: 1, secure: true, sameSite: 'lax' })
    } else {
      Cookies.remove('access_token')
    }
  }

  clearAuth() {
    this.setToken(null)
  }

  getToken(): string | null {
    return this.accessToken
  }

  isAuthenticated(): boolean {
    return !!this.accessToken
  }

  // Auth
  async register(email: string, password: string, name?: string) {
    const { data } = await this.client.post('/auth/register', { email, password, name })
    this.setToken(data.access_token)
    return data
  }

  async login(email: string, password: string) {
    const { data } = await this.client.post('/auth/login', { email, password })
    this.setToken(data.access_token)
    return data
  }

  async logout() {
    await this.client.post('/auth/logout')
    this.clearAuth()
  }

  async getMe() {
    const { data } = await this.client.get('/auth/me')
    return data
  }

  // Credit Checks
  async createCreditCheck(data: {
    companyName: string
    vatNumber: string
    taxCode: string
    provider: string
  }) {
    const { data: result } = await this.client.post('/credit-checks', data)
    return result
  }

  async getCreditChecks(params?: { skip?: number; take?: number; status?: string }) {
    const { data } = await this.client.get('/credit-checks', { params })
    return data
  }

  async getCreditCheck(id: string) {
    const { data } = await this.client.get(`/credit-checks/${id}`)
    return data
  }

  async getStats() {
    const { data } = await this.client.get('/credit-checks/stats/summary')
    return data
  }

  async getProviders() {
    const { data } = await this.client.get('/api/providers')
    return data
  }
}

export const api = new ApiClient()