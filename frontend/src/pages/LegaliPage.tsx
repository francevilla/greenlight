import { Link } from 'react-router-dom'

export default function LegaliPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 bg-background">
      <div className="w-full max-w-2xl">
        <Link to="/" className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground">
          ← Torna alla home
        </Link>
        <h1 className="text-3xl font-medium tracking-tight mb-6">Termini e privacy</h1>

        <section id="termini" className="mb-10 text-ink prose-sm max-w-none">
          <h2 className="text-xl font-semibold mb-3">Termini di Servizio</h2>
          <p className="mb-4 leading-relaxed">
            Benvenuto in Greenlight. Questi termini regolano l'uso del servizio di
            verifica del credito (il "semaforo") offerto da Greenlight SaaS.
          </p>
          <p className="mb-4 leading-relaxed">
            L'utente si impegna a utilizzare il servizio esclusivamente per finalità
            di valutazione del rischio commerciale proprie, e non per finalità
            illecite o di profiling non autorizzato.
          </p>
          <p className="mb-4 leading-relaxed">
            Il semaforo è uno strumento di supporto alla decisione commerciale: non
            sostituisce bilanci certificati, garanzie o il parere di un
            professionista. Greenlight non garantisce l'accuratezza assoluta dei dati
            forniti dai provider terzi (Cerved, Cribis, Credit Safe).
          </p>
          <p className="mb-4 leading-relaxed">
            Gli abbonamenti (Free, Basic, Pro) si rinnovano mensilmente e sono
            disdettabili in qualsiasi momento. Il piano Free include cinque
            verifiche al mese senza richiesta di carta di pagamento.
          </p>
        </section>

        <section id="privacy" className="mb-10 text-ink prose-sm max-w-none">
          <h2 className="text-xl font-semibold mb-3">Privacy Policy</h2>
          <p className="mb-4 leading-relaxed">
            Greenlight conserva l'email, la ragione sociale, la partita IVA e
            l'esito delle verifiche effettuate dall'utente. Non vengono caricati
            né conservati documenti o visure aziendali.
          </p>
          <p className="mb-4 leading-relaxed">
            I dati sono cifrati in transito (TLS) e a riposo, su server ubicati
            nell'Unione Europea. Non vengono venduti né ceduti a terzi.
          </p>
          <p className="mb-4 leading-relaxed">
            L'utente può chiedere l'accesso, la rettifica o la cancellazione dei
            propri dati scrivendo a privacy@greenlight.example.
          </p>
        </section>

        <section id="cookie" className="mb-10 text-ink prose-sm max-w-none">
          <h2 className="text-xl font-semibold mb-3">Cookie</h2>
          <p className="mb-4 leading-relaxed">
            Il sito utilizza cookie tecnici necessari al funzionamento e cookie
            di analisi anonima per migliorare l'esperienza. Puoi gestire le
            preferenze tramite le impostazioni del browser.
          </p>
        </section>

        <section id="dpa" className="mb-10 text-ink prose-sm max-w-none">
          <h2 className="text-xl font-semibold mb-3">Data Processing Agreement (DPA)</h2>
          <p className="mb-4 leading-relaxed">
            Greenlight agisce quale responsabile del trattamento per conto
            dell'utente nelle verifiche di credito. Il DPA completo è disponibile
            su richiesta scrivendo a legale@greenlight.example.
          </p>
        </section>

        <section id="stato" className="mb-10 text-ink prose-sm max-w-none">
          <h2 className="text-xl font-semibold mb-3">Stato del servizio</h2>
          <p className="mb-4 leading-relaxed">
            Il servizio è fornito "come è", senza garanzie di continuità. Gli
            aggiornamenti sullo stato sono pubblicati su
            status.greenlight.example.
          </p>
        </section>

        <p className="text-xs text-muted-foreground mt-10">
          Greenlight SaaS · P.IVA 00000000000 · Sede legale, Italia ·
          supporto@greenlight.example
        </p>
      </div>
    </div>
  )
}
