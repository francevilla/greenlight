# Component Spec — SemaforoHero

**File sorgente:** `frontend/src/components/landing/Semaforo.tsx`
**Destinazione d'uso:** hero sezione homepage, stati landing, sezione LiveCheck.

## Descrizione narrativa
Semaforo composto da 4 cerchi verticali (VERDE, GIALLO, ARANCIONE, ROSSO) con quello attivo illuminato. Usato come elemento visivo iconico e semantico. Dimensione variabile (sm, md, lg, xl).

## Struttura componenti
- `div` flex-col con 4 cerchi
- Cerchio attivo: colore pieno + anello esterno
- Cerchi inattivi: grigio scuro opaco
- Testo etichetta sotto (opzionale, gestito dal genitore)

## Pseudo-codice React + Tailwind

```tsx
import * as React from 'react'
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

export function Semaforo({ stato, size = 'md', ignite = false }: SemaforoProps) {
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
            s === stato ? 'shadow-[0_0_12px_rgba(23,178,106,0.4)]' : ''
          )}
        />
      ))}
    </div>
  )
}
```

## Note di animazione
- `ignite`: 420ms delay 320ms (solo hero, una volta).
- Cambio stato: 300ms `duration-300` su colore.
- Nessuna animazione lampeggiante (fastidiosa, riduce affidabilità).

## Do & Don't
- ✅ Sempre 4 cerchi, anche se uno solo è attivo.
- ✅ Cerchio attivo con ombra colorata soft (non al neon).
- ❌ Mai animazione lampeggiante continua (riduce la percezione di affidabilità).
- ❌ Mai nascondere i cerchi inattivi (la struttura completa comunica il sistema semaforo).
