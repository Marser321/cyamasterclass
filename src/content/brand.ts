// ─────────────────────────────────────────────────────────────────────────
//  MARCA — fuente de verdad de nombres, precios, funnel y nomenclatura oficial.
//  Derivado literal de prompts-landings/00-SISTEMA-marca-y-compliance.md §1,2,7
//  y 00-FUENTE-promesa-masterclass.md (9 fases, orden nuevo 2026-06-23).
// ─────────────────────────────────────────────────────────────────────────

export const BRAND = {
  name: 'Magic Capital',
  tagline: 'Firma educativa de subastas tax deed y crédito empresarial.',
  bigIdea:
    'La inasequibilidad del mercado inmobiliario es, en parte, una ilusión causada por depender de la hipoteca tradicional. La transferencia real de patrimonio ocurre en el mercado secundario de liquidaciones fiscales — y se puede fondear con crédito empresarial al 0% (APR promocional), sin inmovilizar el ahorro personal.',
  positioning:
    'Aprende a entrar en tax deed sin adivinar: qué condados mirar, qué propiedades descartar y cómo financiar con criterio, antes de tu primera subasta.',
} as const

export const FOUNDERS = {
  argenis: {
    name: 'Argenis Aguilera',
    role: 'La oportunidad — Método MAP-9',
    short: 'Argenis',
  },
  carmen: {
    name: 'Carmen Espinosa',
    role: 'El capital — crédito empresarial / financiamiento al 0%',
    short: 'Carmen',
  },
} as const

// Contacto — valores DEMO ilustrativos para la versión local (mock).
// ⚠ SUSTITUIR por los reales antes de publicar (número de WhatsApp del negocio,
// correo real y URL pública del deck). El 555-01xx y el TLD .example son
// reservados a propósito: nunca apuntan a un número/buzón real por accidente.
export const CONTACT = {
  whatsappNumber: '15555550123', // formato internacional sin '+'
  email: 'hola@magiccapital.example',
  // Deck de la masterclass (proyecto hermano) — producción en Vercel.
  deckUrl: 'https://magic-capital-deck.vercel.app',
} as const

// Datos de cohorte — valores DEMO ilustrativos, centralizados aquí para
// sustituirlos de un solo lugar. ⚠ SUSTITUIR por la fecha/horario reales de
// cada cohorte antes de publicar.
export const COHORTE = {
  /** Fecha y hora del Intensivo (viernes + sábado). */
  intensivoFecha: 'viernes 10 y sábado 11 de julio de 2026, 10:00 a.m. (hora del Este)',
  /** Instante absoluto de inicio del Intensivo (ISO con offset), para el contador.
   *  ⚠ PLACEHOLDER — sustituir por el inicio REAL de la próxima cohorte (debe
   *  coincidir con `intensivoFecha`). Derivado del label: vie 10 jul 2026, 10:00 a.m.
   *  hora del Este = EDT (UTC−04:00). Al pasar, el contador muestra estado grácil. */
  intensivoISO: '2026-07-10T10:00:00-04:00',
  /** Horario de atención de soporte. */
  soporteHorario: 'lunes a viernes, 9:00 a.m. a 6:00 p.m. (hora del Este)',
} as const

// Masterclass — fuente única para el banner-póster, el contador y la agenda.
// ⚠ SUSTITUIR `fechaISO` por la fecha/hora REALES de la próxima sesión antes de
// publicar. Próxima sesión: martes 21 jul 2026, 8:00 p.m. hora de Miami
// (America/New_York, que en julio es EDT, UTC−04:00). El contador apunta a ese
// instante absoluto; al pasar, muestra un estado grácil (no reinicia).
export const MASTERCLASS = {
  /** Instante absoluto de inicio (ISO con offset). */
  fechaISO: '2026-07-21T20:00:00-04:00',
  /** Etiqueta legible de día/hora (para chips del póster). */
  fechaLabel: 'Martes 21 de julio',
  horaLabel: '8:00 p.m.',
  zonaLabel: 'hora de Miami',
  plataforma: 'Zoom',
} as const

/** Construye un enlace wa.me con mensaje precargado. */
export function waLink(message: string): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`
}

// Deadlines por ruta — fuente única para el contador del hero Y la barra superior
// (UrgencyBar). Solo van aquí las ofertas con FECHA REAL (masterclass, intensivo);
// las atemporales (mentoría, comunidad) y las gracias NO tienen entrada → sin
// contador ni barra (evita urgencia falsa, regla de marca). Compliance: el conteo
// apunta a un instante fijo, sin reinicio.
export type Deadline = {
  targetISO: string
  /** Texto de la barra superior (p. ej. "Masterclass gratis · Martes 14 de julio"). */
  barLabel: string
  /** CTA de la barra. */
  barCta: { to: string; label: string }
  /** Texto que precede al contador en el hero (p. ej. "La próxima sesión empieza en"). */
  heroLabel: string
}

export const DEADLINES: Record<string, Deadline> = {
  '/l/01-reserva': {
    targetISO: MASTERCLASS.fechaISO,
    barLabel: `Masterclass gratis · ${MASTERCLASS.fechaLabel}`,
    barCta: { to: '/l/01-reserva', label: 'Reservar gratis' },
    heroLabel: 'La próxima clase en vivo empieza en',
  },
  '/l/03-intensivo': {
    targetISO: COHORTE.intensivoISO,
    barLabel: 'Intensivo MAP-9 · cupo limitado',
    barCta: { to: '/l/03-intensivo', label: 'Ver el intensivo' },
    heroLabel: 'El intensivo en vivo empieza en',
  },
}

// Las 9 fases del Método MAP-9 — ORDEN OPERATIVO NUEVO (doc 2026-06-23).
// El filtrado forense (fases 5–9) es el corazón: "primero, qué NO comprar".
export const MAP9_PHASES: readonly string[] = [
  'Descubrir y definir el mercado',
  'Encontrar la subasta y el listado',
  'Reconocimiento de la propiedad',
  'Ver el entorno',
  'Verificar riesgos ambientales',
  'Chequear índice de criminalidad',
  'Análisis de comparables (comps y ARV)',
  'Detectar riesgos legales',
  'Inspección de la propiedad',
] as const

// Escalera de valor (00-SISTEMA §7). Precios y CTAs oficiales.
export type Tier = {
  id: string
  name: string
  price: string
  priceNote?: string
  cta: string
}

export const FUNNEL: Record<string, Tier> = {
  masterclass: {
    id: 'masterclass',
    name: 'Cómo Adquirir Propiedades en Subasta Paso a Paso',
    price: 'Gratis',
    priceNote: 'En vivo · semanal · ~60 min · en español',
    cta: 'Reservar mi lugar gratis',
  },
  comunidad: {
    id: 'comunidad',
    name: 'Comunidad Magic Capital',
    price: '$27',
    priceNote: 'al mes · cancela cuando quieras',
    cta: 'Unirme a la comunidad ($27/mes)',
  },
  intensivo: {
    id: 'intensivo',
    name: 'Intensivo MAP-9',
    price: '$297',
    priceNote: 'viernes + sábado · en vivo · cupos limitados',
    cta: 'Reservar mi asiento del intensivo ($297)',
  },
  mentoria: {
    id: 'mentoria',
    name: 'Mentoría 1:1 Magic Capital',
    price: '$3,997',
    priceNote: 'pago único · 3 módulos · acompañamiento 1:1',
    cta: 'Empezar mi mentoría',
  },
} as const
