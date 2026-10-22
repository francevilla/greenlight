import { SOGLIE, STATO_NOME, type Segnale } from '@/lib/demo'

const CAPITOLI: Array<{
  stato: Segnale
  fondo: string
  cosa: string
  esempio: { azienda: string; score: number }
}> = [
  {
    stato: 'VERDE',
    fondo: 'var(--verde)',
    cosa: 'Segnale pulito: le tre fonti concordano e non ci sono protesti aperti.',
    esempio: { azienda: 'Officina Meccanica Bellini S.r.l.', score: 87 },
  },
  {
    stato: 'GIALLO',
    fondo: 'var(--giallo)',
    cosa: 'Qualcosa non torna: ritardi di pagamento ricorrenti o bilanci in calo.',
    esempio: { azienda: 'Atelier Grafico Ferrante S.n.c.', score: 66 },
  },
  {
    stato: 'ARANCIONE',
    fondo: 'var(--arancio)',
    cosa: 'Il rischio è concreto: esposizione da tenere sotto controllo mese per mese.',
    esempio: { azienda: 'Costruzioni Delta S.p.A.', score: 41 },
  },
  {
    stato: 'ROSSO',
    fondo: 'var(--rosso)',
    cosa: 'Non insistere: senza garanzie, ogni euro anticipato è un euro a rischio.',
    esempio: { azienda: 'Emporio Veneto Distribuzione S.r.l.', score: 22 },
  },
]

export function States() {
  return (
    <section id="stati" aria-label="I quattro stati del semaforo">
      {CAPITOLI.map((c, i) => {
        const soglia = SOGLIE[c.stato]
        return (
          <article
            key={c.stato}
            data-tone="ink"
            className="chapter flex flex-col justify-center text-ink"
            style={{
              backgroundColor: c.fondo,
              minHeight: i === 0 ? '86svh' : '62svh',
            }}
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6">
              <div className={i === 0 ? 'md:col-span-6' : 'md:col-span-7'}>
                {i === 0 && (
                  <p className="mb-6 text-small font-semibold">Quattro stati, quattro decisioni</p>
                )}
                <h2 className="display text-[clamp(2.75rem,9vw,7.5rem)] uppercase">
                  {STATO_NOME[c.stato]}
                </h2>
                <p className="num mt-4 text-lead font-medium">
                  score {soglia.min}–{soglia.max} · {soglia.lettura}
                </p>
              </div>

              <div className="md:col-span-5 md:col-start-8 md:self-end">
                <p className="max-w-[42ch] text-body font-medium">{c.cosa}</p>
                <p className="mt-3 max-w-[42ch] text-lead">{soglia.azione}</p>

                {i === 0 ? (
                  <div className="mt-8 bg-ink p-4 text-paper" data-ui="esempio-esito">
                    <p className="text-small opacity-60">Esempio</p>
                    <p className="headline mt-1 text-[1.15rem] leading-tight">{c.esempio.azienda}</p>
                    <p className="num mt-1 text-small">
                      score {c.esempio.score} · Cerved, Cribis e Credit Safe concordi
                    </p>
                  </div>
                ) : (
                  <p className="num mt-6 text-small font-semibold">
                    Esempio: {c.esempio.azienda} · score {c.esempio.score}
                  </p>
                )}
              </div>
            </div>
          </article>
        )
      })}
    </section>
  )
}
