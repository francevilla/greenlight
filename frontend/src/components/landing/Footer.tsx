import { Link } from 'react-router-dom'

const NAV = [
  { href: '#prova', label: 'Prova' },
  { href: '#come-funziona', label: 'Come funziona' },
  { href: '#stati', label: 'I quattro stati' },
  { href: '#prezzi', label: 'Prezzi' },
  { href: '#domande', label: 'Domande' },
]

export function Footer() {
  return (
    <footer data-tone="paper" className="bg-ink text-paper" style={{ padding: 'var(--gutter)' }}>
      <div className="grid grid-cols-2 gap-2 md:grid-cols-12">
        <div className="col-span-2 flex min-h-[160px] flex-col justify-between bg-paper/[0.06] p-5 md:col-span-8 md:min-h-[300px] md:p-8">
          <p className="display text-[clamp(2.5rem,9vw,7rem)] leading-none">Greenlight</p>
          <p className="max-w-[46ch] text-small text-paper/60">
            Il semaforo del credito. La demo pubblica usa dati di esempio: nessuna azienda reale
            viene interrogata e nessuna visura viene addebitata.
          </p>
        </div>

        <div className="col-span-2 flex flex-col justify-between bg-paper/[0.06] p-5 md:col-span-4 md:min-h-[300px] md:p-8">
          <nav aria-label="Piede di pagina" className="flex flex-col gap-2">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="tap-target text-body font-medium underline decoration-1 underline-offset-4 hover:decoration-2"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="mt-8 flex flex-col gap-2 text-small text-paper/60">
            <Link to="/login" className="hover:text-paper">
              Accedi
            </Link>
            <Link to="/register" className="hover:text-paper">
              Crea un account
            </Link>
          </div>
        </div>

        <div className="col-span-1 flex min-h-[120px] flex-col justify-between bg-paper/[0.06] p-5 md:col-span-6 md:p-8">
          <p className="text-small font-semibold">Dati</p>
          <p className="mt-4 max-w-[34ch] text-small text-paper/60">
            Conserviamo email, nome e gli esiti delle verifiche che fai. Nessun documento caricato.
          </p>
        </div>

        <Link
          to="/register"
          className="col-span-1 flex min-h-[120px] flex-col justify-between bg-verde p-5 text-ink md:col-span-6 md:p-8"
        >
          <p className="headline text-[1.35rem] leading-tight md:text-[1.75rem]">
            Cinque verifiche gratis.
          </p>
          <span className="text-small font-semibold underline decoration-2 underline-offset-4">
            Apri l'account →
          </span>
        </Link>
      </div>

      <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-2 border-t border-border/10 pt-6 text-xs text-paper/40">
        <p className="max-w-md">
          Greenlight SaaS · P.IVA 00000000000 · Sede legale, Italia
        </p>
        <nav className="flex flex-wrap gap-4 text-paper/50">
          <a href="/legali#termini" className="hover:text-paper underline decoration-1 underline-offset-4">
            Termini
          </a>
          <a href="/legali#privacy" className="hover:text-paper underline decoration-1 underline-offset-4">
            Privacy
          </a>
          <a href="/legali#cookie" className="hover:text-paper underline decoration-1 underline-offset-4">
            Cookie
          </a>
          <a href="/legali#dpa" className="hover:text-paper underline decoration-1 underline-offset-4">
            DPA
          </a>
          <a href="/legali#stato" className="hover:text-paper underline decoration-1 underline-offset-4">
            Stato del servizio
          </a>
        </nav>
        <p>© 2026 Greenlight. Tutti i diritti riservati.</p>
      </div>
    </footer>
  )
}
