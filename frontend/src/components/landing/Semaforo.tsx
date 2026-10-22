import type { Segnale } from '@/lib/demo'

const LAMPS: Array<{ stato: Segnale; colore: string }> = [
  { stato: 'ROSSO', colore: 'var(--rosso)' },
  { stato: 'ARANCIONE', colore: 'var(--arancio)' },
  { stato: 'GIALLO', colore: 'var(--giallo)' },
  { stato: 'VERDE', colore: 'var(--verde)' },
]

const MISURE = {
  sm: { lamp: 9, gap: 4, pad: 5 },
  md: { lamp: 15, gap: 6, pad: 8 },
  lg: { lamp: 26, gap: 9, pad: 12 },
  xl: { lamp: 54, gap: 14, pad: 20 },
}

/**
 * Il semaforo: quattro lampade, una accesa.
 * Non è un'icona decorativa — è l'uscita del prodotto, quindi si disegna
 * con gli stessi quattro colori che il backend restituisce.
 */
export function Semaforo({
  stato,
  size = 'md',
  ignite = false,
  className = '',
}: {
  stato: Segnale
  size?: keyof typeof MISURE
  ignite?: boolean
  className?: string
}) {
  const m = MISURE[size]
  return (
    <div
      className={`inline-flex flex-col items-center bg-ink ${className}`}
      style={{ padding: m.pad, gap: m.gap, borderRadius: 2 }}
      role="img"
      aria-label={`Semaforo: ${stato.toLowerCase()}`}
    >
      {LAMPS.map((l) => {
        const acceso = l.stato === stato
        return (
          <span
            key={l.stato}
            className={acceso && ignite ? 'ignite' : undefined}
            style={{
              width: m.lamp,
              height: m.lamp,
              borderRadius: '50%',
              backgroundColor: l.colore,
              opacity: acceso ? 1 : 0.16,
              display: 'block',
            }}
          />
        )
      })}
    </div>
  )
}
