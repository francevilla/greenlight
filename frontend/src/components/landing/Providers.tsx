import { Semaforo } from './Semaforo'
import type { Segnale } from '@/lib/demo'

const FONTI: Array<{ nome: string; cosa: string; score: number; stato: Segnale }> = [
  { nome: 'Cerved', cosa: 'Bilanci depositati, assetti societari, procedure', score: 84.2, stato: 'VERDE' },
  { nome: 'Cribis', cosa: 'Esperienze di pagamento reali fra imprese', score: 71.8, stato: 'GIALLO' },
  { nome: 'Credit Safe', cosa: 'Protesti, pregiudizievoli, rischio internazionale', score: 86.5, stato: 'VERDE' },
]

export function Providers() {
  return (
    <section data-tone="ink" className="chapter chapter-full bg-paper text-ink">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <h2 className="headline text-head">
            Tre fonti.
            <br />
            Un solo verdetto.
          </h2>
          <p className="mt-5 max-w-[40ch] text-body">
            Gli schedari non dicono sempre la stessa cosa: Cribis pesa le esperienze di pagamento,
            Credit Safe i protesti, Cerved i bilanci. Scegli la fonte per ogni verifica, oppure
            confrontale sullo stesso soggetto.
          </p>
          <p className="mt-4 max-w-[40ch] text-body text-ink/70">
            Quando le fonti divergono, la divergenza è un’informazione: ti diciamo di quanto, non la
            nascondiamo in una media.
          </p>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <div className="bg-ink p-5 text-paper md:p-7" data-ui="confronto-provider">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-small font-semibold">Una azienda, tre fonti</p>
              <p className="num text-small opacity-60">scarto 14,7</p>
            </div>

            <p className="headline mt-5 text-[1.3rem] leading-tight">
              Officina Meccanica Bellini S.r.l.
            </p>
            <p className="num text-small opacity-70">01234567890 · Bologna</p>

            <ul className="mt-6 space-y-5">
              {FONTI.map((f) => (
                <li key={f.nome} className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-body font-semibold">{f.nome}</p>
                    <p className="text-small opacity-65">{f.cosa}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-4">
                    <span className="num text-body font-semibold">{f.score.toFixed(1)}</span>
                    <Semaforo stato={f.stato} size="sm" />
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-7 flex items-center justify-between gap-4 bg-paper/[0.07] px-4 py-3">
              <p className="text-small opacity-70">Verdetto Greenlight</p>
              <p className="num flex items-center gap-3 text-small font-semibold">
                80,8 <span className="opacity-60">Giallo · chiedi garanzie</span>
              </p>
            </div>
          </div>
          <p className="mt-3 text-small text-ink/60">
            Esempio su dati di esempio. Il verdetto combina le fonti disponibili per quel soggetto.
          </p>
        </div>
      </div>
    </section>
  )
}
