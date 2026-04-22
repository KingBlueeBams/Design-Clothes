/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ground: '#1C1C20', // Deep concrete
        ghost: '#A09B94',
        ink: '#0E0C0A',
        neon: {
          cyan: '#00FFE6',
          magenta: '#FF14AA',
          yellow: '#D2FF00'
        }
      },
      fontFamily: {
        monumental: ['"Big Shoulders Display"', 'sans-serif'],
        mono: ['"Geist Mono"', 'monospace'],
        body: ['"Outfit"', 'sans-serif'],
      },
      fontSize: {
        micro: '0.65rem', // 10.4px
        monumental: 'clamp(5rem, 15vw, 12rem)', 
      },
      boxShadow: {
        'neumorphic-dark': '8px 8px 16px #131316, -8px -8px 16px #25252a',
        'neumorphic-dark-inset': 'inset 8px 8px 16px #131316, inset -8px -8px 16px #25252a',
        'neon-cyan': '0 0 15px 2px rgba(0, 255, 230, 0.4)',
        'neon-magenta': '0 0 15px 2px rgba(255, 20, 170, 0.4)',
        'neon-yellow': '0 0 15px 2px rgba(210, 255, 0, 0.4)',
      },
      letterSpacing: {
        widest: '.25em',
      }
    },
  },
  plugins: [],
}
