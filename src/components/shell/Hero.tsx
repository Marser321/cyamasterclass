import type { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Container } from '../primitives/Container'
import { VideoBackground, type Scrim } from '../media'
import { DepthBackground } from '../media'
import { Spotlight } from '../media'
import { DEADLINES } from '../../content/brand'
import { cn } from '../../lib/cn'

type HeroTone = 'charcoal' | 'petrol' | 'ivory'

/**
 * Shell de hero: imagen de fondo (Ken Burns + scrim) con parallax opcional,
 * spotlight en tonos oscuros y contenedor con padding para la barra fija.
 * El contenido (titular, form, CTAs) va como children.
 */
export function Hero({
  image,
  tone = 'charcoal',
  parallax = true,
  fillViewport = false,
  children,
  className,
}: {
  image?: { src: string; alt: string; focal?: string; scrim?: Scrim; video?: string; webm?: string }
  tone?: HeroTone
  parallax?: boolean
  /** El hero ocupa ~una pantalla (min-h-svh, columna flex) — para que el video y
   *  el CTA quepan en el primer pantallazo móvil. */
  fillViewport?: boolean
  children: ReactNode
  className?: string
}) {
  const dark = tone !== 'ivory'
  // Oscuro-lujo: todos los tonos del hero son superficies oscuras (navy/midnight).
  const toneClass =
    tone === 'charcoal' ? 'bg-midnight text-ivory' : tone === 'petrol' ? 'bg-navy text-ivory' : 'bg-navy text-ivory'

  // Quitada la barra de demo (LandingChrome). El único elemento fijo arriba es la
  // UrgencyBar, y solo en rutas con deadline (01/03): ahí el hero la despeja; en el
  // resto arranca cerca del borde con un respiro.
  const { pathname } = useLocation()
  const hasBar = Boolean(DEADLINES[pathname])

  // Drop-in: VideoBackground muestra el poster (la imagen) hoy; cuando se generen
  // los loops M1–M5 basta con pasar `image.video` y reproduce el bucle cinematográfico.
  const bg = image && (
    <VideoBackground
      src={image.video}
      webm={image.webm}
      poster={image.src}
      alt={image.alt}
      focal={image.focal}
      scrim={image.scrim ?? (dark ? 'left' : 'none')}
      priority
      className="h-full w-full"
    />
  )

  return (
    <section className={cn('relative isolate overflow-hidden grain', toneClass, className)}>
      {image &&
        (parallax ? (
          <DepthBackground layers={[{ node: bg, depth: 0.35 }]} />
        ) : (
          <div className="absolute inset-0">{bg}</div>
        ))}
      {dark && <Spotlight />}
      <Container
        className={cn(
          fillViewport
            ? 'flex min-h-svh flex-col pt-16 pb-8 sm:pt-20'
            : cn('pb-16 sm:pb-24', hasBar ? 'pt-24 sm:pt-28' : 'pt-14 sm:pt-20'),
        )}
      >
        {children}
      </Container>
    </section>
  )
}
