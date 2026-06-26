import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { Img, scrimClass, type Scrim } from './Img'
import { useIsCoarsePointer } from '../../lib/useIsCoarsePointer'

/**
 * Fondo de video cinematográfico en bucle, con degradaciones seguras:
 *  • sin `src` → muestra el `poster` vía <Img> (Ken Burns + scrim). Listo para
 *    recibir los loops M1–M5 cuando existan, SIN romper nada hoy.
 *  • reduced-motion o touch/móvil → no descarga ni reproduce video; muestra poster
 *    (perf, datos móviles, decisión de marca).
 *  • lazy: solo reproduce cuando está en viewport (IntersectionObserver).
 * El <video> va `muted loop playsInline` (autoplay permitido al estar muteado).
 */
export function VideoBackground({
  src,
  webm,
  poster,
  alt,
  focal = '50% 50%',
  scrim = 'none',
  className,
  priority = false,
}: {
  src?: string
  webm?: string
  poster: string
  alt: string
  focal?: string
  scrim?: Scrim
  className?: string
  priority?: boolean
}) {
  const reduce = useReducedMotion()
  const coarse = useIsCoarsePointer()
  const ref = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)
  const useVideo = Boolean(src) && !reduce && !coarse && !failed

  useEffect(() => {
    if (!useVideo) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {})
        else el.pause()
      },
      { threshold: 0.05 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [useVideo])

  // Fallback: imagen poster con el mismo tratamiento (scrim/Ken Burns).
  if (!useVideo) {
    return (
      <Img
        src={poster}
        alt={alt}
        focal={focal}
        scrim={scrim}
        className={className}
        priority={priority}
        kenBurns={!reduce}
      />
    )
  }

  return (
    <div className={cn('relative overflow-hidden bg-charcoal-soft', className)}>
      <video
        ref={ref}
        poster={poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt}
        onError={() => setFailed(true)}
        className="h-full w-full object-cover"
        style={{ objectPosition: focal }}
      >
        {webm && <source src={webm} type="video/webm" />}
        {src && <source src={src} type="video/mp4" />}
      </video>
      {scrim !== 'none' && <div className={cn('absolute inset-0', scrimClass[scrim])} />}
    </div>
  )
}
