import * as React from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/Card'
import { Progress } from '@/components/ui/Progress'

interface KpiCardProps {
  label: string
  value: string
  icon: React.ReactNode
  progress?: number
  color?: 'verde' | 'giallo' | 'arancio' | 'rosso' | 'neutral'
}

const COLOR_CLASS: Record<string, string> = {
  verde: 'text-semantic-verde',
  giallo: 'text-semantic-giallo',
  arancio: 'text-semantic-arancio',
  rosso: 'text-semantic-rosso',
  neutral: 'text-foreground',
}

export function KpiCard({
  label,
  value,
  icon,
  progress,
  color = 'neutral',
}: KpiCardProps) {
  return (
    <Card className="border-border bg-card">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
            {progress !== undefined && (
              <div className="mt-3 flex items-center gap-2">
                <Progress value={progress} className="h-1.5 w-32" />
                <span className="text-xs text-muted-foreground">
                  {progress.toFixed(0)}%
                </span>
              </div>
            )}
          </div>
          <div
            className={cn(
              'p-2 rounded-lg bg-secondary',
              COLOR_CLASS[color]
            )}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
