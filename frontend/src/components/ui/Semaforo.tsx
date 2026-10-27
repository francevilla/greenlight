import { cn } from '@/lib/utils'

interface SemaforoProps {
  stato: 'VERDE' | 'GIALLO' | 'ARANCIONE' | 'ROSSO'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  ignite?: boolean
}

const SIZE_CLASS: Record<string, string> = {
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-4 h-4',
}

const GAP_CLASS: Record<string, string> = {
  sm: 'gap-1',
  md: 'gap-1.5',
  lg: 'gap-2',
  xl: 'gap-3',
}

const STATE_COLORS: Record<string, string> = {
  VERDE: 'bg-semantic-verde',
  GIALLO: 'bg-semantic-giallo',
  ARANCIONE: 'bg-semantic-arancio',
  ROSSO: 'bg-semantic-rosso',
}

export function Semaforo({
  stato,
  size = 'md',
  ignite = false,
}: SemaforoProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center',
        GAP_CLASS[size],
        ignite ? 'ignite' : ''
      )}
    >
      {['VERDE', 'GIALLO', 'ARANCIONE', 'ROSSO'].map((s) => (
        <div
          key={s}
          className={cn(
            'rounded-full transition-colors duration-300',
            SIZE_CLASS[size],
            s === stato ? STATE_COLORS[s] : 'bg-muted-foreground/20',
            s === stato
              ? 'shadow-[0_0_12px_rgba(23,178,106,0.4)]'
              : ''
          )}
        />
      ))}
    </div>
  )
}
