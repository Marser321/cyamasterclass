// ─────────────────────────────────────────────────────────────────────────
//  Tokens de marca + presets de animación (portado de magic-capital-deck).
//  Única fuente para el "feel" visual y de movimiento de las landings.
//  Paleta y tipografía: prompts-landings/00-SISTEMA-marca-y-compliance.md §5.
// ─────────────────────────────────────────────────────────────────────────

export const palette = {
  ivory: '#F7F5F0',
  charcoal: '#1A1C1E',
  petrol: '#0E3A4A',
  olive: '#5C6B4A',
  smoke: '#8A8F94',
  // Sistema oscuro-lujo (look del flyer navy + dorado metálico).
  midnight: '#0A1426',
  navy: '#0F2036',
  navySoft: '#16293F',
  gold: '#C9A24B',
  goldBright: '#E3C77A',
  goldDeep: '#937234',
} as const

// Curvas de easing (cubic-bezier). `out` = entrada suave y decidida.
export const ease = {
  out: [0.22, 1, 0.36, 1] as const,
  inOut: [0.65, 0, 0.35, 1] as const,
}

// Contenedor que escalona la entrada de sus hijos (<Reveal/>)
export const stagger = (staggerChildren = 0.09, delayChildren = 0.05) => ({
  hidden: {},
  show: { transition: { staggerChildren, delayChildren } },
})

// Item individual revelado (sube + aparece)
export const revealItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.out } },
}

export const revealItemSubtle = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.out } },
}

// Hover sobre tarjetas interactivas
export const cardHover = {
  rest: { y: 0 },
  hover: { y: -4, transition: { duration: 0.25, ease: ease.out } },
}

// Parallax de profundidad (fondos multicapa reactivos al puntero — DepthBackground).
// `amplitude` = px de desplazamiento a profundidad 1; las capas se sobreescalan
// (`layerScale`) para que no asomen los bordes al desplazarse.
export const parallax = {
  amplitude: 24,
  spring: { stiffness: 55, damping: 22, mass: 0.6 },
  layerScale: 1.06,
} as const
