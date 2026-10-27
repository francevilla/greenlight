import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/useAuth'
import { api } from '@/lib/api'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/Avatar'
import { Progress } from '@/components/ui/Progress'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/Tooltip'
import { Separator } from '@/components/ui/Separator'
import { toast } from '@/components/ui/Toaster'
import { trackFunnel } from '@/lib/analytics'
import {
  Plus,
  Search,
  RefreshCw,
  LogOut,
  CreditCard,
  BarChart3,
  History,
  CheckCircle,
  Loader2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CreditCheckResponse, StatsResponse } from '@/types/api'
import { KpiCard } from '@/components/ui/KpiCard'
import { EmptyState } from '@/components/ui/EmptyState'
import { CreditCheckForm } from '@/components/ui/CreditCheckForm'
import { CheckRow } from '@/components/ui/CheckRow'
import { CreditScoreGauge } from '@/components/ui/CreditScoreGauge'

const PROVIDERS = [
  { value: 'CERVED', label: 'Cerved' },
  { value: 'CRIBIS', label: 'Cribis' },
  { value: 'CREDITSAFE', label: 'Credit Safe' },
]

export default function DashboardPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [checks, setChecks] = useState<CreditCheckResponse[]>([])
  const [stats, setStats] = useState<StatsResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<string>('new')

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

  const handleSubmit = async (data: {
    companyName: string
    vatNumber: string
    provider: 'CERVED' | 'CRIBIS' | 'CREDITSAFE'
  }) => {
    setSubmitting(true)
    try {
      const result = await api.createCreditCheck(data)
      setChecks([result, ...checks])
      setActiveTab('history')
      await loadData()
      toast.success('Verifica completata. Report disponibile.')
      trackFunnel('first_check_complete')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Errore durante la verifica'
      toast.error(message)
    } finally {
      setSubmitting(false)
    }
  }

  const [submitting, setSubmitting] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-foreground" />
          <p className="text-sm text-muted-foreground">Caricamento in corso…</p>
        </div>
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
                <span className="text-xl font-bold tracking-tight hidden sm:block font-serif">Greenlight</span>
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary">
                <CreditCard className="w-4 h-4" />
                <span className="text-sm font-medium capitalize">
                  {user?.plan?.toLowerCase() || 'free'}
                </span>
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
        <main className="pt-24 pb-8 px-6 md:px-8">
          <div className="max-w-6xl mx-auto space-y-6">
            {/* KPI Bar */}
            {stats && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="grid grid-cols-1 md:grid-cols-4 gap-4"
              >
                <KpiCard
                  label="Piano"
                  value={stats.plan}
                  icon={<CreditCard className="w-5 h-5" />}
                  color="neutral"
                />
                <KpiCard
                  label="Verifiche usate questo mese"
                  value={`${stats.used} / ${stats.limit}`}
                  icon={<Search className="w-5 h-5" />}
                  progress={stats.limit > 0 ? (stats.used / stats.limit) * 100 : 0}
                  color="verde"
                />
                <KpiCard
                  label="Rimangono"
                  value={stats.remaining.toString()}
                  icon={<RefreshCw className="w-5 h-5" />}
                  color="arancio"
                />
                <KpiCard
                  label="Affidabili (Verde)"
                  value={(stats.byStatus?.VERDE || 0).toString()}
                  icon={<CheckCircle className="w-5 h-5 text-semantic-verde" />}
                  color="verde"
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
                  <CreditCheckForm onSubmit={handleSubmit} submitting={submitting} />
                </TabsContent>

                {/* Storico */}
                <TabsContent value="history" className="p-6">
                  {checks.length === 0 ? (
                    <EmptyState
                      title="Nessuna verifica ancora."
                      description="La tua prima verifica ti dice se puoi fidarti di un nuovo cliente."
                      actionLabel="Fai la tua prima verifica"
                      onAction={() => setActiveTab('new')}
                      icon={<CreditScoreGauge status="PENDING" size="md" ignite />}
                    />
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
                                { key: 'VERDE', label: 'Affidabile', color: 'text-semantic-verde' },
                                { key: 'GIALLO', label: 'Attenzione', color: 'text-semantic-giallo' },
                                { key: 'ARANCIONE', label: 'Rischio Medio', color: 'text-semantic-arancio' },
                                { key: 'ROSSO', label: 'Alto Rischio', color: 'text-semantic-rosso' },
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
                                  <span className="font-medium text-semantic-verde">{stats.remaining}</span>
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
