import { useEffect } from 'react'

const DOMANDE = [
  {
    q: 'È un altro abbonamento?',
    a: 'No. I primi 5 check al mese sono gratis, senza carta di credito. Paghi solo se superi la soglia Free.',
  },
  {
    q: 'Non so leggere uno score.',
    a: 'Non usiamo score complicati. Usiamo il semaforo: verde = affidabile, giallo = attenzione, rosso = fermati.',
  },
  {
    q: 'Ho già Cerved.',
    a: 'Cerved va bene per le grandi pratiche. Greenlight è per la decisione rapida, prima di firmare un contratto, in 30 secondi.',
  },
  {
    q: 'I dati sono ufficiali?',
    a: 'Interroghiamo Cerved, Cribis e Credit Safe, i principali provider di informazioni commerciali italiani. Stessa fonte, interfaccia umana.',
  },
  {
    q: 'I miei dati e quelli dei miei clienti sono al sicuro?',
    a: 'Conserviamo email, ragione sociale, partita IVA ed esito della verifica. Nessun documento caricato. Dati cifrati in transito e a riposo, server in UE, nessuna vendita a terzi. *(da validare con il legale prima della pubblicazione)*',
  },
  {
    q: 'Cosa succede se finisco le verifiche del mese?',
    a: 'Il semaforo smette di rispondere fino al rinnovo, senza addebiti a sorpresa. Puoi passare a un piano superiore in qualsiasi momento.',
  },
  {
    q: 'Il semaforo sostituisce una valutazione legale?',
    a: 'No. È uno strumento di supporto alla decisione commerciale: non sostituisce bilanci certificati, garanzie o il parere di un professionista.',
  },
]

export function Faq() {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: DOMANDE.map((d) => ({
        '@type': 'Question',
        name: d.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: d.a,
        },
      })),
    })
    document.head.appendChild(script)
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return (
    <section id="domande" data-tone="ink" className="chapter bg-paper text-ink">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-4">
          <h2 className="headline text-head md:sticky md:top-24">
            Domande
            <br />
            prima di firmare.
          </h2>
        </div>

        <div className="md:col-span-7 md:col-start-6">
          <div className="space-y-2">
            {DOMANDE.map((d) => (
              <details
                key={d.q}
                className="group bg-ink/[0.045] open:bg-verde open:text-ink"
                style={{ borderRadius: 2 }}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-5 py-5 text-body font-semibold [&::-webkit-details-marker]:hidden">
                  <span className="max-w-[46ch]">{d.q}</span>
                  <span
                    aria-hidden="true"
                    className="relative block h-4 w-4 shrink-0 before:absolute before:left-0 before:top-1/2 before:h-[3px] before:w-4 before:-translate-y-1/2 before:bg-current after:absolute after:left-1/2 after:top-0 after:h-4 after:w-[3px] after:-translate-x-1/2 after:bg-current group-open:after:hidden"
                  />
                </summary>
                <p className="max-w-[56ch] px-5 pb-5 text-body">{d.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
