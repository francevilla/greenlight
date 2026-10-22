import { Link } from 'react-router-dom'
import { Semaforo } from './Semaforo'

/**
 * Primo campo: verde. Il nome è verde, il prodotto è un verde,
 * quindi la prima schermata è il via libera.
 *
 * Composizione: una dichiarazione a tutta larghezza (il poster), poi
 * in basso la frase di supporto a sinistra e il semaforo a destra.
 */
export function Hero() {
  return (
    <section
      data-tone="ink"
      className="relative flex min-h-[100svh] flex-col justify-between bg-verde text-ink"
      style={{ paddingInline: 'var(--gutter)', paddingTop: '6.5rem', paddingBottom: '2rem' }}
    >
      <h1 className="display mt-[8vh] text-display uppercase">
        Il semaforo
        <br />
        del credito.
      </h1>

      <div className="mt-10 grid grid-cols-1 items-end gap-8 md:mt-0 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-6">
          <p className="text-lead max-w-[34ch]">
            Cerved, Cribis e Credit Safe interrogati in parallelo su una partita IVA. In trenta
            secondi sai se puoi firmare, e cosa chiedere se non puoi.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a href="#prova" className="btn btn-ink">
              Verifica un’azienda
            </a>
            <Link to="/register" className="btn btn-ghost">
              Inizia gratis
            </Link>
          </div>
        </div>

        <div className="flex items-end justify-between gap-6 md:col-span-6 md:justify-end">
          <p className="text-small md:text-right">
            Cinque verifiche al mese senza carta.
            <br />
            Poi da 29 € al mese.
          </p>
          <Semaforo stato="VERDE" size="xl" ignite />
        </div>
      </div>
    </section>
  )
}
