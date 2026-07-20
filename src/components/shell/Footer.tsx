import { Container } from '../primitives/Container'
import { Disclaimer } from '../primitives/Disclaimer'
import { BRAND, FOUNDERS } from '../../content/brand'

/** Pie de página simple: marca, "no somos asesores" y el disclaimer íntegro plegable.
 *  Sin sitemap del funnel: cada landing se comparte sola y sus propios CTA llevan
 *  al siguiente paso (no exponemos páginas internas como las de gracias). */
export function Footer() {
  return (
    <footer className="bg-midnight text-ivory">
      <Container className="py-12">
        <div className="flex flex-col items-center gap-1.5 text-center">
          <div className="font-display text-xl font-semibold">{BRAND.name}</div>
          <p className="max-w-sm text-[13.5px] leading-snug text-ivory/60">{BRAND.tagline}</p>
          <p className="text-[13px] text-ivory/55">
            {FOUNDERS.argenis.name} &amp; {FOUNDERS.carmen.name}
          </p>
          <p className="mt-2 max-w-md text-[12px] leading-snug text-ivory/55">
            No somos asesores de inversión registrados, abogados ni asesores fiscales.
          </p>
        </div>

        <div className="mt-8">
          <Disclaimer tone="dark" collapsible defaultOpen={false} />
        </div>
      </Container>
    </footer>
  )
}
