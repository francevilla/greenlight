import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

/**
 * Barra fissa sempre leggibile: fondo carta, testo inchiostro,
 * bordo inferiore. Su mobile si apre un pannello con le sezioni
 * e la CTA "Inizia gratis" resta sempre visibile.
 */
export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-paper/[0.85] backdrop-blur-md text-ink transition-colors duration-300"
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

        <div className="flex items-center gap-3 md:gap-4">
          <Link to="/login" className="text-small font-medium link-underline hover:underline">
            Accedi
          </Link>
          <Link
            to="/register"
            className="btn btn-ink text-xs md:text-small px-3 py-1.5 min-h-[auto]"
          >
            Inizia gratis
          </Link>
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-ink hover:text-ink/80"
            aria-label={open ? 'Chiudi menu' : 'Apri menu'}
            aria-expanded={open}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden absolute left-0 right-0 top-16 bg-paper border-b border-border p-4 z-40">
          <nav className="flex flex-col gap-3" aria-label="Menu mobile">
            <a href="#prova" className="text-small font-medium block py-2">
              Prova
            </a>
            <a href="#come-funziona" className="text-small font-medium block py-2">
              Come funziona
            </a>
            <a href="#prezzi" className="text-small font-medium block py-2">
              Prezzi
            </a>
            <a href="#domande" className="text-small font-medium block py-2">
              Domande
            </a>
          </nav>
          <div className="mt-4 flex flex-col gap-2">
            <Link to="/register" className="btn btn-ink w-fit">
              Inizia gratis
            </Link>
            <Link to="/login" className="text-small font-medium link-underline">
              Accedi
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
