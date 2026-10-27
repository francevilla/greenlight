import { cn } from '@/lib/utils'

interface ProviderChipProps {
  value: 'CERVED' | 'CRIBIS' | 'CREDITSAFE'
  label: string
  selected: boolean
  onSelect: (value: string) => void
}

const PROVIDER_COLORS: Record<string, string> = {
  CERVED: 'bg-semantic-verde text-white border-semantic-verde shadow-sm',
  CRIBIS: 'bg-semantic-arancio text-white border-semantic-arancio shadow-sm',
  CREDITSAFE: 'bg-semantic-rosso text-white border-semantic-rosso shadow-sm',
}

export function ProviderChip({
  value,
  label,
  selected,
  onSelect,
}: ProviderChipProps) {
  return (
    <button
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(value)}
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium border transition-colors duration-150',
        selected
          ? PROVIDER_COLORS[value]
          : 'border-border text-muted-foreground hover:border-primary/50 bg-muted/50 hover:bg-muted',
        selected ? 'ring-2 ring-offset-background ring-primary' : ''
      )}
    >
      {label}
    </button>
  )
}
