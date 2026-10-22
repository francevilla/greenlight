import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

type Tono = 'ink' | 'paper'

/**
 * Barra fissa che prende l'inchiostro del capitolo che ha sotto.
 * È l'unico movimento "di pagina" della landing: il colore cambia
 * esattamente sui bordi dei campi, mai a metà di un paragrafo.
 */
export function SiteHeader() {
  const [tono, setTono] = useState<Tono>('ink')
  const headerRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    let raf = 0

    const leggi = () => {
      raf = 0
      const nodi = document.elementsFromPoint(window.innerWidth / 2, 64)
      for (const nodo of nodi) {
        if (headerRef.current?.contains(nodo)) continue
        const campo = (nodo as HTMLElement).closest('[data-tone]')
        const valore = campo?.getAttribute('data-tone')
        if (valore === 'ink' || valore === 'paper') {
          setTono(valore)
          return
        }
      }
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(leggi)
    }

    leggi()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  const testo = tono === 'ink' ? 'text-ink' : 'text-paper'

  return (
    <header
      ref={headerRef}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${testo}`}
      style={{ paddingInline: 'var(--gutter)' }}
    >
      <div className="flex h-16 items-center justify-between gap-6">
        <Link to="/" className="headline text-[1.35rem] leading-none tracking-[-0.04em]">
          Greenlight
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="Sezioni">
          <a href="#prova" className="text-small font-medium link-underline hover:underline">
            Prova
          </a>
          <a href="#come-funziona" className="text-small font-medium link-underline hover:underline">
            Come funziona
          </a>
          <a href="#prezzi" className="text-small font-medium link-underline hover:underline">
            Prezzi
          </a>
          <a href="#domande" className="text-small font-medium link-underline hover:underline">
            Domande
          </a>
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/login" className="text-small font-medium link-underline hover:underline">
            Accedi
          </Link>
          <Link
            to="/register"
            className="hidden text-small font-semibold link-underline hover:underline sm:inline"
          >
            Inizia gratis
          </Link>
        </div>
      </div>
    </header>
  )
}
