import type { ReactNode } from 'react'
import { Stagger, RevealItem } from '../motion/Reveal'
import { cn } from '../../lib/cn'

export type TrustItem = { icon?: ReactNode; text: string }

/** Barra de confianza: 4 señales sobrias con ícono mínimo. */
export function TrustBar({ items, tone = 'light' }: { items: TrustItem[]; tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  return (
    <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" gap={0.07}>
      {items.map((it) => (
        <RevealItem key={it.text}>
          <div
            className={cn(
              'flex h-full items-start gap-3 rounded-xl border px-4 py-3.5',
              dark ? 'border-white/10 bg-white/[0.03]' : 'border-gold/15 bg-navy-soft/60',
            )}
          >
            {it.icon && (
              <span className={cn('mt-0.5 text-lg', dark ? 'text-gold' : 'text-gold')}>{it.icon}</span>
            )}
            <span className={cn('text-[13.5px] font-medium leading-snug', dark ? 'text-ivory/80' : 'text-ivory/80')}>
              {it.text}
            </span>
          </div>
        </RevealItem>
      ))}
    </Stagger>
  )
}
