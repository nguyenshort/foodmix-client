module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      transitionDuration: {
        '2000': '2000ms',
      },
      width: {
        '300': '300px'
      },
      minHeight: {
        'screen-1/2': '50vh'
      }
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      'dark': '#25262f',
    })
  },
  variants: {
    extend: {
      borderWidth: ['last']
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('tailwind-scrollbar')
  ],
}
