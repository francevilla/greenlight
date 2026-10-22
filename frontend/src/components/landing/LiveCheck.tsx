import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ESEMPI_DEMO,
  STATO_NOME,
  SOGLIE,
  verificaDemo,
  type EsitoVerifica,
} from '@/lib/demo'
import { Semaforo } from './Semaforo'

type Fase = 'idle' | 'interroga' | 'esito'

/**
 * La cosa viva della pagina: si incolla una partita IVA e il semaforo
 * si accende. I dati sono di esempio e la pagina lo dice, in chiaro.
 */
export function LiveCheck() {
  const [piva, setPiva] = useState('')
  const [fase, setFase] = useState<Fase>('idle')
  const [esito, setEsito] = useState<EsitoVerifica | null>(null)
  const [fonti, setFonti] = useState(0)
  const timer = useRef<number[]>([])

  const pulisci = useCallback(() => {
    timer.current.forEach((t) => window.clearTimeout(t))
    timer.current = []
  }, [])

  useEffect(() => pulisci, [pulisci])

  const ridotto = useMemo(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches,
    [],
  )

  const esegui = (valore: string) => {
    const cifre = valore.replace(/\D/g, '').slice(0, 11)
    if (cifre.length < 11) return
    pulisci()
    setFase('interroga')
    setFonti(0)
    setEsito(null)

    const passo = ridotto ? 0 : 260
    const risultato = verificaDemo(cifre)

    timer.current.push(
      window.setTimeout(() => setFonti(1), passo),
      window.setTimeout(() => setFonti(2), passo * 2),
      window.setTimeout(() => setFonti(3), passo * 3),
      window.setTimeout(
        () => {
          setEsito(risultato)
          setFase('esito')
        },
        passo * 3 + (ridotto ? 0 : 380),
      ),
    )
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    esegui(piva)
  }

  const usaEsempio = (valore: string) => {
    setPiva(valore)
    esegui(valore)
  }

  return (
    <section
      id="prova"
      data-tone="ink"
      className="chapter chapter-full bg-paper text-ink"
    >
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-6">
        <div className="md:col-span-5">
          <h2 className="headline text-head">Provaci con una partita IVA.</h2>
          <p className="mt-5 max-w-[40ch] text-body">
            Demo con dati di esempio: nessuna azienda reale viene interrogata, nessuna visura
            viene addebitata.
          </p>

          <form onSubmit={onSubmit} className="mt-8">
            <label htmlFor="piva" className="text-small font-semibold">
              Partita IVA (11 cifre)
            </label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                id="piva"
                name="piva"
                inputMode="numeric"
                autoComplete="off"
                placeholder="01234567890"
                value={piva}
                onChange={(e) => setPiva(e.target.value.replace(/\D/g, '').slice(0, 11))}
                className="num h-[52px] w-full min-w-0 border-2 border-ink bg-transparent px-4 text-body font-medium placeholder:text-ink/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                style={{ borderRadius: 2 }}
                aria-describedby="piva-aiuto"
              />
              <button
                type="submit"
                className="btn btn-ink shrink-0"
                disabled={piva.replace(/\D/g, '').length < 11}
                style={{ opacity: piva.replace(/\D/g, '').length < 11 ? 0.45 : 1 }}
              >
                Verifica
              </button>
            </div>
            <p id="piva-aiuto" className="mt-3 text-small">
              Oppure prova con:{' '}
              {ESEMPI_DEMO.map((e, i) => (
                <span key={e.partitaIva}>
                  {i > 0 && ' · '}
                  <button
                    type="button"
                    onClick={() => usaEsempio(e.partitaIva)}
                    className="num font-semibold underline decoration-2 underline-offset-4 hover:no-underline"
                  >
                    {e.partitaIva}
                  </button>
                </span>
              ))}
            </p>
          </form>
        </div>

        <div className="md:col-span-6 md:col-start-7">
          <PannelloEsito fase={fase} esito={esito} fonti={fonti} />
        </div>
      </div>
    </section>
  )
}

function PannelloEsito({
  fase,
  esito,
  fonti,
}: {
  fase: Fase
  esito: EsitoVerifica | null
  fonti: number
}) {
  const verdetto = esito ? SOGLIE[esito.stato] : SOGLIE.VERDE

  return (
    <div className="ui ui-ink p-5 md:p-7" data-ui="esito-verifica">
      <div className="flex items-center justify-between gap-4">
        <p className="text-small font-semibold">Esito verifica</p>
        <p className="num text-small opacity-60">
          {esito ? `${esito.provider.length} fonti · 00:${fase === 'esito' ? '31' : '00'}` : '3 fonti'}
        </p>
      </div>

      <div className="mt-6 flex items-start justify-between gap-5">
        <div className="min-w-0">
          <p className="headline truncate text-[1.35rem] leading-tight">
            {esito ? esito.ragioneSociale : 'In attesa di una partita IVA'}
          </p>
          <p className="num mt-1 text-small opacity-70">
            {esito ? `${esito.partitaIva} · ${esito.citta} · ${esito.settore}` : 'Incolla le 11 cifre qui a sinistra'}
          </p>
        </div>
        <Semaforo stato={esito?.stato ?? 'VERDE'} size="lg" />
      </div>

      <ul className="mt-6 space-y-2">
        {['CERVED', 'CRIBIS', 'CREDITSAFE'].map((id, i) => {
          const riga = esito?.provider.find((p) => p.id === id)
          const acceso = fonti > i
          const nome = id === 'CREDITSAFE' ? 'Credit Safe' : id === 'CERVED' ? 'Cerved' : 'Cribis'
          return (
            <li
              key={id}
              className="flex items-center justify-between gap-4 border-b border-paper/15 pb-2 text-small"
              style={{ opacity: acceso ? 1 : 0.35, transition: 'opacity 240ms ease' }}
            >
              <span className="font-medium">{nome}</span>
              {riga && acceso ? (
                <span className="num flex items-center gap-3">
                  <span>{riga.score.toFixed(1)}</span>
                  <span className="font-semibold">{STATO_NOME[riga.stato]}</span>
                </span>
              ) : (
                <span className="num opacity-60">{fase === 'interroga' ? 'in corso…' : '—'}</span>
              )}
            </li>
          )
        })}
      </ul>

      <div
        className="mt-6 p-4"
        style={{
          color: 'var(--ink)',
          borderRadius: 2,
          backgroundColor: esito ? `var(--${esito.stato.toLowerCase()})` : 'rgba(241,241,236,0.06)',
          outlineOffset: '-2px',
        }}
      >
        {esito ? (
          <>
            <p className="flex flex-wrap items-baseline gap-x-3">
              <span className="headline text-[1.6rem] leading-none">
                {STATO_NOME[esito.stato]}
              </span>
              <span className="num text-small font-semibold">
                score {esito.score} · {verdetto.lettura}
              </span>
            </p>
            <p className="mt-2 max-w-[44ch] text-small font-medium">{verdetto.azione}</p>
          </>
        ) : (
          <p className="text-small opacity-60">
            Il verdetto compare qui: un colore, un punteggio, la decisione che ne segue.
          </p>
        )}
      </div>

      <p className="mt-4 text-[0.75rem] leading-snug opacity-60">
        {esito ? esito.fonte : 'Demo: dati di esempio, nessuna azienda reale.'}
      </p>
    </div>
  )
}
