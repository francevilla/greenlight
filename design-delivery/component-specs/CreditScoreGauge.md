# Component Spec — CreditScoreGauge

**File sorgente:** `frontend/src/components/ui/CreditScoreGauge.tsx`
**Destinazione d'uso:** dettaglio report (semaforo grande centrale), hero sezione, stati LiveCheck.

## Descrizione narrativa
Cerchio grande con colore stato semaforo, punteggio numerico al centro (opzionale) e etichetta testuale grande sotto. È l'elemento più importante dell'interfaccia: deve essere leggibile a colpo d'occhio anche da mobile.

## Struttura componenti
- Wrapper `relative flex flex-col items-center`
- Cerchio: `bg-[color]` con `ring-4 ring-[color]/20`
- Punteggio: font mono, testo grande
- Etichetta: serif, testo corpo

## Pseudo-codice React + Tailwind

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

interface CreditScoreGaugeProps {
  status: 'VERDE' | 'GIALLO' | 'ARANCIONE' | 'ROSSO' | 'PENDING' | 'ERROR'
  score?: number | null
  label?: string
  size?: 'md' | 'lg' | 'xl'
  ignite?: boolean // animazione hero
}

const SIZE_CLASS: Record<string, string> = {
  md: 'w-32 h-32 text-2xl',
  lg: 'w-48 h-48 text-3xl',
  xl: 'w-64 h-64 text-4xl',
}

const STATUS_COLORS: Record<string, string> = {
  VERDE: 'bg-semantic-verde ring-semantic-verde/20 text-semantic-verde',
  GIALLO: 'bg-semantic-giallo ring-semantic-giallo/20 text-ink',
  ARANCIONE: 'bg-semantic-arancio ring-semantic-arancio/20 text-semantic-arancio',
  ROSSO: 'bg-semantic-rosso ring-semantic-rosso/20 text-semantic-rosso',
  PENDING: 'bg-semantic-pending ring-semantic-pending/20 text-semantic-pending animate-pulse',
  ERROR: 'bg-semantic-error ring-semantic-error/20 text-semantic-error',
}

export function CreditScoreGauge({ status, score, label, size = 'lg', ignite = false }: CreditScoreGaugeProps) {
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
      <p className="mt-3 text-head font-serif uppercase tracking-tight">
        {label ?? status}
      </p>
    </div>
  )
}
```

## Note di animazione
- `ignite` (solo hero): `ignite` 420ms delay 320ms `cubic-bezier(0.2, 0.7, 0.3, 1)`.
- PENDING: `animate-pulse` lento (3s) per indicare attesa.
- Nessuna animazione sul punteggio numerico (deve essere leggibile subito).

## Do & Don't
- ✅ Score numerico in mono font, sempre visibile se disponibile.
- ✅ Dimensione minima 160px su desktop, 120px su mobile.
- ❌ Mai nascondere l'etichetta testuale sotto il colore.
- ❌ Mai usare gradiente sul cerchio del semaforo.
