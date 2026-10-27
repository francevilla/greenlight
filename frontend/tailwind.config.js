/**
 * Greenlight SaaS — Tailwind Config
 * Italian Editorial direction.
 */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        border: 'hsl(var(--border))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        ring: 'hsl(var(--ring))',

        // Brand semantic — Verde Foresta (primary firm)
        verde: {
          50: 'rgb(240 253 244 / <alpha-value>)',
          100: 'rgb(220 252 231 / <alpha-value>)',
          500: 'rgb(34 197 94 / <alpha-value>)',
          700: 'rgb(21 128 61 / <alpha-value>)',
          900: 'rgb(20 83 45 / <alpha-value>)',
        },

        // Semantic — Semaforo credito (accessibile WCAG AA)
        semaforo: {
          verde: '#17b26a',
          giallo: '#f5c518',
          arancio: '#f07818',
          rosso: '#e5484d',
          pending: '#6366f1',
          error: '#78716c',
        },

        // Accent — Oro spento
        oro: {
          DEFAULT: 'rgb(176 137 104 / <alpha-value>)',
        },

        // Landing editorial tones
        ink: 'rgb(11 12 11 / <alpha-value>)',
        paper: 'rgb(241 241 236 / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['"Source Serif 4"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
        display: ['"Source Serif 4"', 'Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.3rem, 10.6vw, 9.5rem)', { lineHeight: '0.84', letterSpacing: '-0.035em' }],
        'head': ['clamp(2rem, 1.35rem + 3vw, 3.75rem)', { lineHeight: '0.95', letterSpacing: '-0.025em' }],
        'lead': ['clamp(1.1875rem, 1.05rem + 0.65vw, 1.625rem)', { lineHeight: '1.3', letterSpacing: '0' }],
        'body': ['clamp(1.0625rem, 1rem + 0.25vw, 1.1875rem)', { lineHeight: '1.55', letterSpacing: '0' }],
        'small': ['clamp(0.8125rem, 0.79rem + 0.1vw, 0.875rem)', { lineHeight: '1.45', letterSpacing: '0' }],
        'xs': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.02em' }],
      },
      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '12px',
        full: '9999px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'ignite': 'ignite 420ms 320ms both cubic-bezier(0.2, 0.7, 0.3, 1)',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
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
        ignite: {
          '0%': { opacity: '0.15', transform: 'scale(1.22)' },
          '55%': { opacity: '1', transform: 'scale(0.97)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
