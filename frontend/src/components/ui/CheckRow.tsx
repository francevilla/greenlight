import { cn } from '@/lib/utils'
import { TrafficLightBadge } from '@/components/ui/TrafficLightBadge'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/Tooltip'
import { Loader2 } from 'lucide-react'
import { formatDate, getProviderName } from '@/lib/utils'

interface CheckRowProps {
  check: {
    id: string
    companyName: string
    vatNumber: string
    taxCode: string
    provider: string
    status: string
    score: number | null
    createdAt: string
  }
  onClick?: (id: string) => void
}

const STATUS_COLORS: Record<string, string> = {
  VERDE: 'bg-semantic-verde',
  GIALLO: 'bg-semantic-giallo text-ink',
  ARANCIONE: 'bg-semantic-arancio',
  ROSSO: 'bg-semantic-rosso',
  PENDING: 'bg-semantic-pending',
  ERROR: 'bg-semantic-error',
}

export function CheckRow({ check, onClick }: CheckRowProps) {
  const isPending =
    check.status === 'PENDING' || check.status === 'ERROR'

  return (
    <div
      onClick={() => onClick?.(check.id)}
      className={cn(
        'flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:border-primary/50 transition-colors duration-150',
        onClick ? 'hover:bg-muted/50 cursor-pointer' : ''
      )}
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          ) : (
            <div className="flex gap-1">
              {['VERDE', 'GIALLO', 'ARANCIONE', 'ROSSO'].map((s) => (
                <div
                  key={s}
                  className={cn(
                    'w-1.5 h-1.5 rounded-full',
                    s === check.status
                      ? STATUS_COLORS[s]
                      : 'bg-muted-foreground/20'
                  )}
                />
              ))}
            </div>
          )}
        </div>
        <div>
          <p className="font-medium">{check.companyName}</p>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="font-mono">{check.vatNumber}</span>
            <span>•</span>
            <span>{getProviderName(check.provider)}</span>
            <span>•</span>
            <span>{formatDate(check.createdAt)}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {check.score !== null && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="px-2 py-1 rounded-lg bg-muted text-sm font-mono font-medium">
                Score: {check.score}
              </span>
            </TooltipTrigger>
            <TooltipContent>Punteggio numerico del provider</TooltipContent>
          </Tooltip>
        )}
        <TrafficLightBadge
          status={check.status as any}
          size="sm"
        />
      </div>
    </div>
  )
}
