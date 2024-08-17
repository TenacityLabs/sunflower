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
      'dark-brown': '#4F3A26',
      'dark-green': '#5F683C',
      'white': '#FFFFFF',
      'darkish-brown': '#704F38',
      'light-grey': '#B9A89A',
    },
    extend: {
      animation: {
        'spin': 'spin 1s linear infinite',
        'wave': 'wave 3s linear infinite',
      },
      keyframes: {
        'reverse-spin': {
          from: {
            transform: 'rotate(360deg)'
          },
          to: {
            transform: 'rotate(0deg)'
          }
        },
        'wave': {
          '0%, 20%, 30%': { transform: 'initial' },
          '10%': { transform: 'translateY(-15px)' },
        },
      },
      animationDelay: {
        '0': '0s',
        '250': '0.25s',
        '500': '0.5s',
      },
      backgroundImage: {
        'footer': "url('images/footer-bg.png')",
      },
    },
  },
  plugins: [],
}

