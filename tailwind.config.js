/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'usa-red':    '#B22234',
        'usa-blue':   '#002868',
        'mex-green':  '#006847',
        'gold':       '#FFD700',
        'bg-dark':    '#0A0A0A',
        'card-dark':  '#1A1A1A',
        'card-hover': '#222222',
        'border-dim': '#2A2A2A',
      },
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        body:    ['"Inter"', 'sans-serif'],
      },
      animation: {
        'fade-in':    'fadeIn 0.3s ease-in-out',
        'slide-up':   'slideUp 0.3s ease-out',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:    { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp:   { '0%': { transform: 'translateY(10px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
        pulseGold: { '0%, 100%': { boxShadow: '0 0 0 0 rgba(255,215,0,0.4)' }, '50%': { boxShadow: '0 0 0 8px rgba(255,215,0,0)' } },
      },
    },
  },
  plugins: [],
}
