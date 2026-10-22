import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('it-IT', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
  }).format(amount)
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'VERDE':
      return 'text-green-400 bg-green-400/10 border-green-400/20'
    case 'GIALLO':
      return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20'
    case 'ARANCIONE':
      return 'text-orange-400 bg-orange-400/10 border-orange-400/20'
    case 'ROSSO':
      return 'text-red-400 bg-red-400/10 border-red-400/20'
    case 'PENDING':
      return 'text-blue-400 bg-blue-400/10 border-blue-400/20'
    case 'ERROR':
      return 'text-gray-400 bg-gray-400/10 border-gray-400/20'
    default:
      return 'text-muted-foreground bg-muted border-border'
  }
}

export function getStatusLabel(status: string): string {
  switch (status) {
    case 'VERDE':
      return 'Affidabile'
    case 'GIALLO':
      return 'Attenzione'
    case 'ARANCIONE':
      return 'Rischio Medio'
    case 'ROSSO':
      return 'Alto Rischio'
    case 'PENDING':
      return 'In Attesa'
    case 'ERROR':
      return 'Errore'
    default:
      return status
  }
}

export function getProviderName(provider: string): string {
  switch (provider) {
    case 'CERVED':
      return 'Cerved'
    case 'CRIBIS':
      return 'Cribis'
    case 'CREDITSAFE':
      return 'Credit Safe'
    default:
      return provider
  }
}