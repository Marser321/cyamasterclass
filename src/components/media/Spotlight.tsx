import { useEffect } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'
import { useIsCoarsePointer } from '../../lib/useIsCoarsePointer'

/**
 * Luz radial sutil que sigue el cursor sobre secciones oscuras. Da vida sin
 * hype. Off en reduced-motion / touch (queda un glow estático centrado).
 */
export function Spotlight({
  color = 'rgba(201,162,75,0.14)',
  size = 460,
}: {
  color?: string
  size?: number
}) {
  const reduce = useReducedMotion()
  const coarse = useIsCoarsePointer()
  const disabled = Boolean(reduce) || coarse
  const mx = useMotionValue(50)
  const my = useMotionValue(30)
  const x = useSpring(mx, { stiffness: 60, damping: 20 })
  const y = useSpring(my, { stiffness: 60, damping: 20 })
  const bg = useMotionTemplate`radial-gradient(${size}px circle at ${x}% ${y}%, ${color}, transparent 70%)`

  useEffect(() => {
    if (disabled) return
    const onMove = (e: PointerEvent) => {
      mx.set((e.clientX / window.innerWidth) * 100)
      my.set((e.clientY / window.innerHeight) * 100)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [disabled, mx, my])

  if (disabled) {
    return (
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(${size}px circle at 50% 25%, ${color}, transparent 70%)` }}
      />
    )
  }

  return <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: bg }} />
}
