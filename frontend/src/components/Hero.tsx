import { motion, useScroll, useTransform, useRef } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'

interface HeroProps {
  className?: string
}

export function Hero({ className }: HeroProps) {
  const sectionRef = useRef<HTMLSectionElement>(null)
  const { scrollY } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  
  return (
    <section 
      ref={sectionRef}
      className={cn('relative min-h-screen flex flex-col overflow-hidden', className)}
    >
      <Navbar />
      
      <div className="relative flex-1 flex flex-col items-center justify-center px-4 mt-16 md:mt-20">
        <motion.div 
          className="liquid-glass px-3 py-2 rounded-lg mb-6 flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-foreground text-background rounded-md text-sm font-medium px-2 py-0.5">Nuovo</span>
          <span className="text-sm font-medium text-muted-foreground">Greenlight v1.0 — Il via libera per i tuoi clienti</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-center mb-3"
        >
          <h1 className="text-hero-title font-medium leading-tight md:leading-[1.15] tracking-[-2px]">
            Verifica il Credito.<br />
            <span className="font-serif italic font-normal">Dai il Via Libera.</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg font-normal leading-6 opacity-90 mb-8 max-w-2xl text-center"
          style={{ color: 'hsl(var(--hero-subtitle))' }}
        >
          Greenlight aiuta le agenzie a verificare il merito creditizio prima di acquisire i clienti.
          <br />Inserisci i dati, scegli il provider, ottieni il semaforo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link to="/register">
            <Button 
              size="lg" 
              className="rounded-full px-8 py-3.5 text-base font-medium bg-foreground text-background hover:opacity-90"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Inizia Gratis
            </Button>
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="relative w-screen max-w-none -ml-[calc(50vw-50%)] aspect-video"
      >
        <DashboardPreview />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent z-30 pointer-events-none" />
      </motion.div>
    </section>
  )
}

function DashboardPreview() {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <div className="relative max-w-5xl w-[90%] rounded-2xl bg-card border border-border overflow-hidden">
        <div className="p-4 border-b border-border flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="flex-1 text-center text-sm text-muted-foreground font-mono">
            greenlight.app / dashboard
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <StatCard label="Verifiche Mese" value="12" change="+3" />
            <StatCard label="Affidabili (Verde)" value="8" change="+2" />
            <StatCard label="Attenzione" value="4" change="+1" />
          </div>
          <MockForm />
          <MockResults />
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, change }: { label: string; value: string; change: string }) {
  return (
    <div className="bg-muted/50 rounded-xl p-4 border border-border">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
      <p className="text-xs text-green-400 mt-1">{change} vs mese scorso</p>
    </div>
  )
}

function MockForm() {
  return (
    <div className="bg-muted/30 rounded-xl p-4 border border-border">
      <h3 className="text-sm font-medium mb-3">Nuova Verifica</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <div>
          <label className="text-xs text-muted-foreground block mb-1">Ragione Sociale</label>
          <div className="bg-background rounded-lg border border-border px-3 py-2 text-sm">Acme Marketing S.r.l.</div>
        </div>
        <div>
          <label className="text-xs text-muted-foreground block mb-1">Partita IVA</label>
          <div className="bg-background rounded-lg border border-border px-3 py-2 text-sm font-mono">12345678901</div>
        </div>
        <div>
          <label className="text-xs text-muted-foreground block mb-1">Provider</label>
          <div className="bg-background rounded-lg border border-border px-3 py-2 text-sm">Cerved</div>
        </div>
      </div>
      <Button className="w-full bg-foreground text-background">Verifica Credito</Button>
    </div>
  )
}

function MockResults() {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Ultimi Risultati</h3>
      {[
        { company: 'TechStart S.r.l.', status: 'VERDE', score: 87, provider: 'Cerved' },
        { company: 'Global Trade Spa', status: 'GIALLO', score: 62, provider: 'Cribis' },
        { company: 'BuildIt S.r.l.', status: 'ARANCIONE', score: 45, provider: 'Cerved' },
      ].map((item, i) => (
        <div key={i} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border">
          <div>
            <p className="font-medium text-sm">{item.company}</p>
            <p className="text-xs text-muted-foreground">{item.provider} • Score: {item.score}</p>
          </div>
          <SemaphoreBadge status={item.status} />
        </div>
      ))}
    </div>
  )
}

function SemaphoreBadge({ status }: { status: string }) {
  const colors = {
    VERDE: 'bg-green-500',
    GIALLO: 'bg-yellow-500',
    ARANCIONE: 'bg-orange-500',
    ROSSO: 'bg-red-500',
  }
  const labels = {
    VERDE: 'Affidabile',
    GIALLO: 'Attenzione',
    ARANCIONE: 'Rischio Medio',
    ROSSO: 'Alto Rischio',
  }
  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-1">
        {['VERDE', 'GIALLO', 'ARANCIONE', 'ROSSO'].map((s) => (
          <div
            key={s}
            className={`w-2 h-2 rounded-full transition-colors ${s === status ? colors[s as keyof typeof colors] : 'bg-muted-foreground/20'}`}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-muted-foreground">{labels[status as keyof typeof labels]}</span>
    </div>
  )
}