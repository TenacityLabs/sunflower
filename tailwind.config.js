/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      'arya': ['Arya', 'system-ui'],
      'bitter': ['Bitter', 'system-ui']
    },
    colors: {
      'offwhite': '#FFF9F5',
      'dark-brown': '#4F3A26',
      'dark-green': '#5F683C',
      'white': '#FFFFFF',
    },
    extend: {
      animation: {
        'spin-reveal': 'spin 0.5s linear',
        'spin-hide': 'reverse-spin 0.5s linear',
      },
      keyframes: {
        'reverse-spin': {
          from: {
            transform: 'rotate(360deg)'
          },
          to: {
            transform: 'rotate(0deg)'
          }
        }
      }
    },
  },
  plugins: [],
}

