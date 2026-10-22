import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/lib/api'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/Select'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar'
import { Progress } from '@/components/ui/Progress'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/Tooltip'
import { Separator } from '@/components/ui/Separator'
import { toast } from '@/components/ui/Toaster'
import { 
  Plus, 
  Search, 
  RefreshCw, 
  Download, 
  Settings, 
  LogOut, 
  User, 
  CreditCard,
  BarChart3,
  History,
  ChevronDown,
  AlertCircle,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react'
import { formatDate, getStatusColor, getStatusLabel, getProviderName, cn } from '@/lib/utils'
import type { CreditCheckResponse, StatsResponse, ProviderInfo } from '@/types/api'

const STATUS_COLORS = {
  VERDE: 'bg-green-500',
  GIALLO: 'bg-yellow-500',
  ARANCIONE: 'bg-orange-500',
  ROSSO: 'bg-red-500',
  PENDING: 'bg-blue-500 animate-pulse',
  ERROR: 'bg-gray-500',
}

const STATUS_LABELS = {
  VERDE: 'Affidabile',
  GIALLO: 'Attenzione',
  ARANCIONE: 'Rischio Medio',
  ROSSO: 'Alto Rischio',
  PENDING: 'In elaborazione...',
  ERROR: 'Errore',
}

const PROVIDERS = [
  { value: 'CERVED', label: 'Cerved' },
  { value: 'CRIBIS', label: 'Cribis' },
  { value: 'CREDITSAFE', label: 'Credit Safe' },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user, logout, refreshUser } = useAuth()
  const [checks, setChecks] = useState<CreditCheckResponse[]>([])
  const [stats, setStats] = useState<StatsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [loadingChecks, setLoadingChecks] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState('new')

  // Form state
  const [formData, setFormData] = useState({
    companyName: '',
    vatNumber: '',
    taxCode: '',
    provider: 'CERVED' as 'CERVED' | 'CRIBIS' | 'CREDITSAFE',
  })
  const [formErrors, setFormErrors] = useState<Partial<typeof formData>>({})

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [checksData, statsData] = await Promise.all([
        api.getCreditChecks({ take: 20 }),
        api.getStats(),
      ])
      setChecks(checksData)
      setStats(statsData)
    } catch (err) {
      console.error('Errore caricamento dati:', err)
      toast.error('Errore nel caricamento dei dati')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormErrors({})

    // Validazione
    const errors: Partial<typeof formData> = {}
    if (!formData.companyName.trim()) errors.companyName = 'Ragione sociale obbligatoria'
    if (!formData.vatNumber.trim()) errors.vatNumber = 'Partita IVA obbligatoria'
    else if (formData.vatNumber.length !== 11 || !/^\d+$/.test(formData.vatNumber)) {
      errors.vatNumber = 'Partita IVA deve essere 11 cifre'
    }
    if (!formData.taxCode.trim()) errors.taxCode = 'Codice Fiscale obbligatorio'
    else if (formData.taxCode.length !== 16) {
      errors.taxCode = 'Codice Fiscale deve essere 16 caratteri'
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      return
    }

    setSubmitting(true)
    try {
      const result = await api.createCreditCheck(formData)
      setChecks([result, ...checks])
      setFormData({ companyName: '', vatNumber: '', taxCode: '', provider: 'CERVED' })
      setActiveTab('history')
      await loadData() // Refresh stats
      toast.success('Verifica completata con successo!')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Errore durante la verifica'
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-foreground" />
      </div>
    )
  }

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-40 h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-full items-center justify-between px-6 md:px-8">
            <div className="flex items-center gap-8">
              <Link to="/dashboard" className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
                  <svg className="w-5 h-5 text-background" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <span className="text-xl font-bold tracking-tight hidden sm:block">Greenlight</span>
              </Link>
              
              <nav className="hidden md:flex items-center gap-1">
                <button 
                  className={cn('px-3 py-2 rounded-lg text-sm font-medium transition-colors', activeTab === 'new' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary')}
                  onClick={() => setActiveTab('new')}
                >
                  <Plus className="w-4 h-4 mr-1 inline" /> Nuova Verifica
                </button>
                <button 
                  className={cn('px-3 py-2 rounded-lg text-sm font-medium transition-colors', activeTab === 'history' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary')}
                  onClick={() => setActiveTab('history')}
                >
                  <History className="w-4 h-4 mr-1 inline" /> Storico
                </button>
                <button 
                  className={cn('px-3 py-2 rounded-lg text-sm font-medium transition-colors', activeTab === 'stats' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-secondary')}
                  onClick={() => setActiveTab('stats')}
                >
                  <BarChart3 className="w-4 h-4 mr-1 inline" /> Statistiche
                </button>
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary">
                <CreditCard className="w-4 h-4" />
                <span className="text-sm font-medium capitalize">{user?.plan?.toLowerCase() || 'free'}</span>
              </div>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="relative flex h-9 w-9 rounded-full overflow-hidden border border-border" aria-label="Menu utente">
                    <Avatar>
                      <AvatarImage src={user?.name ? `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}` : undefined} />
                      <AvatarFallback>{user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}</AvatarFallback>
                    </Avatar>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="right" align="end" className="w-48">
                  <div className="p-2 space-y-1">
                    <p className="text-sm font-medium">{user?.name || 'Utente'}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                    <Separator />
                    <button onClick={handleLogout} className="flex w-full items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-lg">
                      <LogOut className="w-4 h-4" />
                      Esci
                    </button>
                  </div>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="pt-20 pb-8 px-6 md:px-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* Stats Bar */}
            {stats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                <StatCard 
                  label="Piano" 
                  value={stats.plan} 
                  icon={<CreditCard className="w-5 h-5" />}
                />
                <StatCard 
                  label="Usate questo mese" 
                  value={`${stats.used} / ${stats.limit}`} 
                  icon={<Search className="w-5 h-5" />}
                  progress={stats.limit > 0 ? (stats.used / stats.limit) * 100 : 0}
                />
                <StatCard 
                  label="Rimanenti" 
                  value={stats.remaining.toString()} 
                  icon={<RefreshCw className="w-5 h-5" />}
                />
                <StatCard 
                  label="Affidabili (Verde)" 
                  value={(stats.byStatus?.VERDE || 0).toString()} 
                  icon={<CheckCircle className="w-5 h-5 text-green-500" />}
                />
              </motion.div>
            )}

            {/* Tab Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border bg-card overflow-hidden"
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 border-b border-border p-1 bg-muted/50">
                  <TabsTrigger value="new" className="flex items-center justify-center gap-2">
                    <Plus className="w-4 h-4" /> Nuova Verifica
                  </TabsTrigger>
                  <TabsTrigger value="history" className="flex items-center justify-center gap-2">
                    <History className="w-4 h-4" /> Storico
                  </TabsTrigger>
                  <TabsTrigger value="stats" className="flex items-center justify-center gap-2">
                    <BarChart3 className="w-4 h-4" /> Statistiche
                  </TabsTrigger>
                </TabsList>

                {/* Nuova Verifica */}
                <TabsContent value="new" className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="companyName">Ragione Sociale *</Label>
                        <Input
                          id="companyName"
                          placeholder="Es: Acme Marketing S.r.l."
                          value={formData.companyName}
                          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                          error={!!formErrors.companyName}
                        />
                        {formErrors.companyName && (
                          <p className="text-sm text-red-400">{formErrors.companyName}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="vatNumber">Partita IVA *</Label>
                        <Input
                          id="vatNumber"
                          placeholder="12345678901"
                          value={formData.vatNumber}
                          onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
                          error={!!formErrors.vatNumber}
                          maxLength={11}
                        />
                        {formErrors.vatNumber && (
                          <p className="text-sm text-red-400">{formErrors.vatNumber}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="taxCode">Codice Fiscale *</Label>
                        <Input
                          id="taxCode"
                          placeholder="RSSMRA80A01H501Z"
                          value={formData.taxCode}
                          onChange={(e) => setFormData({ ...formData, taxCode: e.target.value.toUpperCase() })}
                          error={!!formErrors.taxCode}
                          maxLength={16}
                        />
                        {formErrors.taxCode && (
                          <p className="text-sm text-red-400">{formErrors.taxCode}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="provider">Provider di Credito</Label>
                      <Select value={formData.provider} onValueChange={(v) => setFormData({ ...formData, provider: v as typeof formData.provider })}>
                        <SelectTrigger id="provider">
                          <SelectValue placeholder="Seleziona provider" />
                        </SelectTrigger>
                        <SelectContent>
                          {PROVIDERS.map((p) => (
                            <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex gap-4 pt-4 border-t border-border">
                      <Button type="submit" className="flex-1" size="lg" disabled={submitting}>
                        {submitting ? (
                          <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Verifica in corso...
                          </>
                        ) : (
                          <>
                            <Search className="w-4 h-4 mr-2" />
                            Verifica Credito
                          </>
                        )}
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setFormData({ companyName: '', vatNumber: '', taxCode: '', provider: 'CERVED' })} disabled={submitting}>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                {/* Storico */}
                <TabsContent value="history" className="p-6">
                  {checks.length === 0 ? (
                    <div className="text-center py-12">
                      <Search className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                      <h3 className="text-lg font-medium mb-2">Nessuna verifica effettuata</h3>
                      <p className="text-muted-foreground mb-6">Inizia la tua prima verifica dalla tab "Nuova Verifica"</p>
                      <Button onClick={() => setActiveTab('new')}>
                        <Plus className="w-4 h-4 mr-2" />
                        Nuova Verifica
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {checks.map((check) => (
                        <CheckRow key={check.id} check={check} />
                      ))}
                    </div>
                  )}
                </TabsContent>

                {/* Statistiche */}
                <TabsContent value="stats" className="p-6">
                  {stats && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Distribuzione per Status</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {[
                                { key: 'VERDE', label: 'Affidabile', color: 'text-green-500' },
                                { key: 'GIALLO', label: 'Attenzione', color: 'text-yellow-500' },
                                { key: 'ARANCIONE', label: 'Rischio Medio', color: 'text-orange-500' },
                                { key: 'ROSSO', label: 'Alto Rischio', color: 'text-red-500' },
                              ].map((status) => {
                                const count = stats.byStatus?.[status.key] || 0
                                const total = stats.used || 1
                                const percentage = (count / total) * 100
                                return (
                                  <div key={status.key} className="space-y-1">
                                    <div className="flex justify-between text-sm">
                                      <span className={cn('font-medium', status.color)}>{status.label}</span>
                                      <span>{count} ({percentage.toFixed(0)}%)</span>
                                    </div>
                                    <Progress value={percentage} className="h-2" />
                                  </div>
                                )
                              })}
                            </div>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Utilizzo Piano</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Verifiche utilizzate</span>
                                  <span className="font-medium">{stats.used} / {stats.limit}</span>
                                </div>
                                <Progress value={stats.limit > 0 ? (stats.used / stats.limit) * 100 : 0} />
                              </div>
                              <div>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>Verifiche rimanenti</span>
                                  <span className="font-medium text-green-500">{stats.remaining}</span>
                                </div>
                                <Progress value={stats.limit > 0 ? (stats.remaining / stats.limit) * 100 : 100} />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Dettaglio per Provider</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                              <thead>
                                <tr className="border-b border-border text-muted-foreground">
                                  <th className="text-left p-3">Provider</th>
                                  <th className="text-right p-3">Verifiche</th>
                                  <th className="text-right p-3">% Totale</th>
                                </tr>
                              </thead>
                              <tbody>
                                {PROVIDERS.map((p) => {
                                  const providerChecks = checks.filter(c => c.provider === p.value)
                                  const count = providerChecks.length
                                  const percentage = stats.used > 0 ? (count / stats.used) * 100 : 0
                                  return (
                                    <tr key={p.value} className="border-b border-border/50">
                                      <td className="p-3">{p.label}</td>
                                      <td className="text-right p-3 font-medium">{count}</td>
                                      <td className="text-right p-3 text-muted-foreground">{percentage.toFixed(1)}%</td>
                                    </tr>
                                  )
                                })}
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </main>
      </div>
    </TooltipProvider>
  )
}

function StatCard({ label, value, icon, progress }: { label: string; value: string; icon: React.ReactNode; progress?: number }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
            {progress !== undefined && (
              <div className="mt-3 flex items-center gap-2">
                <Progress value={progress} className="h-1.5 w-32" />
                <span className="text-xs text-muted-foreground">{progress.toFixed(0)}%</span>
              </div>
            )}
          </div>
          <div className="p-2 rounded-lg bg-secondary">{icon}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function CheckRow({ check }: { check: CreditCheckResponse }) {
  const statusColor = STATUS_COLORS[check.status as keyof typeof STATUS_COLORS] || 'bg-gray-500'
  const statusLabel = STATUS_LABELS[check.status as keyof typeof STATUS_LABELS] || check.status

  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-border bg-background/50 hover:border-primary/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
          {check.status !== 'PENDING' && check.status !== 'ERROR' ? (
            <div className="flex gap-1">
              {['VERDE', 'GIALLO', 'ARANCIONE', 'ROSSO'].map((s) => (
                <div
                  key={s}
                  className={`w-1.5 h-1.5 rounded-full ${s === check.status ? STATUS_COLORS[s as keyof typeof STATUS_COLORS] : 'bg-muted-foreground/20'}`}
                />
              ))}
            </div>
          ) : (
            <Loader2 className="w-5 h-5 animate-spin text-muted-foreground" />
          )}
        </div>
        <div>
          <p className="font-medium">{check.companyName}</p>
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <span className="font-mono">{check.vatNumber}</span>
            <span>•</span>
            <span>{getProviderName(check.provider)}</span>
            <span>•</span>
            <span>{formatDate(check.createdAt)}</span>
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {check.score !== null && (
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="px-2 py-1 rounded-lg bg-secondary text-sm font-mono font-medium">
                Score: {check.score}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Punteggio numerico del provider</p>
            </TooltipContent>
          </Tooltip>
        )}
        
        <span className={cn('px-3 py-1 rounded-full text-xs font-medium', statusColor.replace('bg-', 'bg-').replace('500', '100'), statusColor.replace('bg-', 'text-'))}>
          {statusLabel}
        </span>
      </div>
    </div>
  )
}
