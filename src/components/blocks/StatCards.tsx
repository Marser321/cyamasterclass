import { Stagger, RevealItem } from '../motion/Reveal'
import { Footnote } from '../primitives/Footnote'
import { cn } from '../../lib/cn'

export type Stat = { value: string; label: string; footnote?: string }

/** Tarjetas de dato sobrias (p. ej. contexto del problema). Cifra grande + etiqueta. */
export function StatCards({ stats, tone = 'light' }: { stats: Stat[]; tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  return (
    <Stagger className="grid gap-4 sm:grid-cols-3">
      {stats.map((s) => (
        <RevealItem key={s.label}>
          <div
            className={cn(
              'h-full rounded-2xl border p-5',
              dark ? 'border-white/10 bg-white/[0.04]' : 'border-gold/15 bg-navy-soft shadow-glass-dark',
            )}
          >
            <div className={cn('font-display text-3xl font-semibold tracking-tightest', dark ? 'text-ivory' : 'text-gold')}>
              {s.value}
            </div>
            <div className={cn('mt-1 text-[14px] leading-snug', dark ? 'text-ivory/70' : 'text-ivory/75')}>
              {s.label}
            </div>
            {s.footnote && (
              <div className="mt-2">
                <Footnote tone={tone}>{s.footnote}</Footnote>
              </div>
            )}
          </div>
        </RevealItem>
      ))}
    </Stagger>
  )
}
