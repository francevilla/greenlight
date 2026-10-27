import { SOGLIE, type Segnale } from '@/lib/demo'

const CAPITOLI: Array<{
  stato: Segnale
  fondo: string
  azione: string
  perche: string
  esempio: { azienda: string; score: number }
}> = [
  {
    stato: 'VERDE',
    fondo: 'var(--verde)',
    azione: 'Firmi.',
    perche: 'Procedi con il contratto standard, senza garanzie aggiuntive.',
    esempio: { azienda: 'Officina Meccanica Bellini S.r.l.', score: 87 },
  },
  {
    stato: 'GIALLO',
    fondo: 'var(--giallo)',
    azione: 'Chiedi un acconto.',
    perche: 'Anticipo o fideiussione, pagamenti a 30 giorni.',
    esempio: { azienda: 'Atelier Grafico Ferrante S.n.c.', score: 66 },
  },
  {
    stato: 'ARANCIONE',
    fondo: 'var(--arancio)',
    azione: 'Spezza l’ordine.',
    perche: 'Consegna a tranche, monitoraggio ogni 30 giorni.',
    esempio: { azienda: 'Costruzioni Delta S.p.A.', score: 41 },
  },
  {
    stato: 'ROSSO',
    fondo: 'var(--rosso)',
    azione: 'Non firmi.',
    perche: 'Nessuna apertura senza pagamento anticipato o garanzia bancaria.',
    esempio: { azienda: 'Emporio Veneto Distribuzione S.r.l.', score: 22 },
  },
]

export function States() {
  return (
    <section id="stati" aria-label="I quattro stati del semaforo">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {CAPITOLI.map((c) => {
          const soglia = SOGLIE[c.stato]
          const testoScuro =
            c.stato === 'VERDE' || c.stato === 'ARANCIONE' || c.stato === 'ROSSO'
          return (
            <article
              key={c.stato}
              className="flex flex-col rounded border p-6 min-h-[320px] text-ink"
              style={{
                backgroundColor: c.fondo,
                color: testoScuro ? '#0b0c0b' : '#0b0c0b',
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider opacity-70">
                  {c.stato}
                </span>
                <span className="num text-sm font-medium opacity-80">
                  score {soglia.min}–{soglia.max}
                </span>
              </div>
              <h3 className="mb-3 text-[1.75rem] leading-none font-bold uppercase">{c.azione}</h3>
              <p className="mb-4 text-body leading-relaxed opacity-90">{c.perche}</p>
              <div className="mt-auto pt-6 border-t border-current/20">
                <p className="text-xs font-semibold opacity-60 uppercase">Esempio</p>
                <p className="text-lead font-medium">{c.esempio.azienda}</p>
                <p className="num text-small">{c.esempio.score}</p>
              </div>
            </article>
          )
        })}
      </div>

      <p className="mt-10 max-w-[56ch] text-[0.875rem] text-ink/60 leading-relaxed">
        Il punteggio resta un dato tecnico: lo trovi nel report di ogni verifica. Nella pagina
        principale conta solo la decisione — il colore e cosa fare dopo.
      </p>
    </section>
  )
}
