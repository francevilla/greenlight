import { Link } from 'react-router-dom'

export function Closing() {
  return (
    <section
      data-tone="ink"
      className="chapter flex min-h-[70svh] flex-col justify-between bg-verde text-ink"
    >
      <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-12 md:gap-6">
        <h2 className="display text-[clamp(2.5rem,7.5vw,6.5rem)] md:col-span-8">
          Cinque verifiche,
          <br />
          senza carta.
        </h2>
        <p className="text-body md:col-span-4 md:text-right">
          Crea l’account, incolla la prima partita IVA, guarda il semaforo. Il resto lo decidi tu.
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Link to="/register" className="btn btn-ink">
          Crea un account
        </Link>
        <Link to="/login" className="text-small font-semibold underline decoration-2 underline-offset-4">
          Ho già un account
        </Link>
      </div>
    </section>
  )
}
