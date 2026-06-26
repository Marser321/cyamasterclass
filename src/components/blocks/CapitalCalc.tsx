import { useState } from 'react'
import { Footnote } from '../primitives/Footnote'
import { cn } from '../../lib/cn'

type Row = { key: string; label: string; min: number; max: number; step: number; value: number }

const INITIAL: Row[] = [
  { key: 'puja', label: 'Puja (abre en la deuda fiscal)', min: 500, max: 12000, step: 100, value: 3500 },
  { key: 'fees', label: 'Fees del condado', min: 100, max: 3000, step: 50, value: 800 },
  { key: 'title', label: 'Title work / saneamiento', min: 0, max: 4000, step: 100, value: 1500 },
  { key: 'contingencia', label: 'Contingencia / holding', min: 0, max: 5000, step: 100, value: 1800 },
]

/**
 * Simulador del CAPITAL DE ENTRADA (no de ganancia). Suma puja + fees + title +
 * contingencia. El intensivo no incluye este capital: te enseña a estimarlo y a
 * no sobre-extenderte. Compliance: jamás proyecta retorno.
 */
export function CapitalCalc({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const [rows, setRows] = useState<Row[]>(INITIAL)
  const dark = tone === 'dark'
  const total = rows.reduce((s, r) => s + r.value, 0)

  return (
    <div
      className={cn(
        'rounded-2xl border p-6',
        dark ? 'border-white/10 bg-white/[0.04]' : 'border-gold/15 bg-navy-soft shadow-glass-dark',
      )}
    >
      <div className="space-y-4">
        {rows.map((r, i) => (
          <label key={r.key} className="block">
            <div className="flex items-baseline justify-between gap-4">
              <span className={cn('text-[13.5px] font-medium', dark ? 'text-ivory/85' : 'text-ivory/85')}>
                {r.label}
              </span>
              <span className={cn('font-display text-sm tabular-nums', dark ? 'text-ivory' : 'text-ivory')}>
                ${r.value.toLocaleString('en-US')}
              </span>
            </div>
            <input
              type="range"
              min={r.min}
              max={r.max}
              step={r.step}
              value={r.value}
              onChange={(e) => {
                const v = Number(e.target.value)
                setRows((prev) => prev.map((x, idx) => (idx === i ? { ...x, value: v } : x)))
              }}
              className="mt-2 w-full accent-gold"
              aria-label={r.label}
            />
          </label>
        ))}
      </div>

      <div
        className={cn(
          'mt-5 flex items-baseline justify-between rounded-xl px-4 py-3',
          dark ? 'bg-gold/15' : 'bg-gold/[0.10]',
        )}
      >
        <span className={cn('text-[13px] font-semibold uppercase tracking-[0.1em]', dark ? 'text-gold' : 'text-gold')}>
          Capital de entrada estimado
        </span>
        <span className={cn('font-display text-2xl font-semibold tabular-nums', dark ? 'text-ivory' : 'text-ivory')}>
          ${total.toLocaleString('en-US')}
        </span>
      </div>

      <div className="mt-4">
        <Footnote tone={tone}>
          Estimación de costos de entrada con fines educativos — no es una proyección de ganancia. El
          intensivo no incluye este capital; te enseña a estimarlo. Las cifras varían por estado, condado y
          propiedad.
        </Footnote>
      </div>
    </div>
  )
}
