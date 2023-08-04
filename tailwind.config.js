/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    '*.html',
    'scripts/*'
  ],
  theme: {
    fontFamily: {
      'gym': ['Blinker', 'sans-serif']
    },
    extend: {}
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

