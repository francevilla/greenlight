# Component Spec — ProviderChip

**File sorgente:** `frontend/src/components/ui/ProviderChip.tsx`
**Destinazione d'uso:** selezione fonte dati nel form verifica, tabella provider dashboard, dettaglio report.

## Descrizione narrativa
Chip selezionabile che rappresenta una fonte dati (Cerved, Cribis, Credit Safe). Stato attivo: background verde foresta, testo bianco. Stato inattivo: background neutro, bordo sottile, testo neutro.

## Struttura componenti
- `button` con `role="radio"` (accessibilità)
- Icona opzionale a sinistra (logo provider semplificato)
- Testo nome provider

## Pseudo-codice React + Tailwind

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

interface ProviderChipProps {
  value: 'CERVED' | 'CRIBIS' | 'CREDITSAFE'
  label: string
  selected: boolean
  onSelect: (value: string) => void
}

const PROVIDER_COLORS: Record<string, string> = {
  CERVED: 'bg-semantic-verde text-white border-semantic-verde',
  CRIBIS: 'bg-semantic-arancio text-white border-semantic-arancio',
  CREDITSAFE: 'bg-semantic-rosso text-white border-semantic-rosso',
}

export function ProviderChip({ value, label, selected, onSelect }: ProviderChipProps) {
  return (
    <button
      role="radio"
      aria-checked={selected}
      onClick={() => onSelect(value)}
      className={cn(
        'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium border transition-colors',
        selected
          ? PROVIDER_COLORS[value]
          : 'border-border text-muted-foreground hover:border-primary/50 bg-muted/50 hover:bg-muted',
        selected ? 'shadow-sm' : ''
      )}
    >
      {label}
    </button>
  )
}
```

## Note di animazione
- Transizione stato attivo/inattivo: 150ms `cubic-bezier(0.22, 1, 0.36, 1)`.
- Nessuna animazione di ingresso.

## Do & Don't
- ✅ Sempre con aria-checked per accessibilità tastiera.
- ✅ Colori semantici diversi per ogni provider (verde/arancio/rosso).
- ❌ Mai usare lo stesso colore per provider diversi.
