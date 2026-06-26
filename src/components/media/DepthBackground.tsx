import type { ReactNode } from 'react'
import { useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from 'framer-motion'
import { cn } from '../../lib/cn'
import { parallax } from '../../theme/tokens'
import { useIsCoarsePointer } from '../../lib/useIsCoarsePointer'

export type DepthLayer = {
  node: ReactNode
  /** 0 = fondo lejano (se mueve poco) · 1 = capa al frente (se mueve más). */
  depth?: number
  className?: string
}

/**
 * Fondo de profundidad: capas que reaccionan al puntero a distinta velocidad
 * (parallax). Da volumen al hero/divisores. Guardarraíles: reduced-motion y
 * touch/móvil → capas estáticas (perf + decisión de marca).
 */
export function DepthBackground({ layers, className }: { layers: DepthLayer[]; className?: string }) {
  const reduce = useReducedMotion()
  const coarse = useIsCoarsePointer()
  const disabled = Boolean(reduce) || coarse
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, parallax.spring)
  const sy = useSpring(py, parallax.spring)

  useEffect(() => {
    if (disabled) return
    const onMove = (e: PointerEvent) => {
      px.set(e.clientX / window.innerWidth - 0.5)
      py.set(e.clientY / window.innerHeight - 0.5)
    }
    const onLeave = () => {
      px.set(0)
      py.set(0)
    }
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerleave', onLeave)
    }
  }, [disabled, px, py])

  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      {layers.map((l, i) => (
        <ParallaxLayer key={i} sx={sx} sy={sy} depth={l.depth ?? 0} disabled={disabled} className={l.className}>
          {l.node}
        </ParallaxLayer>
      ))}
    </div>
  )
}

function ParallaxLayer({
  sx,
  sy,
  depth,
  disabled,
  className,
  children,
}: {
  sx: MotionValue<number>
  sy: MotionValue<number>
  depth: number
  disabled: boolean
  className?: string
  children: ReactNode
}) {
  const amp = parallax.amplitude
  const x = useTransform(sx, (v) => v * depth * amp)
  const y = useTransform(sy, (v) => v * depth * amp)

  if (disabled) {
    return <div className={cn('absolute inset-0', className)}>{children}</div>
  }

  return (
    <motion.div
      className={cn('absolute inset-0', className)}
      style={{ x, y, scale: parallax.layerScale + depth * 0.04 }}
    >
      {children}
    </motion.div>
  )
}
