/**
 * Greenlight — Eventistica funnel minimale e privacy-friendly.
 *
 * Nessuno script di terze parti, nessun cookie, nessun invio a server esterni.
 * Gli eventi vengono esposti tramite window.dispatchEvent (CustomEvent)
 * così possono essere raccolti da un listener proprietario (es. Matomo
 * self-hostato, Plausible, o un endpoint /api/analytics) senza dipendere
 * da provider terzi.
 *
 * Eventi minimi consigliati:
 *   hero_cta_click, demo_start, demo_complete,
 *   register_start, register_complete, first_check_complete, pricing_view
 */

type FunnelEventName =
  | 'hero_cta_click'
  | 'demo_start'
  | 'demo_complete'
  | 'register_start'
  | 'register_complete'
  | 'first_check_complete'
  | 'pricing_view'

interface FunnelEventDetail {
  name: FunnelEventName
  properties?: Record<string, string | number | boolean>
  timestamp: number
}

const EVENT_NAME = 'gl:funnel'

/**
 * Emette un evento di funnel. Ascoltabile con:
 *   window.addEventListener('gl:funnel', (e) => console.log(e.detail))
 */
export function trackFunnel(
  name: FunnelEventName,
  properties?: Record<string, string | number | boolean>,
) {
  const detail: FunnelEventDetail = {
    name,
    properties,
    timestamp: Date.now(),
  }

  // Log in sviluppo per debug immediato senza strumentazione esterna.
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log('[funnel]', detail)
  }

  window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail }))
}

export type { FunnelEventName, FunnelEventDetail }
