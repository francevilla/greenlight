const PASSI = [
  {
    titolo: 'Inserisci la partita IVA.',
    testo:
      'Bastano ragione sociale e partita IVA. Nessun upload, nessuna visura da cercare prima.',
  },
  {
    titolo: 'Interroghiamo i tre provider.',
    testo:
      'Cerved, Cribis e Credit Safe rispondono separatamente: vedi dove sono d’accordo e dove no.',
  },
  {
    titolo: 'Leggi il semaforo.',
    testo:
      'Un colore, un punteggio, e la decisione che ne segue. L’esito resta nello storico ed è esportabile.',
  },
]

export function HowItWorks() {
  return (
    <section
      id="come-funziona"
      data-tone="paper"
      className="chapter bg-ink text-paper"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-4">
          <h2 className="headline text-head">
            Tre passi
            <br />
            e una firma.
          </h2>
        </div>

        <ol className="md:col-span-7 md:col-start-6">
          {PASSI.map((p, i) => (
            <li
              key={p.titolo}
              className="py-6 first:pt-0 last:pb-0 md:py-8"
            >
              <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-6">
                <p className="headline text-[1.5rem] leading-tight md:col-span-5">{p.titolo}</p>
                <p className="text-body text-paper/75 md:col-span-7">{p.testo}</p>
              </div>
              {i === 2 && (
                <div className="mt-6 bg-paper/[0.07] p-4" data-ui="storico-verifiche">
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-small font-semibold">Storico</p>
                    <p className="num text-small opacity-60">ultime tre</p>
                  </div>
                  <ul className="mt-3 space-y-2">
                    {[
                      { a: 'Officina Meccanica Bellini S.r.l.', d: '12 mar', s: '87', c: 'var(--verde)' },
                      { a: 'Atelier Grafico Ferrante S.n.c.', d: '09 mar', s: '66', c: 'var(--giallo)' },
                      { a: 'Costruzioni Delta S.p.A.', d: '04 mar', s: '41', c: 'var(--arancio)' },
                    ].map((r) => (
                      <li key={r.a} className="flex items-center justify-between gap-3 text-small">
                        <span className="truncate">{r.a}</span>
                        <span className="num flex shrink-0 items-center gap-2.5">
                          <span className="opacity-60">{r.d}</span>
                          <span className="font-semibold">{r.s}</span>
                          <span
                            aria-hidden="true"
                            style={{ background: r.c, width: 9, height: 9, borderRadius: '50%' }}
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <span className="sr-only">Passo {i + 1}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
