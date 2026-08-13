/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1a1612',
        paper: '#fffaf2',
        raised: '#f3e8d8',
        line: '#e0d2bd',
        copper: {
          DEFAULT: '#c56a2d',
          bright: '#a24e16',
          dim: '#e8b48a',
        },
        sage: '#3d6b56',
        oxide: '#b4452e',
        dust: '#8a7d6e',
        fog: '#4e463c',
        cream: '#1a1612',
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['IBM Plex Sans', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['IBM Plex Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        panel: '0 0 0 1px #e0d2bd, 0 22px 48px -28px rgba(80, 48, 18, 0.28)',
        inset: 'inset 0 1px 0 rgba(255, 255, 255, 0.7)',
      },
      letterSpacing: {
        catalog: '0.22em',
      },
      animation: {
        'filament-pulse': 'filament-pulse 1.8s ease-in-out infinite',
        caret: 'caret 1s steps(1) infinite',
        shimmer: 'shimmer 1.6s linear infinite',
      },
      keyframes: {
        'filament-pulse': {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.15)' },
        },
        caret: {
          '0%, 49%': { opacity: '1' },
          '50%, 100%': { opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
