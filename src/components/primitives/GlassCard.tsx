import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

/**
 * Tarjeta glass controlada. `tone='light'` sobre fondos marfil; `tone='dark'`
 * sobre secciones pizarra/petróleo. Glass con moderación (regla de marca).
 */
export function GlassCard({
  children,
  tone = 'light',
  className,
}: {
  children: ReactNode
  tone?: 'light' | 'dark' | 'solid'
  className?: string
}) {
  // Oscuro-lujo: todas las variantes son superficies navy con texto ivory.
  // `solid` = tarjeta navy elevada con hairline dorado; `light`/`dark` = glass.
  const toneClass =
    tone === 'dark'
      ? 'glass-dark text-ivory shadow-glass-dark'
      : tone === 'solid'
        ? 'bg-navy-soft border border-gold/15 text-ivory shadow-glass-dark'
        : 'glass-light text-ivory shadow-glass-dark'
  return <div className={cn('rounded-2xl p-6', toneClass, className)}>{children}</div>
}
