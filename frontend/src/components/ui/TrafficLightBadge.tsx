import { cn } from '@/lib/utils'

interface TrafficLightBadgeProps {
  status: 'VERDE' | 'GIALLO' | 'ARANCIONE' | 'ROSSO' | 'PENDING' | 'ERROR'
  size?: 'sm' | 'md' | 'lg'
  label?: string
}

const STATUS_LABELS: Record<string, string> = {
  VERDE: 'Affidabile',
  GIALLO: 'Attenzione',
  ARANCIONE: 'Rischio Medio',
  ROSSO: 'Alto Rischio',
  PENDING: 'In elaborazione',
  ERROR: 'Errore',
}

const STATUS_COLORS: Record<string, string> = {
  VERDE: 'bg-semantic-verde border-semantic-verde text-semantic-verde',
  GIALLO: 'bg-semantic-giallo border-semantic-giallo text-ink',
  ARANCIONE: 'bg-semantic-arancio border-semantic-arancio text-semantic-arancio',
  ROSSO: 'bg-semantic-rosso border-semantic-rosso text-semantic-rosso',
  PENDING: 'bg-semantic-pending border-semantic-pending text-semantic-pending',
  ERROR: 'bg-semantic-error border-semantic-error text-semantic-error',
}

export function TrafficLightBadge({
  status,
  size = 'md',
  label,
}: TrafficLightBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border',
        STATUS_COLORS[status],
        {
          'px-2.5 py-1 text-sm': size === 'lg',
          'px-1.5 py-0.5 text-[10px]': size === 'sm',
        }
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label ?? STATUS_LABELS[status]}
    </span>
  )
}
