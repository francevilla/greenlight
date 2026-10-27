import { cn } from '@/lib/utils'

interface SkeletonLineProps {
  width?: string | number
  className?: string
}

export function SkeletonLine({
  width = '100%',
  className,
}: SkeletonLineProps) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-muted/50 h-4 w-full',
        typeof width === 'string' ? `w-[${width}]` : `w-[${width}px]`,
        className
      )}
    />
  )
}
