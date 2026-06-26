import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

/**
 * Nota al pie de una cifra/caso fuerte. SIEMPRE acompaña a claims con número
 * (98%, $7,500, 0% APR, $30–100k…) con su etiqueta obligatoria de compliance.
 * `tone='dark'` para usarla sobre secciones pizarra.
 */
export function Footnote({
  children,
  tone = 'light',
  className,
}: {
  children: ReactNode
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <p
      className={cn(
        'text-[12px] leading-snug',
        tone === 'dark' ? 'text-ivory/70' : 'text-ivory/55',
        className,
      )}
    >
      <span aria-hidden className="mr-1 text-gold">
        ⁕
      </span>
      {children}
    </p>
  )
}
