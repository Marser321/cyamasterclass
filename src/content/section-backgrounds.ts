import type { SectionTexture } from '../components/primitives/Section'
import { bg } from './images'

export type SectionBackgroundLanding =
  | '01-reserva-masterclass'
  | '02-gracias-reserva'
  | '03-compra-intensivo'
  | '04-gracias-compra-intensivo'
  | '05-compra-mentoria'
  | '06-gracias-compra-mentoria'
  | '07-autoridad-argenis'
  | '09-comunidad'

type SectionBackground = {
  file: string
  opacity: number
  focal?: string
}

export const SECTION_BACKGROUNDS: Record<SectionBackgroundLanding, readonly SectionBackground[]> = {
  '01-reserva-masterclass': [
    { file: 'fondo__01-reserva-masterclass__s01-sistema-fuera-otra-puerta--16x9.png', opacity: 0.06 },
    { file: 'fondo__01-reserva-masterclass__s02-trust-bar-desconfia-verifica--16x9.png', opacity: 0.06 },
    { file: 'fondo__01-reserva-masterclass__s03-decidir-con-criterio--16x9.png', opacity: 0.055 },
    { file: 'fondo__01-reserva-masterclass__s04-map9-fase-por-fase--16x9.png', opacity: 0.12 },
    { file: 'fondo__01-reserva-masterclass__s05-honestidad-para-quien--16x9.png', opacity: 0.06 },
    { file: 'fondo__01-reserva-masterclass__s06-fundadores-ejecutores--16x9.png', opacity: 0.055 },
    { file: 'fondo__01-reserva-masterclass__s07-dia-masterclass--16x9.png', opacity: 0.06 },
    { file: 'fondo__01-reserva-masterclass__s08-transparencia-anti-estafa--16x9.png', opacity: 0.055 },
    { file: 'fondo__01-reserva-masterclass__s09-preguntas-frecuentes--16x9.png', opacity: 0.06 },
    { file: 'fondo__01-reserva-masterclass__s10-cta-reserva-entender--16x9.png', opacity: 0.12 },
  ],
  '02-gracias-reserva': [
    { file: 'fondo__02-gracias-reserva__s01-pasos-no-perderte--16x9.png', opacity: 0.055 },
    { file: 'fondo__02-gracias-reserva__s02-conectarte-sin-complicaciones--16x9.png', opacity: 0.06 },
    { file: 'fondo__02-gracias-reserva__s03-prepararte-masterclass--16x9.png', opacity: 0.12 },
    { file: 'fondo__02-gracias-reserva__s04-siguiente-paso-sin-presion--16x9.png', opacity: 0.055 },
    { file: 'fondo__02-gracias-reserva__s05-credibilidad-proceso-publico--16x9.png', opacity: 0.1 },
    { file: 'fondo__02-gracias-reserva__s06-faq-antes-vernos--16x9.png', opacity: 0.055 },
  ],
  '03-compra-intensivo': [
    { file: 'fondo__03-compra-intensivo__s01-que-es-que-no-es--16x9.png', opacity: 0.055 },
    { file: 'fondo__03-compra-intensivo__s02-capital-viernes-carmen--16x9.png', opacity: 0.06 },
    { file: 'fondo__03-compra-intensivo__s03-map9-sabado-fases--16x9.png', opacity: 0.12 },
    { file: 'fondo__03-compra-intensivo__s04-guia-herramientas--16x9.png', opacity: 0.055 },
    { file: 'fondo__03-compra-intensivo__s05-caso-washington-county--16x9.png', opacity: 0.12 },
    { file: 'fondo__03-compra-intensivo__s06-capital-necesario--16x9.png', opacity: 0.055 },
    { file: 'fondo__03-compra-intensivo__s07-asiento-cohorte-vivo--16x9.png', opacity: 0.06 },
    { file: 'fondo__03-compra-intensivo__s08-confianza-no-colgado--16x9.png', opacity: 0.055 },
    { file: 'fondo__03-compra-intensivo__s09-faq-antes-reservar--16x9.png', opacity: 0.06 },
    { file: 'fondo__03-compra-intensivo__s10-cta-cohorte-vivo--16x9.png', opacity: 0.12 },
  ],
  '04-gracias-compra-intensivo': [
    { file: 'fondo__04-gracias-compra-intensivo__s01-proximos-pasos-intensivo--16x9.png', opacity: 0.055 },
    { file: 'fondo__04-gracias-compra-intensivo__s02-prepararte-intensivo--16x9.png', opacity: 0.06 },
    { file: 'fondo__04-gracias-compra-intensivo__s03-oto-mentoria-personalizada--16x9.png', opacity: 0.12 },
    { file: 'fondo__04-gracias-compra-intensivo__s04-soporte-acceso-bonos--16x9.png', opacity: 0.055 },
    { file: 'fondo__04-gracias-compra-intensivo__s05-faq-antes-empezar--16x9.png', opacity: 0.06 },
  ],
  '05-compra-mentoria': [
    { file: 'fondo__05-compra-mentoria__s01-modulos-sesiones-1a1--16x9.png', opacity: 0.12 },
    { file: 'fondo__05-compra-mentoria__s02-salvaguarda-confianza--16x9.png', opacity: 0.055 },
    { file: 'fondo__05-compra-mentoria__s03-transparencia-riesgo--16x9.png', opacity: 0.12 },
    { file: 'fondo__05-compra-mentoria__s04-precio-contexto--16x9.png', opacity: 0.06 },
    { file: 'fondo__05-compra-mentoria__s05-honestidad-no-prometemos--16x9.png', opacity: 0.055 },
    { file: 'fondo__05-compra-mentoria__s06-compromiso-hitos--16x9.png', opacity: 0.12 },
    { file: 'fondo__05-compra-mentoria__s07-checkout-empieza-hoy--16x9.png', opacity: 0.06 },
    { file: 'fondo__05-compra-mentoria__s08-faq-antes-empezar--16x9.png', opacity: 0.055 },
    { file: 'fondo__05-compra-mentoria__s09-cta-ejecutar-criterio--16x9.png', opacity: 0.12 },
  ],
  '06-gracias-compra-mentoria': [
    { file: 'fondo__06-gracias-compra-mentoria__s01-proximos-pasos-mentoria--16x9.png', opacity: 0.055 },
    { file: 'fondo__06-gracias-compra-mentoria__s02-preparar-primera-sesion--16x9.png', opacity: 0.06 },
    { file: 'fondo__06-gracias-compra-mentoria__s03-expectativas-limites--16x9.png', opacity: 0.12 },
    { file: 'fondo__06-gracias-compra-mentoria__s04-soporte-contacto--16x9.png', opacity: 0.055 },
  ],
  '07-autoridad-argenis': [
    { file: 'fondo__07-autoridad-argenis__s01-no-vendemos-suenos--16x9.png', opacity: 0.06 },
    { file: 'fondo__07-autoridad-argenis__s02-sistema-fuera-otra-puerta--16x9.png', opacity: 0.06 },
    { file: 'fondo__07-autoridad-argenis__s03-mecanismo-dual--16x9.png', opacity: 0.12 },
    { file: 'fondo__07-autoridad-argenis__s04-portal-hoja-criterio--16x9.png', opacity: 0.055 },
    { file: 'fondo__07-autoridad-argenis__s05-reconocer-serio--16x9.png', opacity: 0.06 },
    { file: 'fondo__07-autoridad-argenis__s06-caso-real-numeros--16x9.png', opacity: 0.12 },
    { file: 'fondo__07-autoridad-argenis__s07-exigir-desconfiar--16x9.png', opacity: 0.1 },
    { file: 'fondo__07-autoridad-argenis__s08-cta-entender-no-comprar--16x9.png', opacity: 0.12 },
  ],
  '09-comunidad': [
    { file: 'fondo__09-comunidad__s01-acompanamiento-mensual--16x9.png', opacity: 0.055 },
    { file: 'fondo__09-comunidad__s02-para-quien-si-no--16x9.png', opacity: 0.06 },
    { file: 'fondo__09-comunidad__s03-puente-gratis-siguiente--16x9.png', opacity: 0.12 },
    { file: 'fondo__09-comunidad__s04-membresia-honesta-precio--16x9.png', opacity: 0.055 },
    { file: 'fondo__09-comunidad__s05-faq-comunidad--16x9.png', opacity: 0.06 },
    { file: 'fondo__09-comunidad__s06-cta-quedate-cerca--16x9.png', opacity: 0.12 },
  ],
}

export function sectionBg(landing: SectionBackgroundLanding, sectionIndex: number): SectionTexture {
  const texture = SECTION_BACKGROUNDS[landing][sectionIndex - 1]
  if (!texture) return {}

  return {
    src: bg(texture.file),
    opacity: texture.opacity,
    focal: texture.focal,
  }
}
