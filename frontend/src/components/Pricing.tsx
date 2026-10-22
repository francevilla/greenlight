import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Check, X } from 'lucide-react'

const plans = [
  {
    name: 'Free',
    price: 0,
    period: '/mese',
    description: 'Per provare il servizio',
    features: [
      '5 verifiche/mese',
      '1 provider (Cerved)',
      'Dashboard base',
      'Storico 30 giorni',
      'Email support',
    ],
    limits: ['Nessuna API', 'Nessun export', 'Nessun team'],
    cta: 'Inizia Gratis',
    variant: 'outline' as const,
    popular: false,
  },
  {
    name: 'Basic',
    price: 29,
    period: '/mese',
    description: 'Per professionisti singoli',
    features: [
      '50 verifiche/mese',
      '3 provider (Cerved, Cribis, Credit Safe)',
      'Dashboard completa',
      'Storico illimitato',
      'Export CSV/PDF',
      'Priorità support',
    ],
    limits: [],
    cta: 'Attiva Basic',
    variant: 'default' as const,
    popular: true,
  },
  {
    name: 'Pro',
    price: 79,
    period: '/mese',
    description: 'Per team e agenzie',
    features: [
      '200 verifiche/mese',
      'Tutti i provider + confronto',
      'Dashboard team',
      'Ruoli e permessi',
      'API access (1000 req/mese)',
      'Webhook notifiche',
      'Supporto dedicato',
    ],
    limits: [],
    cta: 'Attiva Pro',
    variant: 'default' as const,
    popular: false,
  },
  {
    name: 'Enterprise',
    price: null,
    period: '',
    description: 'Per grandi organizzazioni',
    features: [
      'Verifiche illimitate',
      'Provider dedicati',
      'White-label & custom domain',
      'SLA garantito',
      'API illimitate',
      'SSO & provisioning',
      'Account manager dedicato',
      'Formazione team',
    ],
    limits: [],
    cta: 'Contatta Vendite',
    variant: 'outline' as const,
    popular: false,
  },
]

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 px-8 md:px-28">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
            Scegli il piano <span className="font-serif italic">giusto per te</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tutti i piani includono 14 giorni di prova gratuita. Nessuna carta di credito richiesta.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                'relative p-6 rounded-2xl border border-border bg-card flex flex-col',
                plan.popular && 'border-primary/50 shadow-lg shadow-primary/10'
              )}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
                  Più Popolare
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>

              <div className="mb-6">
                {plan.price !== null ? (
                  <>
                    <span className="text-5xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </>
                ) : (
                  <span className="text-5xl font-bold">Custom</span>
                )}
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
                {plan.limits.map((limit, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                    <X className="w-5 h-5 flex-shrink-0 mt-0.5" />
                    <span>{limit}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className="w-full" 
                variant={plan.variant}
                size="lg"
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
