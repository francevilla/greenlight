import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Mail } from 'lucide-react'
import { toast } from '@/components/ui/Toaster'

export default function ForgotPasswordPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    setSent(true)
    toast.success('Se l’account esiste, riceverai un link di reimpostazione.')
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <Link to="/login" className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground">
            ← Torna al login
          </Link>
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="text-xl">Link inviato</CardTitle>
              <CardDescription>
                Controlla la casella {email} e segui le istruzioni per reimpostare la password.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center pt-6">
              <Button onClick={() => navigate('/login')} className="w-full">
                Torna al login
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link to="/login" className="inline-flex items-center gap-2 mb-6 text-muted-foreground hover:text-foreground">
          ← Torna al login
        </Link>
        <h1 className="text-3xl font-medium tracking-tight mb-2">Password dimenticata</h1>
        <p className="text-muted-foreground mb-8">Inserisci l'email del tuo account</p>

        <Card>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="mario@azienda.it"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Invia link di reimpostazione
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
