# cyamasterclass

Landing de la **Masterclass de Magic Capital** (Argenis y Carmen): página de registro + página de gracias. React + Vite + TypeScript + Tailwind.

## Rutas

- `/` → redirige a `/l/01-reserva`
- `/l/01-reserva` — registro de la masterclass (form embebido de LeadConnector/GHL)
- `/l/02-gracias-reserva` — confirmación + añadir al calendario

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:5191
npm run build    # tsc --noEmit && vite build
```

## Notas

- La **fecha/hora** de la masterclass es fuente única en `src/content/brand.ts` → `MASTERCLASS` (alimenta el contador, el badge de la gracias y el `.ics`).
- El **form de registro** es el embed inline de LeadConnector (form `MASTERCLASS`). El redirect post-envío se configura en GHL → `On submit → Redirect` apuntando a `…/l/02-gracias-reserva`.
- SPA: `vercel.json` reescribe todas las rutas a `index.html` para que los deep-links funcionen.
