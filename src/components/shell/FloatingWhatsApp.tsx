import { Whatsapp } from '../primitives/icons'
import { waLink } from '../../content/brand'

/** Botón flotante de WhatsApp (CTA dual recurrente de marca). wa.me con mensaje. */
export function FloatingWhatsApp({ message = 'Hola, tengo una pregunta sobre Magic Capital.' }: { message?: string }) {
  return (
    <a
      href={waLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escríbenos por WhatsApp"
      className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-olive text-2xl text-ivory shadow-glass-dark transition-transform hover:-translate-y-0.5 hover:brightness-110"
    >
      <Whatsapp />
    </a>
  )
}
