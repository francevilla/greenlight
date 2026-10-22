const DOMANDE = [
  {
    q: 'Da dove vengono i dati?',
    a: 'Dai tre provider di informazioni commerciali: Cerved, Cribis e Credit Safe, interrogati via API. Greenlight non produce punteggi propri: aggrega le loro risposte e le traduce in un semaforo.',
  },
  {
    q: 'Che dati conservate dei miei clienti?',
    a: 'La ragione sociale, la partita IVA e il codice fiscale che inserisci, più l’esito della verifica. Nient’altro: non carichi documenti, non alleghi visure.',
  },
  {
    q: 'Quanto ci vuole per una verifica?',
    a: 'La risposta arriva in pochi secondi quando il provider è raggiungibile. Se una fonte è lenta, vedi le altre due comparire prima e quella mancante arrivare dopo.',
  },
  {
    q: 'Posso lavorare in più persone sullo stesso account?',
    a: 'Dal piano Pro sì: ruoli e permessi separati, con un limite di verifiche condiviso. Su Basic l’account è personale.',
  },
  {
    q: 'Cosa succede se finisco le verifiche del mese?',
    a: 'Il semaforo smette di rispondere fino al rinnovo, senza addebiti a sorpresa. Puoi passare a un piano superiore in qualsiasi momento e le verifiche nuove sono disponibili subito.',
  },
  {
    q: 'Serve la carta di credito per provare?',
    a: 'No. Il piano Free dà cinque verifiche al mese e non chiede dati di pagamento. La carta serve solo se decidi di passare a Basic o Pro.',
  },
  {
    q: 'Il semaforo sostituisce una valutazione legale?',
    a: 'No. È uno strumento di supporto alla decisione commerciale: dice quanto è rischioso aprire un credito, non sostituisce bilanci certificati, garanzie o il parere di un professionista.',
  },
]

export function Faq() {
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
                className="group bg-ink/[0.045] open:bg-verde"
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
