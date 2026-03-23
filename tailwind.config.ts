import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'bg-0': '#0B0D10',
        'bg-1': '#11151B',
        'panel': '#0F1318',
        'text-primary': '#E9EEF5',
        'muted': '#A9B3C1',
        'line': 'rgba(255,255,255,0.10)',
        'accent-red': '#B0161C',
        'accent-red-hover': '#8F1116',
        'steel-highlight': 'rgba(255,255,255,0.06)',
      },
      borderRadius: {
        'img': '5px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
