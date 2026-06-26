import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/cn'

type Tone = 'petrol' | 'olive' | 'mixed'

// Manchas de luz del sistema oscuro-lujo (dorado metálico + navy), MUY tenues y
// difusas. Los nombres de tono se conservan (los pasa Section) pero el color es
// dorado cálido sobre azul profundo — el resplandor del flyer, sin saturar.
const palettes: Record<Tone, string[]> = {
  petrol: ['rgba(201,162,75,0.20)', 'rgba(15,32,54,0.55)'],
  olive: ['rgba(147,114,52,0.22)', 'rgba(15,32,54,0.50)'],
  mixed: ['rgba(201,162,75,0.20)', 'rgba(147,114,52,0.18)', 'rgba(15,32,54,0.55)'],
}

const spots = [
  { top: '-12%', left: '-8%', size: '58%' },
  { top: '28%', left: '58%', size: '52%' },
  { top: '64%', left: '12%', size: '46%' },
]

const drift = [
  { x: [0, 38, -22, 0], y: [0, -28, 18, 0] },
  { x: [0, -46, 18, 0], y: [0, 30, -20, 0] },
  { x: [0, 28, -38, 0], y: [0, -18, 28, 0] },
]

/**
 * Campo atmosférico: 2–3 manchas de luz que derivan MUY lento (26–38 s) detrás
 * del contenido, dando vida y profundidad a las secciones oscuras planas. Solo
 * transform/opacity (barato en GPU). Sobrio a propósito — no sugiere "ganancia".
 * Guardarraíles: reduced-motion → estático. `pointer-events-none`, `aria-hidden`.
 */
export function AuroraField({ className, tone = 'petrol' }: { className?: string; tone?: Tone }) {
  const reduce = useReducedMotion()
  const colors = palettes[tone]
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      {colors.map((c, i) => {
        const s = spots[i % spots.length]
        return (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl will-change-transform"
            style={{
              top: s.top,
              left: s.left,
              width: s.size,
              aspectRatio: '1 / 1',
              background: `radial-gradient(circle at center, ${c} 0%, transparent 66%)`,
            }}
            animate={reduce ? undefined : drift[i % drift.length]}
            transition={
              reduce
                ? undefined
                : { duration: 26 + i * 6, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }
            }
          />
        )
      })}
    </div>
  )
}
