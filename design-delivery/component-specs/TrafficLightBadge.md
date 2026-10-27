# Component Spec — TrafficLightBadge

**File sorgente:** `frontend/src/components/ui/TrafficLightBadge.tsx`
**Destinazione d'uso:** lista storico dashboard, tabella provider, badge stato nelle card.

## Descrizione narrativa
Badge circolare o pill che mostra lo stato del semaforo (VERDE/GIALLO/ARANCIONE/ROSSO/PENDING/ERROR). Sempre accompagnato da etichetta testuale leggibile. Il giallo usa testo nero per accessibilità WCAG AA.

## Struttura componenti (shadcn/ui)
- `Badge` base da shadcn/ui (Radix)
- Varianti `variant`: verde | giallo | arancio | rosso | pending | error
- Varianti `size`: sm | md | lg

## Pseudo-codice React + Tailwind

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

interface TrafficLightBadgeProps {
  status: 'VERDE' | 'GIALLO' | 'ARANCIONE' | 'ROSSO' | 'PENDING' | 'ERROR'
  size?: 'sm' | 'md' | 'lg'
  label?: string // se omesso, usa etichetta default italiana
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
  VERDE: 'bg-semantic-verde text-semantic-verde',
  GIALLO: 'bg-semantic-giallo text-ink', // testo nero su giallo per accessibilità
  ARANCIONE: 'bg-semantic-arancio text-semantic-arancio',
  ROSSO: 'bg-semantic-rosso text-semantic-rosso',
  PENDING: 'bg-semantic-pending text-semantic-pending',
  ERROR: 'bg-semantic-error text-semantic-error',
}

export function TrafficLightBadge({ status, size = 'md', label }: TrafficLightBadgeProps) {
  const isGiallo = status === 'GIALLO'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium border',
        STATUS_COLORS[status],
        {
          'px-2.5 py-1 text-sm': size === 'lg',
          'px-1.5 py-0.5 text-[10px]': size === 'sm',
          // giallo: bordo più scuro per definire il badge su sfondo chiaro
          'border-semantic-giallo': isGiallo,
        }
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full" />
      {label ?? STATUS_LABELS[status]}
    </span>
  )
}
```

## Note di animazione
- Nessuna animazione intrinseca. Se usato in lista storico, appare con `slide-up` (300ms, `cubic-bezier(0.22, 1, 0.36, 1)`) quando la riga entra.

## Do & Don't
- ✅ Sempre con etichetta testuale accanto al pallino colorato.
- ✅ Giallo: testo nero (`#0b0c0b`) su sfondo giallo.
- ❌ Mai usare solo un pallino colorato senza testo.
- ❌ Mai usare colori Tailwind default (red-500 ecc.) per gli stati semaforo.
