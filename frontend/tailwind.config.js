/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(0 0% 0%)',
        foreground: 'hsl(0 0% 100%)',
        muted: {
          DEFAULT: 'hsl(0 0% 5%)',
          foreground: 'hsl(0 0% 65%)',
        },
        card: 'hsl(0 0% 5%)',
        border: 'hsl(0 0% 20%)',
        primary: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(0 0% 0%)',
        },
        secondary: {
          DEFAULT: 'hsl(0 0% 15%)',
          foreground: 'hsl(0 0% 100%)',
        },
        accent: {
          DEFAULT: 'hsl(0 0% 100%)',
          foreground: 'hsl(0 0% 0%)',
        },
        destructive: {
          DEFAULT: 'hsl(0 84.2% 60.2%)',
          foreground: 'hsl(0 0% 100%)',
        },
        ring: 'hsl(0 0% 80%)',
        // Landing: i quattro stati del semaforo sono i colori del soggetto.
        ink: 'rgb(11 12 11 / <alpha-value>)',
        paper: 'rgb(241 241 236 / <alpha-value>)',
        verde: 'rgb(23 178 106 / <alpha-value>)',
        giallo: 'rgb(245 197 24 / <alpha-value>)',
        arancio: 'rgb(240 120 24 / <alpha-value>)',
        rosso: 'rgb(229 72 77 / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Archivo', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero-title': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-subtitle': ['1.125rem', { lineHeight: '1.5' }],
        // Cinque gradini, lontani fra loro.
        small: ['var(--step-small)', { lineHeight: '1.45' }],
        body: ['var(--step-body)', { lineHeight: '1.55' }],
        lead: ['var(--step-lead)', { lineHeight: '1.3' }],
        head: ['var(--step-head)', { lineHeight: '0.95', letterSpacing: '-0.025em' }],
        display: ['var(--step-display)', { lineHeight: '0.84', letterSpacing: '-0.035em' }],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
