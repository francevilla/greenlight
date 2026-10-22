import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { 
  Shield, 
  Zap, 
  BarChart3, 
  Users, 
  Globe, 
  Lock,
  CreditCard,
  ArrowRight
} from 'lucide-react'

const features = [
  {
    icon: Shield,
    title: 'Verifica Istantanea',
    description: 'Ottieni il semaforo di affidabilità in pochi secondi. Inserisci i dati del prospect e ricevi subito il risultato.',
  },
  {
    icon: Zap,
    title: 'Multi-Provider',
    description: 'Scegli tra Cerved, Cribis e Credit Safe. Confronta i risultati e usa il provider più adatto al tuo caso.',
  },
  {
    icon: BarChart3,
    title: 'Dashboard Completa',
    description: 'Visualizza lo storico verifiche, statistiche mensili e trend. Esporta report per il tuo team commerciale.',
  },
  {
    icon: Users,
    title: 'Team & Condivisione',
    description: 'Invita i collaboratori, assegna ruoli e condividi le verifiche. Ogni membro ha i suoi limiti di piano.',
  },
  {
    icon: Globe,
    title: 'API per Sviluppatori',
    description: 'Integra la verifica credito nel tuo CRM o gestionale. Webhook per notifiche in tempo reale.',
  },
  {
    icon: Lock,
    title: 'Sicurezza & Compliance',
    description: 'Dati criptati, GDPR compliant, audit log completo. I tuoi dati non vengono mai condivisi con terze parti.',
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 px-8 md:px-28">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
            Tutto ciò che serve per <span className="font-serif italic">gestire il credito</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dalla singola verifica alla gestione enterprise. Greenlight si adatta alle tue esigenze.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group p-6 rounded-2xl border border-border bg-card hover:border-primary/50 transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
