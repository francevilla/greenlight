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
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Instrument Serif', 'Georgia', 'serif'],
      },
      fontSize: {
        'hero-title': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-subtitle': ['1.125rem', { lineHeight: '1.5' }],
        'testimonial': ['clamp(2.5rem, 5vw, 3.5rem)', { lineHeight: '1.2' }],
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