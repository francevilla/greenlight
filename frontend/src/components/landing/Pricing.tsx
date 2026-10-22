import { Link } from 'react-router-dom'

const PIANI = [
  {
    nome: 'Basic',
    per: 'Per chi verifica qualche cliente al mese e vuole la risposta subito.',
    prezzo: '29',
    incluso:
      'Cinquanta verifiche al mese su tutti e tre i provider, dashboard completa, storico senza scadenza, export CSV e PDF.',
    fondo: 'var(--paper)',
    testo: 'var(--ink)',
    tono: 'ink',
    bottone: 'btn-ink',
  },
  {
    nome: 'Pro',
    per: 'Per agenzie e studi che verificano ogni settimana e lavorano in più persone.',
    prezzo: '79',
    incluso:
      'Duecento verifiche al mese, confronto fra provider sullo stesso soggetto, ruoli e permessi, API con mille richieste, webhook.',
    fondo: 'var(--ink)',
    testo: 'var(--paper)',
    tono: 'paper',
    bottone: 'btn-paper',
  },
]

export function Pricing() {
  return (
    <section id="prezzi" aria-label="Prezzi" className="bg-ink">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {PIANI.map((p, i) => (
          <article
            key={p.nome}
            data-tone={p.tono}
            className={`flex min-h-[80svh] flex-col justify-between p-8 md:p-10 ${
              i === 0 ? 'md:col-span-5' : 'md:col-span-7'
            }`}
            style={{ backgroundColor: p.fondo, color: p.testo }}
          >
            <div>
              <h2 className="display text-[clamp(2rem,5vw,3.5rem)]">{p.nome}</h2>
              <p className="mt-4 max-w-[26ch] text-lead">{p.per}</p>
            </div>

            <div className="mt-10">
              <p className="max-w-[38ch] text-body opacity-80">{p.incluso}</p>
            </div>

            <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
              <p className="num display text-[clamp(3rem,10vw,7rem)] leading-none">
                {p.prezzo}
                <span className="ml-2 font-sans text-lead font-medium tracking-normal">€/mese</span>
              </p>
              <Link to="/register" className={`btn ${p.bottone}`}>
                Inizia gratis
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12">
        <div data-tone="ink" className="bg-paper p-8 text-ink md:col-span-4 md:p-10">
          <h3 className="headline text-[1.5rem]">Free</h3>
          <p className="num mt-2 text-lead font-medium">0 €</p>
          <p className="mt-3 max-w-[32ch] text-body">
            Cinque verifiche al mese su Cerved, per provare il semaforo su casi veri.
          </p>
        </div>

        <div data-tone="ink" className="bg-paper p-8 text-ink md:col-span-4 md:p-10">
          <h3 className="headline text-[1.5rem]">Enterprise</h3>
          <p className="mt-2 text-lead font-medium">Su misura</p>
          <p className="mt-3 max-w-[32ch] text-body">
            Verifiche illimitate, provider dedicati, SSO, SLA e account manager.
          </p>
        </div>

        <div data-tone="paper" className="bg-ink p-8 text-paper md:col-span-4 md:p-10">
          <h3 className="headline text-[1.5rem]">Come si paga</h3>
          <p className="mt-3 max-w-[34ch] text-body text-paper/75">
            Fattura elettronica, addebito mensile, disdetta quando vuoi. Nessuna carta richiesta per
            il piano Free.
          </p>
          <Link to="/register" className="mt-5 inline-block text-small font-semibold underline decoration-2 underline-offset-4">
            Apri un account
          </Link>
        </div>
      </div>
    </section>
  )
}
