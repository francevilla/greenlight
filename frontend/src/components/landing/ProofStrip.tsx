import { Link } from 'react-router-dom'

/**
 * Fascia di proof onesta: nessun numero inventato, nessun logo cliente finto.
 * Le uniche prove verificabili oggi sono i tre provider di dati.
 */
export function ProofStrip() {
  return (
    <section
      id="proof"
      data-tone="paper"
      className="chapter bg-paper text-ink border-y border-border/20"
    >
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-6 items-center">
        <div className="md:col-span-5">
          <p className="text-small font-semibold uppercase tracking-wider text-ink/60">
            Dati da fonti reali
          </p>
          <h3 className="headline text-head">Cerved, Cribis e Credit Safe.</h3>
          <p className="mt-4 max-w-[44ch] text-body text-ink/80">
            Interroghiamo gli stessi provider dei report professionali. Tu leggi il
            semaforo e decidi in 30 secondi, senza abbonamento obbligatorio.
          </p>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {['Cerved', 'Cribis', 'Credit Safe'].map((nome) => (
              <div
                key={nome}
                className="flex items-center gap-3 rounded border border-ink/20 bg-ink/5 p-4"
              >
                <span className="num font-semibold text-ink">{nome}</span>
                <span className="ml-auto text-[0.75rem] font-medium text-ink/40 uppercase tracking-wider">
                  Fonte
                </span>
              </div>
            ))}
          </div>
          <Link
            to="/legali#privacy"
            className="mt-6 inline-block text-[0.8rem] font-medium underline decoration-1 underline-offset-4 text-ink/60 hover:text-ink"
          >
            Privacy e trattamento dati →
          </Link>
        </div>
      </div>
    </section>
  )
}
