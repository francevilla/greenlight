# Component Spec — SkeletonLine & SkeletonBlock

**File sorgente:** `frontend/src/components/ui/SkeletonLine.tsx`, `SkeletonBlock.tsx`
**Destinazione d'uso:** stati di caricamento durante attesa API provider (3-8s reale), dashboard stats, storico lista.

## Descrizione narrativa
Elementi di placeholder animati che simulano la struttura della pagina in attesa dei dati. Evitano il flicker e comunicano che il sistema sta lavorando.

## Struttura componenti
- `div` con classe `animate-pulse` o keyframe custom
- Colore base: `bg-muted/50`, bordo `border-border`

## Pseudo-codice React + Tailwind

```tsx
import * as React from 'react'
import { cn } from '@/lib/utils'

interface SkeletonLineProps {
  width?: string | number // es: '60%', 'full', 200
  className?: string
}

export function SkeletonLine({ width = '100%', className }: SkeletonLineProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted/50 h-4 w-full',
        typeof width === 'string' ? `w-[${width}]` : `w-[${width}px]`,
        className
      )}
    />
  )
}

interface SkeletonBlockProps {
  width?: string | number
  height?: string | number
  className?: string
  rounded?: 'sm' | 'md' | 'lg' | 'full'
}

export function SkeletonBlock({ width = '100%', height = '100%', className, rounded = 'md' }: SkeletonBlockProps) {
  const radius = { sm: 'rounded-sm', md: 'rounded-md', lg: 'rounded-lg', full: 'rounded-full' }[rounded]
  return (
    <div
      className={cn(
        'animate-pulse bg-muted/50',
        typeof width === 'string' ? `w-[${width}]` : `w-[${width}px]`,
        typeof height === 'string' ? `h-[${height}]` : `h-[${height}px]`,
        radius,
        className
      )}
    />
  )
}
```

## Uso consigliato

**Durante attesa API (report):**
```tsx
<div className="space-y-4">
  <SkeletonLine width="40%" /> {/* nome azienda */}
  <SkeletonLine width="60%" /> {/* dettagli */}
  <SkeletonBlock width="160" height="160" rounded="full" /> {/* semaforo */}
</div>
```

**Dashboard stats:**
- 4 card `SkeletonBlock` con `h-24` invece dei numeri reali.

## Note di animazione
- `animate-pulse` Tailwind (1.5s, ease-in-out, infinito).
- Durata minima mostrata: 1.5s (per evitare flicker se l'API risponde in 200ms).
- Quando i dati arrivano, sostituire skeleton con contenuto reale con `fade-in` 300ms.

## Do & Don't
- ✅ Sempre sostituiti da contenuto reale quando i dati arrivano.
- ✅ Struttura identica al contenuto finale (stessa larghezza, stesso layout).
- ❌ Mai lasciare skeleton per sempre (se l'API fallisce, mostrare errore).
- ❌ Nessun skeleton per micro-elementi (icone, badge piccoli).
