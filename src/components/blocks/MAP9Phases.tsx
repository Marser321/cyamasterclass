import { motion } from 'framer-motion'
import { ease, stagger } from '../../theme/tokens'
import { cn } from '../../lib/cn'

/**
 * Las 9 fases del Método MAP-9. El filtrado forense (fases 5–9: ambientales,
 * criminalidad, comparables, riesgos legales, inspección) es el corazón —
 * "primero, qué NO comprar". Ilustra PROCESO, no resultado.
 *
 * - Standalone: revela las 9 al entrar en viewport (stagger).
 * - Pinned (`revealedUpTo`): controlado por el scroll (PinnedSequence).
 */
const FORENSIC_FROM = 4 // índices 4..8 = fases 5–9 (el filtro)

export function MAP9Phases({
  phases,
  revealedUpTo,
  tone = 'light',
  className,
}: {
  phases: readonly string[]
  revealedUpTo?: number
  tone?: 'light' | 'dark'
  className?: string
}) {
  const controlled = revealedUpTo !== undefined
  const upTo = revealedUpTo ?? phases.length - 1

  const Grid = controlled ? 'div' : motion.div
  const gridProps = controlled
    ? {}
    : ({
        initial: 'hidden',
        whileInView: 'show',
        viewport: { once: true, margin: '-12% 0px' },
        variants: stagger(0.08),
      } as const)

  return (
    <Grid className={cn('grid grid-cols-2 gap-2.5 sm:grid-cols-3', className)} {...gridProps}>
      {phases.map((p, i) => {
        const isFilter = i >= FORENSIC_FROM
        const revealed = i <= upTo
        // Oscuro-lujo: todo sobre navy; el filtro forense (corazón) se destaca en dorado.
        const surface = isFilter ? 'border-gold/35 bg-gold/[0.09]' : 'border-white/10 bg-white/[0.04]'
        const numColor = isFilter ? 'text-gold' : 'text-ivory/35'
        const labelColor = 'text-ivory/85'

        const common = cn('rounded-xl border p-3 transition-all duration-500', surface)

        if (controlled) {
          return (
            <motion.div
              key={p}
              className={common}
              animate={{ opacity: revealed ? 1 : 0.18, y: revealed ? 0 : 8, scale: revealed ? 1 : 0.97 }}
              transition={{ duration: 0.4, ease: ease.out }}
            >
              <PhaseBody i={i} p={p} numColor={numColor} labelColor={labelColor} isFilter={isFilter} tone={tone} />
            </motion.div>
          )
        }
        return (
          <motion.div
            key={p}
            className={common}
            variants={{
              hidden: { opacity: 0, y: 12, scale: 0.96 },
              show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: ease.out } },
            }}
          >
            <PhaseBody i={i} p={p} numColor={numColor} labelColor={labelColor} isFilter={isFilter} tone={tone} />
          </motion.div>
        )
      })}
    </Grid>
  )
}

function PhaseBody({
  i,
  p,
  numColor,
  labelColor,
  isFilter,
  tone,
}: {
  i: number
  p: string
  numColor: string
  labelColor: string
  isFilter: boolean
  tone: 'light' | 'dark'
}) {
  return (
    <>
      <div className="flex items-center justify-between">
        <span className={cn('font-display text-lg font-semibold tabular-nums', numColor)}>
          {String(i + 1).padStart(2, '0')}
        </span>
        {isFilter && (
          <span
            className={cn(
              'rounded-full px-1.5 py-0.5 text-[8.5px] font-semibold uppercase tracking-[0.1em]',
              'bg-gold/15 text-gold',
            )}
          >
            filtro
          </span>
        )}
      </div>
      <div className={cn('mt-1 text-[12.5px] font-medium leading-tight', labelColor)}>{p}</div>
    </>
  )
}
