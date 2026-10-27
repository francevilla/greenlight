import { cn } from '@/lib/utils'

interface CreditScoreGaugeProps {
  status: 'VERDE' | 'GIALLO' | 'ARANCIONE' | 'ROSSO' | 'PENDING' | 'ERROR'
  score?: number | null
  label?: string
  size?: 'md' | 'lg' | 'xl'
  ignite?: boolean
}

const SIZE_CLASS: Record<string, string> = {
  md: 'w-32 h-32 text-2xl',
  lg: 'w-48 h-48 text-3xl',
  xl: 'w-64 h-64 text-4xl',
}

const STATUS_COLORS: Record<string, string> = {
  VERDE: 'bg-semantic-verde ring-4 ring-semantic-verde/20 text-semantic-verde',
  GIALLO: 'bg-semantic-giallo ring-4 ring-semantic-giallo/20 text-ink',
  ARANCIONE: 'bg-semantic-arancio ring-4 ring-semantic-arancio/20 text-semantic-arancio',
  ROSSO: 'bg-semantic-rosso ring-4 ring-semantic-rosso/20 text-semantic-rosso',
  PENDING: 'bg-semantic-pending ring-4 ring-semantic-pending/20 text-semantic-pending animate-pulse',
  ERROR: 'bg-semantic-error ring-4 ring-semantic-error/20 text-semantic-error',
}

export function CreditScoreGauge({
  status,
  score,
  label,
  size = 'lg',
  ignite = false,
}: CreditScoreGaugeProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          'rounded-full flex items-center justify-center shadow-lg',
          SIZE_CLASS[size],
          STATUS_COLORS[status],
          ignite ? 'ignite' : ''
        )}
      >
        {score !== null && <span className="font-mono font-bold">{score}</span>}
      </div>
      {label && (
        <p className="mt-3 text-head font-serif uppercase tracking-tight">
          {label}
        </p>
      )}
    </div>
  )
}
