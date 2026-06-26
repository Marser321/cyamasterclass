import { useEffect } from 'react'

const EMBED_SCRIPT = 'https://link.msgsndr.com/js/form_embed.js'

/** Carga el script de LeadConnector (form_embed.js) una sola vez por página.
 *  Es el que auto-ajusta la altura del iframe vía postMessage. */
function ensureEmbedScript() {
  if (typeof document === 'undefined') return
  if (document.querySelector(`script[src="${EMBED_SCRIPT}"]`)) return
  const s = document.createElement('script')
  s.src = EMBED_SCRIPT
  s.async = true
  document.body.appendChild(s)
}

/**
 * Form embebido de LeadConnector / GoHighLevel (layout INLINE).
 *
 * El destino tras enviar (redirect a la gracias o mensaje) se configura en el
 * builder del form dentro de GHL, no aquí. Para mantener el funnel, en GHL
 * poné "On submit → Redirect" hacia `/l/02-gracias-reserva`.
 */
export function GHLForm({
  formId,
  formName,
  title,
  height = 586,
  className,
}: {
  formId: string
  /** `data-form-name` que GHL usa para identificar el form. */
  formName?: string
  /** Título accesible del iframe. */
  title: string
  /** Altura inicial en px (el script la re-ajusta solo). */
  height?: number
  className?: string
}) {
  useEffect(ensureEmbedScript, [])

  const iframeId = `inline-${formId}`

  return (
    <iframe
      src={`https://api.leadconnectorhq.com/widget/form/${formId}`}
      id={iframeId}
      title={title}
      className={className}
      style={{ width: '100%', height, border: 'none', borderRadius: 12 }}
      data-layout="{'id':'INLINE'}"
      data-trigger-type="alwaysShow"
      data-trigger-value=""
      data-activation-type="alwaysActivated"
      data-activation-value=""
      data-deactivation-type="neverDeactivate"
      data-deactivation-value=""
      data-form-name={formName ?? title}
      data-height={height}
      data-layout-iframe-id={iframeId}
      data-form-id={formId}
    />
  )
}
