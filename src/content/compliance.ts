// ─────────────────────────────────────────────────────────────────────────
//  COMPLIANCE — reglas duras FTC (00-SISTEMA §6, §8). No negociable.
//  El disclaimer va al pie de TODAS las páginas; las cifras fuertes llevan su
//  etiqueta obligatoria; el copy nunca usa las frases prohibidas.
// ─────────────────────────────────────────────────────────────────────────

/** Disclaimer de pie — texto EXACTO de 00-SISTEMA §8. Visible y legible. */
export const DISCLAIMER_FULL =
  'Descargo de responsabilidad: La información educativa provista por Argenis y Carmen / Magic Capital tiene fines formativos y no constituye asesoría legal, fiscal, crediticia, bancaria o de inversión individual. Los procesos de tax deed, tax lien, upset sale, judicial sale, repository sale, redención, notificación, gravámenes sobrevivientes, transferencia, title y financiamiento varían por estado, condado, emisor y perfil del solicitante. Toda cifra, caso, monto de crédito, plazo promocional o resultado mostrado corresponde a ejemplos puntuales o experiencias individuales y no garantiza resultados similares. Cualquier acceso a crédito, límite, tasa, plazo promocional o aprobación depende de criterios del emisor y del perfil del solicitante. Antes de comprar en subasta o usar crédito para invertir, consulte a un abogado local, title professional y/o asesor financiero cualificado. REQUIERE VERIFICAR POR ESTADO/CONDADO/EMISOR.'

/**
 * Frases prohibidas como COPY (00-SISTEMA §6.2–6.3). El lint dev-only
 * (scripts/lint-copy.ts) falla si aparecen en content/landings/*.
 */
export const PROHIBITED_PHRASES: readonly string[] = [
  'sin riesgo',
  'garantizado',
  'garantizada',
  'dinero gratis',
  'pre-aprobado',
  'preaprobado',
  'aprobación asegurada',
  'hazte rico',
  'título limpio garantizado',
  'recuperarás tu inversión',
  '90% de probabilidad',
]

/** Etiquetas obligatorias para cifras/casos fuertes (00-SISTEMA §6.4–6.6). */
export const FIGURE_LABELS = {
  riesgo98:
    'Ilustrativo del efecto del método de filtrado; no es una garantía de resultado.',
  caso7500:
    'Ejemplo puntual de una operación, no un resultado promedio ni replicable por todos. Caso real no auditado externamente. Las reglas y los resultados varían por estado, condado y propiedad.',
  rango30a100:
    'Ejemplo puntual, no un promedio ni un resultado auditado; varía por estado, condado y propiedad.',
  fraccion2:
    'Describe la mecánica de subasta (la puja abre en la deuda fiscal, no en el valor de mercado); varía por caso, estado y condado.',
  credito0:
    'Tarjetas de negocio con APR promocional introductorio por un periodo; la elegibilidad, el límite y la aprobación dependen del emisor y de tu perfil, y suelen requerir garantía personal. No prometemos montos ni aprobación.',
  taxDeed:
    'Las reglas de redención, gravámenes, notificación y fees varían por estado y condado; requiere verificación local.',
} as const

/** Banner global del entorno: deja claro que es una demo sin cobros reales. */
export const DEMO_NOTE =
  'Versión de demostración — los formularios y pagos son simulados (sin cobro real).'

// ─────────────────────────────────────────────────────────────────────────
//  CARVE-OUT "oscuro-lujo" (decisión del cliente 2026-06-24). El sistema visual
//  pasó a navy + DORADO METÁLICO sobrio (look del flyer oficial). Esto matiza —
//  no anula — las reglas visuales de 00-SISTEMA §5/§6:
//   · Dorado metálico sobrio SÍ · dorado neón/fluorescente NO.
//   · Contador a una FECHA REAL (la próxima sesión) SÍ; countdown perpetuo o que
//     se reinicia solo NO (eso sería "urgencia falsa"). Ver MASTERCLASS.fechaISO.
//   · Toasts de actividad ("Fulano reservó") = SIMULADOS e ILUSTRATIVOS de la
//     demo (content/social-proof.ts), cubiertos por DEMO_NOTE + su micro-nota.
//     En producción deben alimentarse de registros REALES (no fabricar prueba
//     social — implicación FTC).
//  Las frases prohibidas (garantizado, sin riesgo, pre-aprobado…) siguen intactas.
// ─────────────────────────────────────────────────────────────────────────
