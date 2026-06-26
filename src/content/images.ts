// ─────────────────────────────────────────────────────────────────────────
//  Rutas de imágenes. Las imágenes se copian a /public/img por el script
//  scripts/copy-assets.ps1 (curadas de landings-listas/<NN>/imagenes, fondos,
//  lead-magnets y fotos reales de fundadores). `Img` degrada a placeholder
//  elegante si un archivo falta, así que nada rompe si algo no se copió.
// ─────────────────────────────────────────────────────────────────────────

/** Imagen curada de una landing: /img/<num>/<file>. */
export function img(num: string, file: string): string {
  return `/img/${num}/${file}`
}

/** Fondo animable (catálogo landings-listas/_fondos). */
export function bg(file: string): string {
  return `/img/backgrounds/${file}`
}

/** Portada de lead magnet. */
export function lm(file: string): string {
  return `/img/lead-magnets/${file}`
}

/** Foto real de estudio de fundadores. */
export function founder(file: string): string {
  return `/img/founders/${file}`
}

// Banner-póster del flyer oficial de la masterclass (navy + dorado, fundadores,
// fecha/hora). El hero recrea el póster en CÓDIGO por defecto; cuando el cliente
// suba el PNG a public/img/01/ con este nombre y se ponga `USE_FLYER_IMAGE=true`,
// <Img> lo muestra como póster (degrada solo si falta). Slot de swap, "ambas".
export const MASTERCLASS_FLYER = '/img/01/01-reserva-masterclass__flyer-poster--4x5.png'
export const USE_FLYER_IMAGE = false

// Banner-póster por landing (fundadores / oferta) que va tras el H1 en el hero.
// Mismo patrón de "slot de swap" que el flyer: el cliente sube el PNG a
// public/img/<NN>/ con este nombre y, mientras no exista, <Img> muestra el
// placeholder elegante. Ratio 4x5 (móvil-first; igual que el flyer oficial).
export const LANDING_BANNER: Record<string, string> = {
  '01': '/img/01/01-reserva-masterclass__banner-fundadores--4x5.png',
  '03': '/img/03/03-compra-intensivo__banner-cohorte--4x5.png',
  '07': '/img/07/07-autoridad-argenis__banner-fundadores--4x5.png',
  '05': '/img/05/05-compra-mentoria__banner-fundadores--4x5.png',
  '09': '/img/09/09-comunidad__banner-fundadores--4x5.png',
}

// Interruptor global (paralelo a USE_FLYER_IMAGE): mientras esté en false, el hero
// NO reserva el marco del banner (evita marcos de placeholder vacíos en la demo).
// Ponlo en true cuando existan los PNG reales en public/img/<NN>/.
export const USE_LANDING_BANNER = false

// Banner de VIDEO en el hero (entre el H1 y el CTA). El flyer animado de la
// masterclass, en dos orientaciones: vertical en móvil, horizontal en desktop.
// `BannerVideoCycle` reproduce el del dispositivo en bucle continuo. Mismo video
// en todas las landings principales por ahora; cambiar la fuente por landing
// cuando existan otros.
export const BANNER_VIDEO = {
  horizontal: '/video/banner-horizontal.mp4',
  vertical: '/video/banner-vertical.mp4',
}

// Interruptor global del banner de video. Si se pone en false, el hero vuelve al
// placeholder de <Img> (espejo de USE_LANDING_BANNER).
export const USE_BANNER_VIDEO = true

export type Ratio = '16x9' | '4x5' | '1x1' | '9x16' | '21x9' | '3x2'

export const RATIO_CLASS: Record<Ratio, string> = {
  '16x9': 'aspect-[16/9]',
  '4x5': 'aspect-[4/5]',
  '1x1': 'aspect-square',
  '9x16': 'aspect-[9/16]',
  '21x9': 'aspect-[21/9]',
  '3x2': 'aspect-[3/2]',
}
