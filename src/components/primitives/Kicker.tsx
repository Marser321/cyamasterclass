import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

/** Antetítulo (eyebrow): etiqueta sobria en mayúsculas con tracking amplio. */
export function Kicker({
  children,
  className,
  as: As = 'p',
}: {
  children: ReactNode
  className?: string
  as?: 'p' | 'span' | 'div'
}) {
  return (
    <As
      className={cn(
        'text-[11px] font-semibold uppercase tracking-[0.2em] text-gold',
        className,
      )}
    >
      {children}
    </As>
  )
}
