import * as React from 'react'
import { Button } from '@/components/ui/Button'

interface EmptyStateProps {
  title: string
  description: string
  actionLabel: string
  onAction: () => void
  icon?: React.ReactNode
}

export function EmptyState({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <div className="w-16 h-16 rounded-lg bg-muted/50 flex items-center justify-center mx-auto mb-4 text-muted-foreground/50">
        {icon ?? <span className="w-8 h-8" />}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-md mx-auto">
        {description}
      </p>
      <Button onClick={onAction}>{actionLabel}</Button>
    </div>
  )
}
