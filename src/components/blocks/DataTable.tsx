import type { ReactNode } from 'react'
import { Reveal } from '../motion/Reveal'
import { Footnote } from '../primitives/Footnote'
import { cn } from '../../lib/cn'

export type DataColumn = { key: string; header: string; align?: 'left' | 'right'; emphasis?: boolean }
export type DataRow = { id?: string; highlight?: boolean; struck?: boolean } & Record<string, ReactNode>

/**
 * Tabla de datos semántica y sobria (desgloses, value stacks, comparaciones,
 * referencias de mercado). Números con tabular-nums. tone-aware. El `footnote`
 * enruta a <Footnote/> para el disclaimer de compliance de cualquier cifra.
 */
export function DataTable({
  columns,
  rows,
  caption,
  footnote,
  tone = 'light',
  className,
}: {
  columns: DataColumn[]
  rows: DataRow[]
  caption?: string
  footnote?: string
  tone?: 'light' | 'dark'
  className?: string
}) {
  const dark = tone === 'dark'
  return (
    <Reveal className={className}>
      <div
        className={cn(
          'overflow-hidden rounded-2xl border',
          dark ? 'border-white/10 bg-white/[0.04]' : 'border-gold/15 bg-navy-soft shadow-glass-dark',
        )}
      >
        <table className="w-full border-collapse text-left">
          {caption && (
            <caption className={cn('px-5 pt-4 text-left text-[13px]', dark ? 'text-ivory/70' : 'text-ivory/55')}>
              {caption}
            </caption>
          )}
          <thead>
            <tr className={cn('border-b', dark ? 'border-white/10' : 'border-white/10')}>
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className={cn(
                    'px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.12em]',
                    c.align === 'right' ? 'text-right' : 'text-left',
                    dark ? 'text-ivory/65' : 'text-ivory/65',
                  )}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr
                key={r.id ?? i}
                className={cn(
                  'border-b last:border-0',
                  dark ? 'border-white/[0.06]' : 'border-white/[0.06]',
                  r.highlight && (dark ? 'bg-gold/15' : 'bg-gold/[0.10]'),
                )}
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cn(
                      'px-5 py-3 align-baseline text-[14px]',
                      c.align === 'right' ? 'text-right tabular-nums' : 'text-left',
                      c.emphasis
                        ? cn('font-display', dark ? 'text-ivory' : 'text-ivory')
                        : dark
                          ? 'text-ivory/85'
                          : 'text-ivory/85',
                      r.struck && 'text-ivory/55 line-through',
                    )}
                  >
                    {r[c.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {footnote && (
        <div className="mt-2">
          <Footnote tone={dark ? 'dark' : 'light'}>{footnote}</Footnote>
        </div>
      )}
    </Reveal>
  )
}
