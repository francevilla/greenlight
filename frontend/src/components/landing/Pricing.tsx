import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { trackFunnel } from '@/lib/analytics'

/**
 * Tabella confronto piani. Una riga per piano, una colonna per attributo.
 * Il costo a verifica è il numero che un'agenzia confronta davvero.
 */
const RIGHE = [
  {
    chiave: 'A chi serve',
    valori: [
      'Per provare su clienti veri',
      'Per chi firma qualche contratto al mese',
      'Per agenzie che verificano ogni settimana',
      'Per chi verifica ogni giorno, in più sedi',
    ],
  },
  {
    chiave: 'Prezzo',
    valori: ['0 €', '29 €/mese', '79 €/mese', 'Su misura'],
  },
  {
    chiave: 'Verifiche / mese',
    valori: ['5', '50', '200', 'Illimitate'],
  },
  {
    chiave: 'Costo a verifica',
    valori: ['—', '0,58 €', '0,40 €', '—'],
    nota: 'Pro è il più conveniente a verifica.',
  },
  {
    chiave: 'Fonti dati',
    valori: ['Cerved', '3 provider', '3 provider + confronto', 'Provider dedicati'],
  },
  {
    chiave: 'Storico ed export',
    valori: ['30 giorni', 'Senza scadenza', 'Senza scadenza', 'Senza scadenza'],
  },
  {
    chiave: 'Ruoli, API, SLA',
    valori: ['—', '—', 'Ruoli · API · webhook', 'SSO · SLA · account manager'],
  },
]

export function Pricing() {
  useEffect(() => {
    trackFunnel('pricing_view')
  }, [])

  const PIANI = [
    {
      chiave: 'free',
      nome: 'Free',
      prezzo: '0 €',
      cta: 'Inizia con 5 gratis',
      ctaHref: '/register',
      ctaClass: 'btn btn-ink',
      evidenziato: false,
    },
    {
      chiave: 'basic',
      nome: 'Basic',
      prezzo: '29 €/mese',
      cta: 'Scegli Basic',
      ctaHref: '/register',
      ctaClass: 'btn btn-ink',
      evidenziato: false,
    },
    {
      chiave: 'pro',
      nome: 'Pro',
      prezzo: '79 €/mese',
      cta: 'Scegli Pro',
      ctaHref: '/register',
      ctaClass: 'btn btn-paper',
      evidenziato: true,
      badge: 'Il più conveniente a verifica',
    },
    {
      chiave: 'enterprise',
      nome: 'Enterprise',
      prezzo: 'Su misura',
      cta: 'Parla con noi',
      ctaHref: '/legali#contatti',
      ctaClass: 'btn btn-ghost',
      evidenziato: false,
    },
  ]

  return (
    <section id="prezzi" data-tone="ink" className="chapter bg-ink text-paper">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-8">
          <h2 className="display text-[clamp(2rem,6vw,4rem)] uppercase">
            Quanto costa controllare un cliente.
          </h2>
          <p className="mt-4 max-w-[56ch] text-lead text-paper/90">
            Meno di un caffè a verifica. Le prime cinque sono gratis, senza carta. I piani si
            rinnovano mensilmente e si disdicono quando vuoi.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto border border-border/10 bg-paper/[0.03]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border/10">
              <th className="pb-6 text-left text-small font-semibold text-paper/50 uppercase tracking-wider">
                Caratteristica
              </th>
              {PIANI.map((p) => (
                <th
                  key={p.chiave}
                  className="pb-6 pr-6 text-right text-small font-semibold text-paper uppercase tracking-wider"
                >
                  {p.nome}
                  {p.evidenziato && (
                    <span className="ml-2 inline-block mt-1 px-2 py-0.5 rounded text-[0.65rem] font-bold text-ink bg-yellow-300 uppercase">
                      {p.badge}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {RIGHE.map((riga) => (
              <tr key={riga.chiave} className="border-b border-border/10 last:border-0">
                <th
                  className="pb-4 pr-6 text-left text-small font-medium text-paper/80 align-top"
                  scope="row"
                >
                  {riga.chiave}
                </th>
                {riga.valori.map((valore, i) => (
                  <td
                    key={i}
                    className="pb-4 pr-6 text-right align-top"
                    scope="row"
                  >
                    <span className="num text-body">{valore}</span>
                    {riga.nota && i === 3 ? (
                      <span className="block mt-1 text-[0.75rem] text-paper/50 uppercase tracking-wider">
                        {riga.nota}
                      </span>
                    ) : null}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-4 md:gap-4">
        {PIANI.map((p) => (
          <article
            key={p.chiave}
            className={`p-6 rounded border ${
              p.evidenziato
                ? 'border-verde bg-[rgba(23,178,106,0.06)] text-paper'
                : 'border-border/10 bg-paper/[0.03] text-paper'
            }`}
          >
            <h3 className="mb-2 text-head">{p.nome}</h3>
            <p className="mb-4 num text-[clamp(2.25rem,5vw,4rem)] leading-none font-bold text-paper">
              {p.prezzo}
            </p>
            <Link to={p.ctaHref} className={`${p.ctaClass} w-full`}>
              {p.cta}
            </Link>
          </article>
        ))}
      </div>

      <p className="mt-6 max-w-[56ch] text-[0.875rem] text-paper/50">
        Prezzi IVA esclusa · Fattura elettronica · Addebito mensile · Disdici quando vuoi ·
        Nessuna carta richiesta per il piano Free.
      </p>
    </section>
  )
}
