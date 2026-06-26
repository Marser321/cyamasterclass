// ─────────────────────────────────────────────────────────────────────────
//  REGISTRO de landings — alimenta el Hub (selector) y el dropdown del chrome.
//  Orden = recorrido del cliente en el funnel.
// ─────────────────────────────────────────────────────────────────────────
import { img } from './images'

export type LandingKind = 'pillar' | 'optin' | 'thankyou' | 'sales' | 'subscription'

export type LandingMeta = {
  num: string // prefijo de carpeta de assets (01..09)
  slug: string // segmento de ruta
  route: string // ruta completa
  title: string
  subtitle: string
  kind: LandingKind
  price?: string
  thumb: string // miniatura para el hub (su hero)
  stageLabel: string // etiqueta del paso en el funnel
  docTitle: string // <title> público al compartir la URL
}

const KIND_LABEL: Record<LandingKind, string> = {
  pillar: 'Autoridad',
  optin: 'Captación · gratis',
  thankyou: 'Gracias / onboarding',
  sales: 'Venta',
  subscription: 'Suscripción',
}

export function kindLabel(kind: LandingKind): string {
  return KIND_LABEL[kind]
}

export const LANDINGS: readonly LandingMeta[] = [
  {
    num: '07',
    slug: '07-autoridad',
    route: '/l/07-autoridad',
    title: 'Autoridad',
    subtitle: 'Ejecutores, no influencers — Argenis y Carmen',
    kind: 'pillar',
    thumb: img('07', '07-autoridad-argenis__hero-fundadores-espacio-titular.png'),
    stageLabel: 'Pilar de marca',
    docTitle: 'Argenis y Carmen — Magic Capital',
  },
  {
    num: '01',
    slug: '01-reserva',
    route: '/l/01-reserva',
    title: 'Reserva Masterclass',
    subtitle: 'Cómo adquirir propiedades en subasta, paso a paso',
    kind: 'optin',
    price: 'Gratis',
    thumb: img('01', '01-reserva-masterclass__hero-fundadores-trabajando.png'),
    stageLabel: 'Masterclass gratis',
    docTitle: 'Masterclass gratis — Magic Capital',
  },
  {
    num: '02',
    slug: '02-gracias-reserva',
    route: '/l/02-gracias-reserva',
    title: 'Gracias — Reserva',
    subtitle: 'Confirmación + preparación para la masterclass',
    kind: 'thankyou',
    thumb: img('02', '02-gracias-reserva__hero-confirmacion-serena.png'),
    stageLabel: 'Confirmación',
    docTitle: '¡Reservado! — Masterclass Magic Capital',
  },
  {
    num: '09',
    slug: '09-comunidad',
    route: '/l/09-comunidad',
    title: 'Comunidad',
    subtitle: 'Sigue avanzando, con criterio y en comunidad',
    kind: 'subscription',
    price: '$27/mes',
    thumb: img('09', '09-comunidad__hero-pertenencia-sobria.png'),
    stageLabel: 'Comunidad $27/mes',
    docTitle: 'Comunidad Magic Capital — $27/mes',
  },
  {
    num: '03',
    slug: '03-intensivo',
    route: '/l/03-intensivo',
    title: 'Intensivo MAP-9',
    subtitle: 'De mirar listados a ejecutar tu primera subasta',
    kind: 'sales',
    price: '$297',
    thumb: img('03', '03-compra-intensivo__hero-fundadores-sesion-vivo.png'),
    stageLabel: 'Intensivo $297',
    docTitle: 'Intensivo MAP-9 — Magic Capital',
  },
  {
    num: '04',
    slug: '04-gracias-intensivo',
    route: '/l/04-gracias-intensivo',
    title: 'Gracias — Intensivo',
    subtitle: 'Onboarding del intensivo + paso opcional a mentoría',
    kind: 'thankyou',
    thumb: img('04', '04-gracias-compra-intensivo__hero-bienvenida-area-miembros.png'),
    stageLabel: 'Onboarding',
    docTitle: 'Bienvenido al Intensivo — Magic Capital',
  },
  {
    num: '05',
    slug: '05-mentoria',
    route: '/l/05-mentoria',
    title: 'Mentoría 1:1',
    subtitle: 'Acompañamiento privado hasta tu primera subasta',
    kind: 'sales',
    price: '$3,997',
    thumb: img('05', '05-compra-mentoria__hero-fundadores-revisando-portal.png'),
    stageLabel: 'Mentoría $3,997',
    docTitle: 'Mentoría 1:1 — Magic Capital',
  },
  {
    num: '06',
    slug: '06-gracias-mentoria',
    route: '/l/06-gracias-mentoria',
    title: 'Gracias — Mentoría',
    subtitle: 'Onboarding premium: expectativas y límites',
    kind: 'thankyou',
    thumb: img('06', '06-gracias-compra-mentoria__hero-recibimiento-premium.png'),
    stageLabel: 'Onboarding premium',
    docTitle: 'Bienvenido a la Mentoría — Magic Capital',
  },
] as const

export function landingBySlug(slug: string): LandingMeta | undefined {
  return LANDINGS.find((l) => l.slug === slug)
}
