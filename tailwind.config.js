/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta exacta de marca (00-SISTEMA §5) — texto/acentos heredados.
        ivory: '#F7F5F0',
        charcoal: '#1A1C1E',
        petrol: '#0E3A4A',
        olive: '#5C6B4A',
        smoke: '#8A8F94',
        // Apoyos derivados (sobrios)
        'ivory-dim': '#EAE7DF',
        'charcoal-soft': '#23262A',
        'petrol-bright': '#16566B',
        // ── Sistema "oscuro-lujo" (giro 2026-06-24, look del flyer navy+dorado) ──
        // Superficies navy escalonadas (de la más profunda a la elevada).
        midnight: '#0A1426',
        navy: '#0F2036',
        'navy-soft': '#16293F',
        'navy-line': '#24364E', // bordes/divisores tenues sobre navy
        // Dorado METÁLICO SOBRIO (nunca neón/fluorescente — ver compliance).
        gold: '#C9A24B',
        'gold-bright': '#E3C77A',
        'gold-deep': '#937234',
      },
      fontFamily: {
        // Display editorial (serif Fraunces variable). Body en Inter.
        display: ['"Fraunces Variable"', 'Georgia', 'Cambria', 'serif'],
        sans: ['"Inter Variable"', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      maxWidth: {
        stage: '1200px',
        readable: '68ch',
      },
      boxShadow: {
        glass: '0 1px 2px rgba(26,28,30,0.04), 0 8px 30px rgba(26,28,30,0.06)',
        'glass-dark': '0 1px 2px rgba(0,0,0,0.35), 0 18px 50px rgba(0,0,0,0.55)',
        cta: '0 12px 30px -10px rgba(201,162,75,0.5)',
        'gold-ring': '0 0 0 1px rgba(201,162,75,0.35), 0 14px 40px -16px rgba(201,162,75,0.4)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22,1,0.36,1) both',
      },
    },
  },
  plugins: [],
}
