import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/cn'

export type Scrim = 'none' | 'left' | 'right' | 'bottom' | 'full' | 'top'

export const scrimClass: Record<Scrim, string> = {
  none: '',
  left: 'bg-gradient-to-r from-charcoal/90 via-charcoal/45 to-transparent',
  right: 'bg-gradient-to-l from-charcoal/90 via-charcoal/45 to-transparent',
  bottom: 'bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent',
  top: 'bg-gradient-to-b from-charcoal/80 via-charcoal/20 to-transparent',
  // Oscurecido fuerte: funde la foto de fondo casi del todo para máxima
  // legibilidad (lo usa el hero de la masterclass 01, con el video de protagonista).
  full: 'bg-midnight/85',
}

/** Placeholder elegante cuando la imagen aún no existe (no rompe la landing). */
function Placeholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-charcoal-soft text-center grain">
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: 'repeating-linear-gradient(135deg, #F7F5F0 0 1px, transparent 1px 14px)',
        }}
      />
      <div className="relative z-10 max-w-[80%] px-4">
        <div className="mx-auto mb-3 h-8 w-8 rounded-full border border-gold/50" />
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-gold/80">
          Imagen pendiente
        </p>
        <p className="mt-1.5 text-[13px] leading-snug text-ivory/55">{label}</p>
      </div>
    </div>
  )
}

/**
 * Imagen con Ken Burns sutil (M1–M5), scrim para legibilidad y placeholder de
 * respaldo. `kenBurns=false` (o reduced-motion) → estática. Para retratos de
 * autoridad usar `kenBurns={false}` (la quietud transmite confianza).
 */
export function Img({
  src,
  alt,
  className,
  focal = '50% 50%',
  scrim = 'none',
  kenBurns = true,
  label,
  priority = false,
}: {
  src?: string
  alt: string
  className?: string
  focal?: string
  scrim?: Scrim
  kenBurns?: boolean
  label?: string
  priority?: boolean
}) {
  const reduce = useReducedMotion()
  const [failed, setFailed] = useState(false)
  const showPlaceholder = !src || failed
  const animate = kenBurns && !reduce

  return (
    <div className={cn('relative overflow-hidden bg-charcoal-soft', className)}>
      {showPlaceholder ? (
        <Placeholder label={label || alt} />
      ) : (
        <motion.img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
          style={{ objectPosition: focal }}
          initial={animate ? { scale: 1.05 } : false}
          animate={animate ? { scale: [1.05, 1.12] } : { scale: 1 }}
          transition={
            animate
              ? { duration: 20, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }
              : { duration: 0 }
          }
        />
      )}
      {scrim !== 'none' && <div className={cn('absolute inset-0', scrimClass[scrim])} />}
    </div>
  )
}
