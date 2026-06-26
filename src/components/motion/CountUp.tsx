import { useEffect, useRef, useState } from 'react'
import { useInView, useReducedMotion } from 'framer-motion'
import { ease } from '../../theme/tokens'

/**
 * Cuenta animada hacia `value` cuando entra en viewport. Reduced-motion → valor
 * final directo. NO usar para sugerir ganancia/retorno (regla de compliance):
 * sólo para cifras de proceso (capital de entrada, fases, etc.).
 */
export function CountUp({
  value,
  duration = 1.1,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}: {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    let raf = 0
    const start = performance.now()
    const cubic = (t: number) => 1 + (--t) * t * t * t * t // approx ease-out
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / (duration * 1000))
      setDisplay(value * cubic(t))
      if (t < 1) raf = requestAnimationFrame(tick)
      else setDisplay(value)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduce, value, duration])

  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}

// (ease se reexporta para que consumidores afinen curvas si lo necesitan)
export { ease }
