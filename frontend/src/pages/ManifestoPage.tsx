import { Link } from 'react-router-dom'

export default function ManifestoPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-background">
      <div className="w-full max-w-3xl">
        <Link to="/" className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground">
          ← Torna alla home
        </Link>
        <h1 className="text-4xl font-serif font-bold tracking-tight mb-6 text-foreground">
          Il nostro manifesto
        </h1>

        <section className="mb-10 space-y-6 text-ink prose-sm max-w-none">
          <h2 className="text-2xl font-serif font-semibold mb-2">Crediamo nella chiarezza.</h2>
          <p className="leading-relaxed">
            Ogni giorno migliaia di imprenditori e commerciali italiani firmano contratti
            senza sapere se il cliente potrà pagare. Aspettano visure, leggono gergo
            finanziario, si affidano all'istinto. Questo è il modo più costoso di fare
            impresa.
          </p>
        </section>

        <section className="mb-10 space-y-6 text-ink prose-sm max-w-none">
          <h2 className="text-2xl font-serif font-semibold mb-2">Crediamo nella decisione rapida.</h2>
          <p className="leading-relaxed">
            Inserisci una partita IVA. In 30 secondi ricevi un semaforo: verde, puoi
            firmare. Giallo, chiedi un acconto. Rosso, ti fermi. Nessun punteggio
            complicato, nessun report da decifrare. Una decisione sì/no leggibile da
            chiunque.
          </p>
        </section>

        <section className="mb-10 space-y-6 text-ink prose-sm max-w-none">
          <h2 className="text-2xl font-serif font-semibold mb-2">Crediamo nell'onestà.</h2>
          <p className="leading-relaxed">
            I dati vengono da Cerved, Cribis e Credit Safe, le stesse fonti dei report
            professionali. Non inventiamo punteggi. Quando le fonti non sono d'accordo,
            te lo diciamo: la divergenza è un'informazione, non un dettaglio da
            nascondere in una media. I primi cinque check al mese sono gratis, senza
            carta di credito. Paghi solo se superi la soglia.
          </p>
        </section>

        <section className="space-y-4 text-ink prose-sm max-w-none">
          <h2 className="text-2xl font-serif font-semibold mb-2">Per chi è Greenlight.</h2>
          <ul className="list-disc pl-6 space-y-2 leading-relaxed">
            <li>
              Agenzie di marketing e studi che devono verificare un cliente prima di
              firmare un contratto.
            </li>
            <li>
              Piccole imprese che vendono alle imprese e non possono permettersi un
              insoluto.
            </li>
            <li>
              Chi vuole una decisione immediata, non una visura da interpretare.
            </li>
          </ul>
          <p className="mt-4">
            Greenlight non è una banca fredda, non è un fintech generico, non è una
            burocrazia digitale. È il semaforo del credito per le tue decisioni.
          </p>
        </section>

        <div className="mt-12 flex gap-4">
          <Link to="/" className="btn btn-ink">
            Torna alla home
          </Link>
          <Link to="/register" className="btn btn-ghost">
            Crea un account — 5 check gratis
          </Link>
        </div>
      </div>
    </div>
  )
}
