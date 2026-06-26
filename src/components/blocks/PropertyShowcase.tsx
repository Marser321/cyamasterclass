import { Img, type Scrim } from '../media/Img'
import { RATIO_CLASS, type Ratio } from '../../content/images'
import { Footnote } from '../primitives/Footnote'
import { MapPin } from '../primitives/icons'
import { cn } from '../../lib/cn'

/**
 * La propiedad en subasta como PROTAGONISTA: imagen documental de una vivienda
 * modesta (FL/PA) con pin de región opcional y caption/disclaimer al pie.
 * Wrapper fino sobre <Img/> — Ken Burns sutil, scrim y placeholder seguro si la
 * imagen aún no existe (no rompe la landing). No incluye Reveal: envolver desde
 * la landing (<Reveal>/<RevealItem>) como con el resto de imágenes.
 */
export function PropertyShowcase({
  src,
  alt,
  ratio = '4x5',
  focal = '50% 55%',
  caption,
  region,
  tone = 'light',
  scrim = 'none',
  kenBurns = true,
  className,
}: {
  src?: string
  alt: string
  ratio?: Ratio
  focal?: string
  caption?: string
  region?: 'FL' | 'PA'
  tone?: 'light' | 'dark'
  scrim?: Scrim
  kenBurns?: boolean
  className?: string
}) {
  const dark = tone === 'dark'
  const regionLabel = region === 'FL' ? 'Florida' : region === 'PA' ? 'Pennsylvania' : null
  return (
    <figure className={cn('flex flex-col gap-3', className)}>
      <div className="relative">
        <Img
          src={src}
          alt={alt}
          focal={focal}
          scrim={scrim}
          kenBurns={kenBurns}
          className={cn(RATIO_CLASS[ratio], 'w-full rounded-2xl shadow-glass-dark gold-hairline')}
        />
        {regionLabel && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-charcoal/70 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-ivory ring-1 ring-white/15 backdrop-blur-sm">
            <MapPin /> {regionLabel}
          </span>
        )}
      </div>
      {caption && (
        <figcaption>
          <Footnote tone={dark ? 'dark' : 'light'}>{caption}</Footnote>
        </figcaption>
      )}
    </figure>
  )
}
