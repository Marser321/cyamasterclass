import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// Puerto flexible: respeta PORT (lo asigna el preview del harness); default 5190
// (evita 5173 de "Accountant Pro" y 5180 del deck de la masterclass).
export default defineConfig({
  plugins: [react()],
  server: { port: Number(process.env.PORT) || 5190, open: false },
})
