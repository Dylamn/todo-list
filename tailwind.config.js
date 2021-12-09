module.exports = {
  purge: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
        'primary': '#282c34',
        'primary-variant': '#31373e',
      }),
      screens: {
        'xs': '320px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
