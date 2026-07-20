import { Container } from '../primitives/Container'
import * as Icon from '../primitives/icons'
import { SEGURIDAD_NOTE } from '../../content/compliance'

/** Aviso de seguridad al pie (registro + gracias). Franja discreta justo encima
 *  del Footer: legible y presente, pero sin robarle protagonismo al CTA ni
 *  alarmar. El texto vive en content/compliance.ts. */
export function SeguridadNote() {
  return (
    <aside aria-label={SEGURIDAD_NOTE.title} className="bg-midnight">
      <Container width="narrow" className="pb-2 pt-10">
        <div className="flex items-start gap-3 rounded-xl border border-gold/15 bg-white/[0.03] p-4">
          <Icon.Shield className="mt-0.5 shrink-0 text-base text-gold" />
          <div>
            <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-gold">
              {SEGURIDAD_NOTE.title}
            </p>
            <p className="text-[12.5px] leading-relaxed text-ivory/70">{SEGURIDAD_NOTE.body}</p>
          </div>
        </div>
      </Container>
    </aside>
  )
}
