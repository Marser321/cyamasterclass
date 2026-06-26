import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

/** Pastilla pequeña (etiqueta de rol, precio o estado). Sobria, sin hype. */
export function Badge({
  children,
  tone = 'olive',
  className,
}: {
  children: ReactNode
  tone?: 'olive' | 'petrol' | 'smoke' | 'ivory'
  className?: string
}) {
  // Sistema oscuro-lujo: los acentos olive/petrol se re-tintan a dorado sobre navy.
  const toneClass = {
    olive: 'bg-gold/12 text-gold ring-gold/25',
    petrol: 'bg-gold/12 text-gold ring-gold/25',
    smoke: 'bg-white/8 text-ivory/70 ring-white/15',
    ivory: 'bg-white/10 text-ivory ring-white/20',
  }[tone]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ring-1',
        toneClass,
        className,
      )}
    >
      {children}
    </span>
  )
}
