/**
 * Dati della demo pubblica.
 *
 * Le aziende sono inventate e dichiarate come tali nella pagina: nessuna
 * azienda reale viene interrogata. Il risultato è deterministico rispetto
 * alla partita IVA, così la stessa P.IVA dà sempre lo stesso semaforo.
 */

export type Segnale = 'VERDE' | 'GIALLO' | 'ARANCIONE' | 'ROSSO'
export type ProviderId = 'CERVED' | 'CRIBIS' | 'CREDITSAFE'

export interface ProviderEsito {
  id: ProviderId
  nome: string
  score: number
  stato: Segnale
}

export interface EsitoVerifica {
  ragioneSociale: string
  partitaIva: string
  citta: string
  settore: string
  stato: Segnale
  score: number
  provider: ProviderEsito[]
  fonte: string
}

export const SOGLIE: Record<Segnale, { min: number; max: number; azione: string; lettura: string }> = {
  VERDE: {
    min: 80,
    max: 100,
    lettura: 'Affidabile',
    azione: 'Firma. Nessuna garanzia aggiuntiva: procedi con il contratto standard.',
  },
  GIALLO: {
    min: 55,
    max: 79,
    lettura: 'Attenzione',
    azione: 'Chiedi garanzie: anticipo o fideiussione, pagamenti a 30 giorni, ordine minimo.',
  },
  ARANCIONE: {
    min: 30,
    max: 54,
    lettura: 'Rischio medio',
    azione: 'Riduci l’esposizione: spezza il lavoro in tranche e monitora ogni 30 giorni.',
  },
  ROSSO: {
    min: 0,
    max: 29,
    lettura: 'Alto rischio',
    azione: 'Fermati: nessuna apertura senza pagamento anticipato o garanzia bancaria.',
  },
}

const AZIENDE = [
  {
    ragioneSociale: 'Officina Meccanica Bellini S.r.l.',
    partitaIva: '01234567890',
    citta: 'Bologna',
    settore: 'Metalmeccanica',
    base: 87,
    fonte: 'Cerved: bilanci 2023–2024 · Cribis: esperienze di pagamento · Credit Safe: protesti',
  },
  {
    ragioneSociale: 'Atelier Grafico Ferrante S.n.c.',
    partitaIva: '09876543210',
    citta: 'Ferrara',
    settore: 'Comunicazione',
    base: 66,
    fonte: 'Cerved: bilanci 2024 · Cribis: ritardi medi 12 giorni · Credit Safe: nessun protesto',
  },
  {
    ragioneSociale: 'Costruzioni Delta S.p.A.',
    partitaIva: '05566778899',
    citta: 'Modena',
    settore: 'Costruzioni',
    base: 41,
    fonte: 'Cerved: bilanci 2023 · Cribis: ritardi medi 48 giorni · Credit Safe: un protesto',
  },
  {
    ragioneSociale: 'Emporio Veneto Distribuzione S.r.l.',
    partitaIva: '03344556677',
    citta: 'Padova',
    settore: 'Distribuzione',
    base: 22,
    fonte: 'Cerved: patrimonio netto negativo · Cribis: ritardi 90+ giorni · Credit Safe: due protesti',
  },
]

export const ESEMPI_DEMO = AZIENDE.slice(0, 3).map((a) => ({
  partitaIva: a.partitaIva,
  ragioneSociale: a.ragioneSociale,
}))

/** Somma stabile delle cifre: nessuna casualità, stesso input stesso esito. */
function impronta(digits: string): number {
  let h = 0
  for (let i = 0; i < digits.length; i++) {
    h = (h * 31 + digits.charCodeAt(i) * (i + 7)) % 9973
  }
  return h
}

export function statoDaScore(score: number): Segnale {
  if (score >= 80) return 'VERDE'
  if (score >= 55) return 'GIALLO'
  if (score >= 30) return 'ARANCIONE'
  return 'ROSSO'
}

const PROVIDER: Array<{ id: ProviderId; nome: string; scarto: number }> = [
  { id: 'CERVED', nome: 'Cerved', scarto: 2 },
  { id: 'CRIBIS', nome: 'Cribis', scarto: -5 },
  { id: 'CREDITSAFE', nome: 'Credit Safe', scarto: 4 },
]

function componi(
  azienda: { ragioneSociale: string; partitaIva: string; citta: string; settore: string; fonte: string },
  scoreBase: number,
  saldo: number,
): EsitoVerifica {
  const provider = PROVIDER.map((p, i) => {
    // Ogni fonte vede una sfumatura diversa: è il senso del multi-provider.
    const variazione = p.scarto + ((saldo >> (i * 2)) % 5) - 2
    const score = Math.max(4, Math.min(98, Math.round(scoreBase + variazione)))
    return { id: p.id, nome: p.nome, score, stato: statoDaScore(score) }
  })

  const media = Math.round(provider.reduce((s, p) => s + p.score, 0) / provider.length)
  return {
    ragioneSociale: azienda.ragioneSociale,
    partitaIva: azienda.partitaIva,
    citta: azienda.citta,
    settore: azienda.settore,
    stato: statoDaScore(media),
    score: media,
    provider,
    fonte: azienda.fonte,
  }
}

export function verificaDemo(partitaIva: string): EsitoVerifica {
  const digits = partitaIva.replace(/\D/g, '').slice(0, 11)
  const nota = AZIENDE.find((a) => a.partitaIva === digits)

  if (nota) {
    return componi(nota, nota.base, impronta(digits))
  }

  const saldo = impronta(digits || '00000000000')
  const scoreBase = 10 + (saldo % 86)
  return componi(
    {
      ragioneSociale: 'Azienda di esempio S.r.l.',
      partitaIva: digits || '00000000000',
      citta: 'Italia',
      settore: 'Attività non specificata',
      fonte: 'Dati di esempio generati per la demo: nessuna azienda reale interrogata.',
    },
    scoreBase,
    saldo,
  )
}

export const STATO_NOME: Record<Segnale, string> = {
  VERDE: 'Verde',
  GIALLO: 'Giallo',
  ARANCIONE: 'Arancione',
  ROSSO: 'Rosso',
}
