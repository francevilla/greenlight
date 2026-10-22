import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Mail, Lock, User, Send } from 'lucide-react'

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32 px-8 md:px-28">
      <div className="max-w-3xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
            Inizia a verificare <span className="font-serif italic">il credito oggi</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Registrati in 30 secondi. Prime 5 verifiche gratis, nessuna carta richiesta.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="name"
                  name="name"
                  placeholder="Mario Rossi"
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email aziendale</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="mario@azienda.it"
                  className="pl-10"
                  required
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company">Nome azienda / agenzia</Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="company"
                name="company"
                placeholder="Rossi Marketing S.r.l."
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Messaggio (opzionale)</Label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              placeholder="Parlaci delle tue esigenze..."
            />
          </div>

          <Button type="submit" className="w-full lg:w-auto bg-foreground text-background hover:opacity-90" size="lg">
            <Send className="w-4 h-4 mr-2" />
            Richiedi Accesso
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Inviando accetti la nostra <a href="#" className="underline hover:text-foreground">Privacy Policy</a> e i <a href="#" className="underline hover:text-foreground">Termini di Servizio</a>.
          </p>
        </motion.form>
      </div>
    </section>
  )
}
