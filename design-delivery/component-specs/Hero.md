# Component Spec — Hero

**File sorgente:** `frontend/src/components/landing/Hero.tsx`
**Destinazione d'uso:** homepage sezione principale.

## Descrizione narrativa
Prima schermata della landing. Sfondo carta calda (light) o inchiostro (dark). Titolo serif grande maiuscolo, sottotitolo, due CTA (primario verde foresta, secondario ghost), grande semaforo VERDE animato a destra con effetto ignite. Il semaforo celebra la metafora centrale del prodotto.

## Struttura componenti
- `section` con `min-h-[100svh]`, padding variabile
- `h1` serif, `display` size
- `p` lead size
- 2 bottoni: `btn-ink` (verde foresta) e `btn-ghost`
- `CreditScoreGauge` con status VERDE, size xl, ignite

## Pseudo-codice React + Tailwind

```tsx
import * as React from 'react'
import { Link } from 'react-router-dom'
import { CreditScoreGauge } from '@/components/ui/CreditScoreGauge'

export function Hero() {
  return (
    <section
      className="relative flex min-h-[100svh] flex-col justify-between bg-paper text-ink"
      style={{
        paddingInline: 'var(--gutter)',
        paddingTop: '6.5rem',
        paddingBottom: '2rem',
      }}
    >
      <h1 className="display mt-[8vh] text-display uppercase">
        Il semaforo<br /> del credito.
      </h1>

      <div className="mt-10 grid grid-cols-1 items-end gap-8 md:mt-0 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-6">
          <p className="text-lead max-w-[34ch]">
            Cerved, Cribis e Credit Safe interrogati in parallelo su una partita IVA. In trenta
            secondi sai se puoi firmare, e cosa chiedere se non puoi.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Link to="/register" className="btn btn-ink">
              Verifica un'azienda — 5 check gratis
            </Link>
            <Link to="/prezzi" className="btn btn-ghost">
              Vedi i prezzi
            </Link>
          </div>
        </div>

        <div className="flex items-end justify-between gap-6 md:col-span-6 md:justify-end">
          <p className="text-small md:text-right">
            Cinque verifiche al mese senza carta.<br />
            Poi da 29 € al mese.
          </p>
          <CreditScoreGauge status="VERDE" label="Affidabile" size="xl" ignite />
        </div>
      </div>
    </section>
  )
}
```

## Note di animazione
- `CreditScoreGauge` con `ignite`: 420ms, delay 320ms, `cubic-bezier(0.2, 0.7, 0.3, 1)`.
- Testo hero: entra con `fade-in` 500ms.
- Nessuna animazione sul video di sfondo (rimosso a favore di stabilità e leggibilità).

## Do & Don't
- ✅ Semaforo VERDE grande a destra, etichetta "Affidabile" sotto.
- ✅ CTA primario sempre verde foresta.
- ✅ Testo in italiano semplice, zero gergo.
- ❌ Nessun video di sfondo distrattivo (il precedente HeroVideo creava problemi di leggibilità e autoplay).
- ❌ Nessun colore viola/azzurro fintech generico.
