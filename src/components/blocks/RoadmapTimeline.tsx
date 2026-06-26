import { motion } from 'framer-motion'
import { ease } from '../../theme/tokens'
import { cn } from '../../lib/cn'

export type RoadmapModule = {
  n: string // "01"
  title: string
  weeks: string // "Semanas 1–2"
  who: 'argenis' | 'carmen' | 'ambos'
  points: string[]
}

const whoLabel: Record<RoadmapModule['who'], string> = {
  argenis: 'Argenis · oportunidad',
  carmen: 'Carmen · capital',
  ambos: 'Argenis & Carmen',
}

/**
 * Roadmap de la mentoría (3 módulos). Justifica el high-ticket mostrando el
 * recorrido, no prometiendo resultados.
 * - Standalone: revela los 3 módulos en cascada al entrar en viewport.
 * - Pinned (`active` 0..n-1): resalta el módulo activo según el scroll.
 */
export function RoadmapTimeline({
  modules,
  active,
  tone = 'dark',
}: {
  modules: RoadmapModule[]
  active?: number
  tone?: 'light' | 'dark'
}) {
  const controlled = active !== undefined
  const dark = tone === 'dark'

  return (
    <ol className="relative mx-auto max-w-2xl space-y-4 pl-8">
      {/* Riel vertical */}
      <span
        aria-hidden
        className={cn('absolute left-[11px] top-2 bottom-2 w-px', dark ? 'bg-white/15' : 'bg-white/15')}
      />
      <motion.span
        aria-hidden
        className="absolute left-[11px] top-2 w-px origin-top bg-gold"
        initial={{ scaleY: 0 }}
        animate={controlled ? { scaleY: (active! + 1) / modules.length } : undefined}
        whileInView={controlled ? undefined : { scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: controlled ? 0.4 : 1.1, ease: ease.out }}
        style={{ bottom: 8 }}
      />

      {modules.map((m, i) => {
        const isActive = controlled ? i <= active! : true
        const isCurrent = controlled && i === active!
        return (
          <motion.li
            key={m.n}
            className="relative"
            initial={controlled ? false : { opacity: 0, y: 16 }}
            whileInView={controlled ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            animate={controlled ? { opacity: isActive ? 1 : 0.4 } : undefined}
            transition={{ duration: 0.5, ease: ease.out, delay: controlled ? 0 : i * 0.12 }}
          >
            <span
              className={cn(
                'absolute -left-8 top-1 grid h-6 w-6 place-items-center rounded-full font-display text-[11px] font-semibold ring-2 transition-colors',
                isCurrent
                  ? 'bg-gold text-midnight ring-gold/40'
                  : 'bg-navy-soft text-ivory/85 ring-white/15',
              )}
            >
              {m.n}
            </span>
            <div
              className={cn(
                'rounded-2xl border p-5 transition-all',
                isCurrent && 'ring-1 ring-gold/40',
                dark ? 'border-white/10 bg-white/[0.04]' : 'border-gold/15 bg-navy-soft shadow-glass-dark',
              )}
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <h4 className={cn('font-display text-lg font-semibold', dark ? 'text-ivory' : 'text-ivory')}>
                  {m.title}
                </h4>
                <span className={cn('text-[12px]', dark ? 'text-ivory/50' : 'text-ivory/50')}>{m.weeks}</span>
              </div>
              <div className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-gold">
                {whoLabel[m.who]}
              </div>
              <ul className={cn('mt-3 space-y-1.5 text-[13.5px] leading-snug', dark ? 'text-ivory/70' : 'text-ivory/75')}>
                {m.points.map((pt) => (
                  <li key={pt} className="flex gap-2">
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-gold/70" />
                    {pt}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        )
      })}
    </ol>
  )
}
