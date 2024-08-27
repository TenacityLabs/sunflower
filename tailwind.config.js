/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    fontFamily: {
      'arya': ['Arya', 'system-ui'],
      'bitter': ['Bitter', 'system-ui'],
      'bitter-italic': ['Bitter-italic', 'system-ui']
    },
    colors: {
      'offwhite': '#FFF9DE',
      'offblack': '#010101',
      'dark-brown': '#4F3A26',
      'dark-green': '#03351A',
      'white': '#FFFFFF',
      'darkish-brown': '#704F38',
      'light-grey': '#B9A89A',
    },
    extend: {
      animation: {
        'spin': 'spin 3s linear infinite',
      },
      transitionDuration: {
        '2000': '2000ms',
      }
    },
  },
  plugins: [],
}

