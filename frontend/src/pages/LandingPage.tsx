import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Globe, LogIn, UserPlus } from 'lucide-react'
import { CreditScoreGauge } from '@/components/ui/CreditScoreGauge'

const SERIF = "'Source Serif 4', 'Instrument Serif', serif"

export default function LandingPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = email.trim()
    navigate(value ? `/register?email=${encodeURIComponent(value)}` : '/register')
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      {/* Navigazione */}
      <nav className="relative z-20 pl-6 pr-6 py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full px-6 py-3">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Globe size={24} />
              <span>Greenlight</span>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              <a
                href="/semaforo#stati"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Il prodotto
              </a>
              <a
                href="/semaforo#prezzi"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Prezzi
              </a>
              <a
                href="/semaforo#domande"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                Domande
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/register" className="text-sm font-medium text-foreground">
              Registrati
            </Link>
            <Link
              to="/login"
              className="liquid-glass rounded-full px-6 py-2 text-sm text-foreground"
            >
              Accedi
            </Link>
          </div>
        </div>
      </nav>

      {/* Contenuto Hero */}
      <div className="relative z-10 flex flex-1 -translate-y-[10%] flex-col items-center justify-center px-6 py-12 text-center">
        <h1
          className="mb-8 whitespace-normal text-display uppercase md:whitespace-nowrap"
          style={{ fontFamily: SERIF }}
        >
          Il semaforo del credito<br /> per le tue decisioni.
        </h1>

        <div className="w-full max-w-xl space-y-4">
          <form onSubmit={handleSubmit} className="liquid-glass flex items-center gap-3 rounded-full py-2 pl-6 pr-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="La tua email di lavoro"
              aria-label="Email di lavoro"
              className="min-w-0 flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Continua"
              className="rounded-full bg-primary text-primary-foreground p-3 transition-transform hover:scale-[1.03] active:scale-95"
            >
              <ArrowRight size={20} />
            </button>
          </form>

          <p className="px-4 text-sm leading-relaxed text-muted-foreground">
            Greenlight interroga Cerved, Cribis e Credit Safe su una partita IVA e restituisce il
            semaforo: verde firmi, rosso ti fermi. Cinque verifiche gratis, senza carta.
          </p>

          <div className="flex justify-center">
            <Link
              to="/semaforo"
              className="liquid-glass rounded-full px-8 py-3 text-sm font-medium text-foreground transition-colors hover:bg-primary/10"
            >
              Il manifesto
            </Link>
          </div>
        </div>

        <div className="mt-12 flex items-center justify-center gap-8">
          <CreditScoreGauge status="VERDE" label="Affidabile" size="xl" ignite />
        </div>
      </div>

      {/* Icone */}
      <div className="relative z-10 flex justify-center gap-4 pb-12">
        <Link
          to="/semaforo"
          aria-label="La pagina completa del prodotto"
          className="liquid-glass rounded-full p-4 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
        >
          <Globe size={20} />
        </Link>
        <Link
          to="/login"
          aria-label="Accedi al tuo account"
          className="liquid-glass rounded-full p-4 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
        >
          <LogIn size={20} />
        </Link>
        <Link
          to="/register"
          aria-label="Crea un account"
          className="liquid-glass rounded-full p-4 text-muted-foreground transition-all hover:bg-primary/10 hover:text-primary"
        >
          <UserPlus size={20} />
        </Link>
      </div>
    </div>
  )
}
