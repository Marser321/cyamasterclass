import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ease } from '../../theme/tokens'
import { cn } from '../../lib/cn'

export type Pole = { eyebrow: string; title: string; sub: string }

/**
 * El mecanismo dual: la oportunidad (Argenis) y el capital (Carmen) entran desde
 * lados opuestos y convergen en un sistema. Es la diferenciación de marca hecha
 * animación.
 * - Standalone: secuencia auto al entrar en viewport.
 * - Pinned (`stage` 0..2): controlado por scroll (0 izq · 1 der · 2 converge).
 */
export function DualMechanism({
  left,
  right,
  center,
  stage,
}: {
  left: Pole
  right: Pole
  center: string
  stage?: number
}) {
  const pinned = stage !== undefined
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px' })
  const started = pinned ? true : inView

  const showLeft = pinned ? (stage as number) >= 0 : started
  const showRight = pinned ? (stage as number) >= 1 : started
  const showConverge = pinned ? (stage as number) >= 2 : started

  const card = 'rounded-2xl glass-dark p-5'

  return (
    <div ref={ref} className="relative mx-auto flex w-full max-w-xl flex-col items-stretch gap-3">
      {/* Pilar A — la oportunidad (izquierda) */}
      <motion.div
        className={card}
        initial={{ opacity: 0, x: -32 }}
        animate={showLeft ? { opacity: 1, x: 0 } : { opacity: 0.25, x: -32 }}
        transition={{ duration: 0.55, ease: ease.out, delay: pinned ? 0 : 0.05 }}
      >
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold/85">{left.eyebrow}</div>
        <div className="mt-1 font-display text-xl font-semibold text-ivory">{left.title}</div>
        <p className="mt-1 text-[13.5px] leading-snug text-ivory/65">{left.sub}</p>
      </motion.div>

      {/* Conector + signo de unión */}
      <div className="relative flex h-7 items-center justify-center">
        <motion.span
          aria-hidden
          className="absolute h-7 w-px bg-gold/50"
          initial={{ scaleY: 0 }}
          animate={showRight ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.4, ease: ease.out, delay: pinned ? 0 : 0.55 }}
          style={{ originY: 0 }}
        />
        <motion.span
          className="relative grid h-7 w-7 place-items-center rounded-full bg-gold/15 font-display text-base text-gold ring-1 ring-gold/30"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={showRight ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.35, ease: ease.out, delay: pinned ? 0.05 : 0.75 }}
        >
          +
        </motion.span>
      </div>

      {/* Pilar B — el capital (derecha) */}
      <motion.div
        className={card}
        initial={{ opacity: 0, x: 32 }}
        animate={showRight ? { opacity: 1, x: 0 } : { opacity: 0.25, x: 32 }}
        transition={{ duration: 0.55, ease: ease.out, delay: pinned ? 0 : 0.3 }}
      >
        <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold/85">{right.eyebrow}</div>
        <div className="mt-1 font-display text-xl font-semibold text-ivory">{right.title}</div>
        <p className="mt-1 text-[13.5px] leading-snug text-ivory/65">{right.sub}</p>
      </motion.div>

      {/* Convergencia → un sistema */}
      <motion.div
        className="mt-1 rounded-2xl bg-gold/12 px-5 py-3.5 text-center ring-1 ring-gold/35"
        initial={{ opacity: 0, y: 12 }}
        animate={showConverge ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ duration: 0.5, ease: ease.out, delay: pinned ? 0.05 : 1 }}
      >
        <span className="font-display text-lg font-semibold text-ivory">{center}</span>
      </motion.div>
    </div>
  )
}

/** Versión etiquetada de los pasos para narrar la secuencia pinned. */
export const DUAL_STEP_LABELS = ['La oportunidad', 'El capital', 'Un sistema completo'] as const
