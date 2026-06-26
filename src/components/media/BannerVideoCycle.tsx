import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { Img } from './Img'
import { useIsCoarsePointer } from '../../lib/useIsCoarsePointer'

/**
 * Banner de video en BUCLE: al entrar reproduce el flyer animado del dispositivo
 * y lo repite de forma continua (atributo nativo `loop`), sin pausas.
 *
 * Degradaciones seguras (espejo de VideoBackground):
 *  • móvil/táctil → fuente `vertical` (retrato 9:16); desktop → `horizontal` (16:9).
 *    Solo se monta UNA fuente (no descarga las dos).
 *  • reduced-motion → no reproduce ni cicla; deja el último fotograma fijo.
 *  • fuera de viewport → pausa (IntersectionObserver) y reanuda al volver.
 *  • onError → cae al placeholder elegante de <Img> (la demo nunca se rompe).
 * El <video> va `muted playsInline` (autoplay permitido al estar muteado). Se usa
 * `src` como atributo (no <source>): al cambiar de orientación, el navegador
 * recarga y reanuda solo, sin un load() manual que aborte el autoplay.
 */
export function BannerVideoCycle({
  horizontal,
  vertical,
  alt,
  fill = false,
  className,
}: {
  horizontal: string
  vertical: string
  alt: string
  /** Llena su contenedor (h-full) con object-contain, sin caja ni aspecto fijo —
   *  para el hero a-pantalla: el flyer se ve COMPLETO ajustándose a la altura. */
  fill?: boolean
  className?: string
}) {
  const reduce = useReducedMotion()
  const coarse = useIsCoarsePointer()
  const ref = useRef<HTMLVideoElement>(null)
  const [failed, setFailed] = useState(false)

  const src = coarse ? vertical : horizontal
  // Aspecto igualado a la fuente para que object-cover no recorte el flyer.
  const ratioClass = coarse ? 'aspect-[9/16]' : 'aspect-video'

  // Pausa fuera de viewport y reanuda al volver (ahorra batería/CPU).
  // (También arranca el autoplay inicial si el navegador no lo disparó solo.)
  useEffect(() => {
    if (reduce || failed) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (el.paused) el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.2 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduce, failed, src])

  if (failed) {
    return (
      <Img
        src={undefined}
        alt={alt}
        label={alt}
        className={cn(fill ? 'h-full w-full' : ratioClass, className)}
        kenBurns={false}
      />
    )
  }

  return (
    <div
      className={cn(
        'relative overflow-hidden',
        fill ? 'h-full w-full' : 'rounded-2xl bg-charcoal-soft gold-hairline shadow-glass-dark',
        fill ? null : ratioClass,
        className,
      )}
    >
      <video
        ref={ref}
        key={src}
        src={src}
        muted
        playsInline
        loop={!reduce}
        autoPlay={!reduce}
        preload="auto"
        aria-label={alt}
        onLoadedMetadata={(e) => {
          // reduced-motion: no se reproduce → muestra el último fotograma (el flyer
          // ya armado) en vez de quedar en negro.
          if (reduce) {
            const el = e.currentTarget
            if (Number.isFinite(el.duration)) el.currentTime = Math.max(0, el.duration - 0.05)
          }
        }}
        onError={() => setFailed(true)}
        className={cn('h-full w-full', fill ? 'object-contain' : 'object-cover')}
      />
    </div>
  )
}
