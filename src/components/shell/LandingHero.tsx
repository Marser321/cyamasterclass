import type { ReactNode } from 'react'
import { Hero } from './Hero'
import { CountdownTimer } from '../blocks'
import { Img, BannerVideoCycle, type Scrim } from '../media'
import { DisplayHeading } from '../primitives'
import { Reveal } from '../motion'
import {
  RATIO_CLASS,
  USE_LANDING_BANNER,
  USE_BANNER_VIDEO,
  BANNER_VIDEO,
  type Ratio,
} from '../../content/images'
import { cn } from '../../lib/cn'

type HeroImage = { src: string; alt: string; focal?: string; scrim?: Scrim; video?: string; webm?: string }

/**
 * Hero móvil-first y consistente para las landings.
 *
 * Orden en TELÉFONO (forzado): contador → kicker → H1 → banner → sub → CTAs.
 * En DESKTOP, si se pasa `aside` (p. ej. el form de reserva), el hero pasa a 2
 * columnas (texto izq. / aside der.) — sin duplicar nodos (grid de 1→2 cols).
 *
 * Envuelve el <Hero> (foto de fondo a sangre + scrim + spotlight) y centraliza
 * la composición. La COPY la pasa cada landing (kicker/title/sub/actions) para que
 * `lint:copy` la siga cubriendo. El banner usa el placeholder elegante de <Img>
 * hasta que existan los PNG reales y `USE_LANDING_BANNER` se ponga en true.
 */
export function LandingHero({
  image,
  tone = 'charcoal',
  parallax = true,
  countdown,
  banner,
  kicker,
  title,
  sub,
  actions,
  aside,
  align = 'left',
  titleSize = 'xl',
  fillViewport = false,
  className,
}: {
  image?: HeroImage
  tone?: 'charcoal' | 'petrol' | 'ivory'
  parallax?: boolean
  /** Solo donde hay fecha real (masterclass, intensivo). */
  countdown?: { targetISO: string; label?: string; expiredLabel?: string }
  /** Banner enmarcado tras el H1. `src` se ignora hasta USE_LANDING_BANNER=true. */
  banner?: { src?: string; alt: string; ratio?: Ratio; focal?: string }
  kicker?: ReactNode
  title: ReactNode
  sub?: ReactNode
  actions?: ReactNode
  /** Columna derecha en desktop (p. ej. LeadForm); en móvil va debajo. */
  aside?: ReactNode
  align?: 'left' | 'center'
  titleSize?: 'lg' | 'xl'
  /** Hero a ~una pantalla: relojes+H1 arriba, video al medio (se ajusta) y CTA
   *  siempre visible abajo. El video va `fill` (object-contain, sin recorte). */
  fillViewport?: boolean
  className?: string
}) {
  const centered = align === 'center'
  const twoCol = Boolean(aside) && !centered && !fillViewport

  const bannerNode = banner && (
    USE_BANNER_VIDEO ? (
      // Banner de video (flyer animado): vertical en móvil, horizontal en desktop.
      // En modo centrado (01) es la IDEA CENTRAL → más grande; si no, tamaño normal.
      <Reveal className={cn('w-full', centered ? 'mx-auto max-w-2xl lg:max-w-3xl' : 'max-w-sm lg:max-w-xl')}>
        <BannerVideoCycle
          horizontal={BANNER_VIDEO.horizontal}
          vertical={BANNER_VIDEO.vertical}
          alt={banner.alt}
        />
      </Reveal>
    ) : (
      <Reveal className={cn('w-full max-w-sm', centered && 'mx-auto')}>
        <div className="overflow-hidden rounded-2xl gold-hairline shadow-glass-dark">
          <Img
            src={USE_LANDING_BANNER ? banner.src : undefined}
            alt={banner.alt}
            label={banner.alt}
            focal={banner.focal}
            kenBurns={false}
            priority
            className={RATIO_CLASS[banner.ratio ?? '4x5']}
          />
        </div>
      </Reveal>
    )
  )

  // Video que llena el bloque medio del hero a-pantalla (object-contain, sin recorte).
  const bannerFillNode = banner && (
    USE_BANNER_VIDEO ? (
      <BannerVideoCycle
        horizontal={BANNER_VIDEO.horizontal}
        vertical={BANNER_VIDEO.vertical}
        alt={banner.alt}
        fill
        className="mx-auto h-full w-full max-w-5xl"
      />
    ) : (
      <Img
        src={USE_LANDING_BANNER ? banner.src : undefined}
        alt={banner.alt}
        label={banner.alt}
        kenBurns={false}
        priority
        className="mx-auto h-full w-full max-w-5xl"
      />
    )
  )

  // Hero a ~una pantalla: el clúster (relojes+H1 → banner → CTA) se CENTRA como una
  // unidad. La sección es `min-h-svh` (NO `h-svh`): en pantallas cortas crece en vez
  // de recortar, así el CTA nunca queda fuera de pantalla (con `h-svh`+overflow-hidden
  // se cortaba en móviles pequeños). El banner usa altura ACOTADA y adaptativa (no
  // `flex-1`, que con video 9:16 desborda): `clamp(150px, 100svh - reserva, tope-svh)`.
  // La reserva fija (26/27rem) deja sitio al resto del clúster, que es altura casi-fija
  // en px; así el banner es grande en pantallas altas (llega al tope 46/42svh) y encoge
  // en cortas para mantener el CTA dentro del fold. Verificado 320×568 → 430×932 (móvil)
  // y 1366×640 → 1280×800 (desktop). No reintroducir `flex-1` ni el tope `h-svh`.
  const fillSpine = (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center gap-4 text-center sm:gap-5">
      <div className="flex max-w-3xl flex-col items-center gap-3 sm:gap-4">
        {countdown && (
          <CountdownTimer
            targetISO={countdown.targetISO}
            label={countdown.label}
            expiredLabel={countdown.expiredLabel}
            variant="chips"
          />
        )}
        {kicker}
        <DisplayHeading as="h1" size={titleSize}>
          {title}
        </DisplayHeading>
      </div>
      {bannerFillNode && (
        <div className="h-[clamp(150px,calc(100svh_-_26rem),46svh)] w-full sm:h-[clamp(150px,calc(100svh_-_27rem),42svh)]">{bannerFillNode}</div>
      )}
      <div className="flex max-w-xl flex-col items-center gap-3">
        {sub && <div className="text-[15px] leading-relaxed text-ivory/75 sm:text-[17px]">{sub}</div>}
        {actions && (
          <div className="flex flex-wrap items-center justify-center gap-3">{actions}</div>
        )}
      </div>
    </div>
  )

  const spine = (
    <div className={cn('flex flex-col gap-5', centered ? 'mx-auto max-w-3xl items-center text-center' : 'max-w-2xl')}>
      {countdown && (
        <CountdownTimer
          targetISO={countdown.targetISO}
          label={countdown.label}
          expiredLabel={countdown.expiredLabel}
          variant="chips"
          className={cn(!centered && 'self-start')}
        />
      )}
      {kicker}
      <DisplayHeading as="h1" size={titleSize}>
        {title}
      </DisplayHeading>
      {bannerNode}
      {sub && <div className="max-w-xl text-[15px] leading-relaxed text-ivory/75 sm:text-[17px]">{sub}</div>}
      {actions && (
        <div className={cn('flex flex-wrap items-center gap-3', centered && 'justify-center')}>{actions}</div>
      )}
    </div>
  )

  return (
    <Hero image={image} tone={tone} parallax={parallax} fillViewport={fillViewport} className={className}>
      {fillViewport ? (
        fillSpine
      ) : twoCol ? (
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {spine}
          <div>{aside}</div>
        </div>
      ) : (
        <>
          {spine}
          {aside && <div className={cn('mt-8', centered && 'mx-auto w-full max-w-md')}>{aside}</div>}
        </>
      )}
    </Hero>
  )
}
