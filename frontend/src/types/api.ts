export interface UserResponse {
  id: string
  email: string
  name: string | null
  plan: 'FREE' | 'BASIC' | 'PRO' | 'ENTERPRISE'
  createdAt: string
}

export interface CreditCheckResponse {
  id: string
  companyName: string
  vatNumber: string
  taxCode: string
  provider: 'CERVED' | 'CRIBIS' | 'CREDITSAFE'
  providerId: string | null
  status: 'PENDING' | 'VERDE' | 'GIALLO' | 'ARANCIONE' | 'ROSSO' | 'ERROR'
  score: number | null
  rawResponse: Record<string, unknown> | null
  createdAt: string
}

export interface CreditCheckRequest {
  companyName: string
  vatNumber: string
  taxCode: string
  provider: 'CERVED' | 'CRIBIS' | 'CREDITSAFE'
}

export interface StatsResponse {
  plan: 'FREE' | 'BASIC' | 'PRO' | 'ENTERPRISE'
  limit: number
  used: number
  remaining: number
  byStatus: Record<string, number>
}

export interface ProviderInfo {
  id: string
  name: string
  description: string
}

export interface ProvidersResponse {
  providers: ProviderInfo[]
}