import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Globe, LogIn, UserPlus } from 'lucide-react'
import { HeroVideo } from '@/components/cinematic/HeroVideo'

const SERIF = "'Instrument Serif', serif"

export default function LandingPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const value = email.trim()
    navigate(value ? `/register?email=${encodeURIComponent(value)}` : '/register')
  }

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-black">
      <HeroVideo />

      {/* Navigazione */}
      <nav className="relative z-20 pl-6 pr-6 py-6">
        <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full px-6 py-3">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 text-lg font-semibold text-white">
              <Globe size={24} />
              <span>Greenlight</span>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              <a
                href="/semaforo#stati"
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                Il prodotto
              </a>
              <a
                href="/semaforo#prezzi"
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                Prezzi
              </a>
              <a
                href="/semaforo#domande"
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                Domande
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/register" className="text-sm font-medium text-white">
              Registrati
            </Link>
            <Link to="/login" className="liquid-glass rounded-full px-6 py-2 text-sm text-white">
              Accedi
            </Link>
          </div>
        </div>
      </nav>

      {/* Contenuto */}
      <div className="relative z-10 flex flex-1 -translate-y-[20%] flex-col items-center justify-center px-6 py-12 text-center">
        <h1
          className="mb-8 whitespace-normal text-5xl tracking-tight text-white md:whitespace-nowrap md:text-6xl lg:text-7xl"
          style={{ fontFamily: SERIF }}
        >
          Il semaforo del credito
        </h1>

        <div className="w-full max-w-xl space-y-4">
          <form onSubmit={handleSubmit} className="liquid-glass flex items-center gap-3 rounded-full py-2 pl-6 pr-2">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="La tua email di lavoro"
              aria-label="Email di lavoro"
              className="min-w-0 flex-1 bg-transparent text-base text-white placeholder:text-white/40 focus:outline-none"
            />
            <button
              type="submit"
              aria-label="Continua"
              className="rounded-full bg-white p-3 text-black transition-transform hover:scale-[1.03] active:scale-95"
            >
              <ArrowRight size={20} />
            </button>
          </form>

          <p className="px-4 text-sm leading-relaxed text-white">
            Greenlight interroga Cerved, Cribis e Credit Safe su una partita IVA e restituisce il
            semaforo: verde firmi, rosso ti fermi. Cinque verifiche gratis, senza carta.
          </p>

          <div className="flex justify-center">
            <Link
              to="/semaforo"
              className="liquid-glass rounded-full px-8 py-3 text-sm font-medium text-white transition-colors hover:bg-white/5"
            >
              Il manifesto
            </Link>
          </div>
        </div>
      </div>

      {/* Icone */}
      <div className="relative z-10 flex justify-center gap-4 pb-12">
        <Link
          to="/semaforo"
          aria-label="La pagina completa del prodotto"
          className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
        >
          <Globe size={20} />
        </Link>
        <Link
          to="/login"
          aria-label="Accedi al tuo account"
          className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
        >
          <LogIn size={20} />
        </Link>
        <Link
          to="/register"
          aria-label="Crea un account"
          className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
        >
          <UserPlus size={20} />
        </Link>
      </div>
    </div>
  )
}
