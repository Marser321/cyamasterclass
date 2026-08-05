// ─────────────────────────────────────────────────────────────────────────
//  MARCA — fuente de verdad de nombres, precios, funnel y nomenclatura oficial.
//  Derivado literal de prompts-landings/00-SISTEMA-marca-y-compliance.md §1,2,7
//  y 00-FUENTE-promesa-masterclass.md (9 fases, orden nuevo 2026-06-23).
// ─────────────────────────────────────────────────────────────────────────

import {
  formatSessionDay,
  nextSessionAt,
  nextSessionISO,
  type WeeklySchedule,
} from '../lib/schedule'

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
// EVERGREEN (2026-08-05): la clase se emite TODAS LAS SEMANAS el mismo día y a
// la misma hora, así que ya NO hay fecha que actualizar a mano. Todo se deriva
// de `MASTERCLASS_SCHEDULE`: el contador, el chip de fecha, la barra de urgencia
// y el .ics del calendario apuntan a la PRÓXIMA emisión real y ruedan solos a la
// semana siguiente cuando la sesión termina.
// ⚠ Para mover día u hora se toca SOLO `MASTERCLASS_SCHEDULE` (y `horaLabel`).
export const MASTERCLASS_SCHEDULE: WeeklySchedule = {
  /** 2 = martes (0 = domingo). */
  weekday: 2,
  /** 19:00 hora local de Miami = 7:00 p.m. */
  hour: 19,
  minute: 0,
  /** La zona resuelve EDT/EST sola: siempre son las 9 p.m. en Miami. */
  timeZone: 'America/New_York',
  /** Duración ~60 min: mientras la clase está en el aire el contador marca cero
   *  ("empieza ahora") y recién al terminar salta a la próxima semana. */
  graceMinutes: 60,
}

export const MASTERCLASS = {
  /** Instante absoluto de inicio de la PRÓXIMA emisión (ISO).
   *  Getter: se recalcula en cada lectura, así nunca queda una fecha vieja. */
  get fechaISO(): string {
    return nextSessionISO(MASTERCLASS_SCHEDULE)
  },
  /** Etiqueta legible de la próxima emisión, p. ej. "Viernes 7 de agosto". */
  get fechaLabel(): string {
    return formatSessionDay(nextSessionAt(MASTERCLASS_SCHEDULE), MASTERCLASS_SCHEDULE.timeZone)
  },
  /** Día de la semana fijo, para copy tipo "todos los martes". */
  diaSemanaLabel: 'martes',
  horaLabel: '7:00 p.m.',
  zonaLabel: 'hora de Miami',
  plataforma: 'Zoom',
  /** Referencia estable (identidad de función constante) para pasarle el
   *  objetivo al `CountdownTimer`, que lo re-evalúa en cada tick. */
  targetISO: (): string => nextSessionISO(MASTERCLASS_SCHEDULE),
}

/** Construye un enlace wa.me con mensaje precargado. */
export function waLink(message: string): string {
  return `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`
}

// Deadlines por ruta — fuente única para el contador del hero Y la barra superior
// (UrgencyBar). Solo van aquí las ofertas con FECHA REAL (masterclass, intensivo);
// las atemporales (mentoría, comunidad) y las gracias NO tienen entrada → sin
// contador ni barra (evita urgencia falsa, regla de marca). Compliance: el conteo
// apunta siempre a una sesión REAL — en la masterclass, a la próxima emisión
// semanal (misma cuenta para todo el mundo, nunca un contador por visitante).
export type Deadline = {
  /** Instante objetivo, o una función que lo resuelve (horario recurrente). */
  targetISO: string | (() => string)
  /** Texto de la barra superior (p. ej. "Masterclass gratis · Martes 14 de julio"). */
  barLabel: string
  /** CTA de la barra. `openForm` abre el popup de reserva; si no, enlaza a `to`. */
  barCta: { label: string; to?: string; openForm?: boolean }
  /** Texto que precede al contador en el hero (p. ej. "La próxima sesión empieza en"). */
  heroLabel: string
  /** Texto para cuando el contador llega a cero (sesión en curso / cerrada). */
  barExpiredLabel?: string
}

export const DEADLINES: Record<string, Deadline> = {
  '/masterclass': {
    // Evergreen: función + getter, para que la barra siga a la próxima emisión
    // sin depender del momento en que se cargó el módulo.
    targetISO: MASTERCLASS.targetISO,
    get barLabel(): string {
      return `Masterclass gratis · ${MASTERCLASS.fechaLabel}`
    },
    barCta: { label: 'Reservar gratis', openForm: true },
    heroLabel: 'La próxima clase en vivo empieza en',
    barExpiredLabel: 'Empieza ahora',
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
