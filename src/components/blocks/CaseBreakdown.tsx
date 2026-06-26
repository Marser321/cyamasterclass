import { Reveal } from '../motion/Reveal'
import { Footnote } from '../primitives/Footnote'
import { cn } from '../../lib/cn'

export type CaseLine = { label: string; amount: string; hint?: string }

/**
 * Desglose del caso real (p. ej. $7,500 Washington County, PA). Muestra COSTOS y
 * PROCESO, nunca ganancia/retorno. La etiqueta de compliance es obligatoria.
 */
export function CaseBreakdown({
  lines,
  total,
  totalLabel = 'Capital de entrada estimado',
  footnote,
  tone = 'dark',
}: {
  lines: CaseLine[]
  total: string
  totalLabel?: string
  footnote: string
  tone?: 'light' | 'dark'
}) {
  const dark = tone === 'dark'
  return (
    <div
      className={cn(
        'rounded-2xl border p-6',
        dark ? 'border-white/10 bg-white/[0.04]' : 'border-gold/15 bg-navy-soft shadow-glass-dark',
      )}
    >
      <dl className="divide-y divide-current/10">
        {lines.map((l, i) => (
          <Reveal key={l.label} delay={i * 0.05}>
            <div className="flex items-baseline justify-between gap-4 py-2.5">
              <div>
                <dt className={cn('text-[14px] font-medium', dark ? 'text-ivory/85' : 'text-ivory/85')}>
                  {l.label}
                </dt>
                {l.hint && (
                  <p className={cn('text-[12px]', dark ? 'text-ivory/65' : 'text-ivory/55')}>{l.hint}</p>
                )}
              </div>
              <dd className={cn('font-display text-base tabular-nums', dark ? 'text-ivory' : 'text-ivory')}>
                {l.amount}
              </dd>
            </div>
          </Reveal>
        ))}
        <div className="flex items-baseline justify-between gap-4 pt-3.5">
          <dt className={cn('text-[13px] font-semibold uppercase tracking-[0.1em]', dark ? 'text-gold' : 'text-gold')}>
            {totalLabel}
          </dt>
          <dd className={cn('font-display text-2xl font-semibold tabular-nums', dark ? 'text-ivory' : 'text-ivory')}>
            {total}
          </dd>
        </div>
      </dl>
      <div className="mt-4">
        <Footnote tone={tone}>{footnote}</Footnote>
      </div>
    </div>
  )
}
