import type { ReactNode } from 'react'
import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useIsCoarsePointer } from '../../lib/useIsCoarsePointer'

/**
 * Envuelve un CTA y le da un "tirón magnético" sutil hacia el cursor (momento
 * táctil premium). Solo desktop: reduced-motion / touch → estático, sin efecto.
 * `strength` = desplazamiento máximo en px.
 */
export function Magnetic({
  children,
  strength = 6,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const coarse = useIsCoarsePointer()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })
  const ref = useRef<HTMLSpanElement>(null)

  if (Boolean(reduce) || coarse) {
    return <span className={className}>{children}</span>
  }

  const clamp = (v: number) => Math.max(-1, Math.min(1, v))
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    x.set(clamp((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * strength)
    y.set(clamp((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * strength)
  }
  const reset = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.span
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy, display: 'inline-block' }}
      className={className}
    >
      {children}
    </motion.span>
  )
}
