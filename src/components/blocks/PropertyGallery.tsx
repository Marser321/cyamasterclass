import { PropertyShowcase } from './PropertyShowcase'
import { Stagger, RevealItem } from '../motion/Reveal'
import type { Ratio } from '../../content/images'
import { cn } from '../../lib/cn'

export type PropertyItem = {
  src?: string
  alt: string
  ratio?: Ratio
  focal?: string
  caption?: string
  region?: 'FL' | 'PA'
}

/**
 * Tira documental "así se ven las casas reales en subasta" (2–3 máx para NO
 * leer como listings inmobiliarios). Para una sola, usar PropertyShowcase.
 */
export function PropertyGallery({
  items,
  columns = 3,
  tone = 'light',
  className,
}: {
  items: PropertyItem[]
  columns?: 2 | 3
  tone?: 'light' | 'dark'
  className?: string
}) {
  return (
    <Stagger className={cn('grid gap-5 sm:grid-cols-2', columns === 3 && 'lg:grid-cols-3', className)}>
      {items.map((it, i) => (
        <RevealItem key={it.src ?? i}>
          <PropertyShowcase {...it} tone={tone} ratio={it.ratio ?? '4x5'} />
        </RevealItem>
      ))}
    </Stagger>
  )
}
