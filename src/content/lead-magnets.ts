// 10 lead magnets (5 Argenis / 5 Carmen). Portadas y thumbnails en /img/lead-magnets.
// Títulos en versión compliant (sin prometer ROI/ganancia).
export type LeadMagnet = {
  id: string
  title: string
  autor: 'argenis' | 'carmen'
  formato: 'Guía PDF' | 'Video'
  file: string
  ratio: '4x5' | '16x9'
  note?: string
}

export const LEAD_MAGNETS: LeadMagnet[] = [
  { id: 'lm-01', title: 'Los 5 pasos para entender tu primera subasta', autor: 'argenis', formato: 'Guía PDF', file: 'lm-01-portada.png', ratio: '4x5' },
  { id: 'lm-02', title: 'Analizamos una subasta real, en vivo', autor: 'argenis', formato: 'Video', file: 'lm-02-thumb.png', ratio: '16x9' },
  { id: 'lm-03', title: '7 errores que te hacen perder dinero en tax deed', autor: 'argenis', formato: 'Guía PDF', file: 'lm-03-portada.png', ratio: '4x5' },
  { id: 'lm-04', title: 'Cómo encontrar subastas en tu estado', autor: 'argenis', formato: 'Video', file: 'lm-04-thumb.png', ratio: '16x9' },
  {
    id: 'lm-05',
    title: 'Calculadora de capital de entrada',
    autor: 'argenis',
    formato: 'Guía PDF',
    file: 'lm-05-portada.png',
    ratio: '4x5',
    note: 'Estima costos de entrada (puja + fees + title + contingencia). No proyecta ganancia.',
  },
  {
    id: 'lm-06',
    title: 'Cómo se accede al crédito empresarial al 0%',
    autor: 'carmen',
    formato: 'Guía PDF',
    file: 'lm-06-portada.png',
    ratio: '4x5',
    note: 'APR promocional sujeto a elegibilidad del emisor y posible garantía personal. No prometemos montos ni aprobación.',
  },
  { id: 'lm-07', title: 'Los 3 tipos de financiamiento para operar', autor: 'carmen', formato: 'Video', file: 'lm-07-thumb.png', ratio: '16x9' },
  { id: 'lm-08', title: 'Checklist para estructurar tu negocio en EE.UU.', autor: 'carmen', formato: 'Guía PDF', file: 'lm-08-portada.png', ratio: '4x5' },
  { id: 'lm-09', title: 'Cómo trabajar tu score de crédito en 90 días', autor: 'carmen', formato: 'Video', file: 'lm-09-thumb.png', ratio: '16x9' },
  { id: 'lm-10', title: '5 errores que dañan tu crédito empresarial', autor: 'carmen', formato: 'Guía PDF', file: 'lm-10-portada.png', ratio: '4x5' },
]
