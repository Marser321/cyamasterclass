import { Reveal } from '../motion/Reveal'
import { cn } from '../../lib/cn'

type Step = { id: string; name: string; price: string }

const STEPS: Step[] = [
  { id: 'masterclass', name: 'Masterclass', price: 'Gratis' },
  { id: 'comunidad', name: 'Comunidad', price: '$27/mes' },
  { id: 'intensivo', name: 'Intensivo MAP-9', price: '$297' },
  { id: 'mentoria', name: 'Mentoría 1:1', price: '$3,997' },
]

/**
 * Mini-mapa del funnel: dónde encaja el paso actual, sin saltos forzados.
 * `current` resalta el nivel; sobrio, sin presión.
 */
export function FunnelMap({ current, tone = 'light' }: { current?: string; tone?: 'light' | 'dark' }) {
  const dark = tone === 'dark'
  return (
    <Reveal>
      <ol className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-0">
        {STEPS.map((s, i) => {
          const active = s.id === current
          return (
            <li key={s.id} className="flex flex-1 items-center gap-2 sm:flex-col sm:gap-0">
              <div
                className={cn(
                  'w-full rounded-xl border px-4 py-3 text-center transition-colors',
                  active ? 'border-gold/45 bg-gold/12' : 'border-white/10 bg-white/[0.03]',
                )}
              >
                <div
                  className={cn(
                    'text-[13px] font-semibold',
                    active ? 'text-gold' : 'text-ivory/75',
                  )}
                >
                  {s.name}
                </div>
                <div className={cn('text-[12px]', dark ? 'text-ivory/65' : 'text-ivory/55')}>{s.price}</div>
              </div>
              {i < STEPS.length - 1 && (
                <span className={cn('shrink-0 px-1 sm:py-1', 'text-ivory/30')} aria-hidden>
                  <span className="hidden sm:inline">↓</span>
                  <span className="sm:hidden">→</span>
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </Reveal>
  )
}
