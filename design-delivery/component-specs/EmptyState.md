# Component Spec — EmptyState

**File sorgente:** `frontend/src/components/ui/EmptyState.tsx`
**Destinazione d'uso:** dashboard storico vuoto, dashboard lista vuota, stati senza dati.

## Descrizione narrativa
Illustrazione o icona grande semaforo spento, titolo, testo descrittivo, bottone CTA principale. Deve invitare all'azione, non comunicare assenza morta.

## Struttura componenti
- `div` centrato con `text-center py-12`
- Icona Lucide (semaforo o `Loader2` / `CheckCircle`)
- Titolo h3, testo muted, bottone Button

## Pseudo-codice React + Tailwind

```tsx
import * as React from 'react'
import { Button } from '@/components/ui/Button'
import { Loader2 } from 'lucide-react'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel: string
  onAction: () => void
  icon?: React.ReactNode
}

export function EmptyState({ title, description, actionLabel, onAction, icon }: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 rounded-lg bg-muted/50 flex items-center justify-center mx-auto mb-4 text-muted-foreground/50">
        {icon ?? <Loader2 className="w-8 h-8" />}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">{description}</p>
      <Button onClick={onAction}>
        {actionLabel}
      </Button>
    </div>
  )
}
```

## Variazioni consigliate

**Dashboard storico vuoto:**
- Titolo: "Nessuna verifica ancora."
- Descrizione: "La tua prima verifica ti dice se puoi fidarti di un nuovo cliente."
- CTA: "Fai la tua prima verifica"

**Dashboard verifica in corso (nessun risultato):**
- Titolo: "Nessun risultato da mostrare."
- Descrizione: "Effettua una verifica per vedere i report qui."
- CTA: "Nuova verifica"

## Note di animazione
- Entrata: `fade-in` 500ms `ease-out`.
- Nessuna animazione sull'icona se statica.

## Do & Don't
- ✅ Sempre con un CTA che porti all'azione successiva.
- ✅ Titolo chiaro, mai "Errore" o "Nessun dato" da soli.
- ❌ Mai empty state senza bottone d'azione.
- ❌ Nessuna illustrazione stock generica.
