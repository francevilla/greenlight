# Component Spec — PricingCard

**File sorgente:** `frontend/src/components/landing/PricingCard.tsx`
**Destinazione d'uso:** sezione pricing in homepage e pagina pricing standalone.

## Descrizione narrativa
Card piano con nome, prezzo grande, descrizione, lista feature incluse, CTA. Tre varianti: Free (su carta, testo inchiostro), Basic (su inchiostro, testo carta), Pro (su inchiostro, testo carta, accento oro).

## Struttura componenti (shadcn/ui)
- `Card` + `CardHeader` + `CardTitle` + `CardContent` + `CardFooter`
- `Button` primary o ghost a seconda del piano
- Lista feature: righe con check icona

## Pseudo-codice React + Tailwind

```tsx
import * as React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Check } from 'lucide-react'

interface PricingCardProps {
  nome: string
  prezzo: string
  descrizione: string
  features: string[]
  cta: string
  ctaLink: string
  variant: 'free' | 'basic' | 'pro' | 'enterprise'
  highlighted?: boolean
}

const VARIANT_STYLES: Record<string, string> = {
  free: 'bg-paper text-ink border border-border',
  basic: 'bg-ink text-paper',
  pro: 'bg-ink text-paper border-2 border-oro',
  enterprise: 'bg-paper text-ink',
}

export function PricingCard({ nome, prezzo, descrizione, features, cta, ctaLink, variant, highlighted = false }: PricingCardProps) {
  return (
    <Card className={cn('flex flex-col h-full p-8 md:p-10', VARIANT_STYLES[variant], highlighted ? 'ring-2 ring-primary' : '')}>
      <CardHeader>
        <CardTitle className="text-[clamp(2rem,5vw,3.5rem)] font-serif">{nome}</CardTitle>
        <p className="mt-4 max-w-[26ch] text-lead">{descrizione}</p>
      </CardHeader>

      <CardContent className="flex-1">
        <p className="max-w-[38ch] text-body opacity-80">
          {features.map((f, i) => (
            <p key={i} className="mt-2 flex items-center gap-2 text-sm">
              <Check className="w-4 h-4 text-semantic-verde" />
              {f}
            </p>
          ))}
        </p>
      </CardContent>

      <CardFooter>
        <div className="flex flex-wrap items-end justify-between gap-6 mt-10">
          <p className="num display text-[clamp(3rem,10vw,7rem)] leading-none">
            {prezzo}
            <span className="ml-2 font-sans text-lead font-medium tracking-normal">€/mese</span>
          </p>
          <Link to={ctaLink} className={`btn ${variant === 'free' || variant === 'enterprise' ? 'btn-ghost' : 'btn-ink'}`}>
            {cta}
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
```

## Variazioni piani

| Piano | Sfondo | Testo | CTA | Prezzo |
|-------|--------|-------|-----|--------|
| Free | carta (#f1f1ec) | inchiostro (#0b0c0b) | btn-ghost | 0 € |
| Basic | inchiostro (#0a0a0a) | carta (#fafafa) | btn-ink | 29 €/mese |
| Pro | inchiostro (#0a0a0a) | carta (#fafafa) | btn-ink | 79 €/mese |
| Enterprise | carta (#f1f1ec) | inchiostro (#0b0c0b) | btn-ghost | Su misura |

## Note di animazione
- Hover card: `border-primary/50` (150ms).
- Piano highlighted: `ring-2 ring-primary`.
- Nessuna animazione sul prezzo (deve essere leggibile subito).

## Do & Don't
- ✅ Prezzo sempre grande, leggibile, con "€/mese" piccolo accanto.
- ✅ Feature con icona check verde.
- ✅ CTA allineato a destra, sempre visibile.
- ❌ Nessun prezzo nascosto o "contattaci per prezzo" su Free/Basic/Pro.
- ❌ Nessun gradiente viola/azzurro.
