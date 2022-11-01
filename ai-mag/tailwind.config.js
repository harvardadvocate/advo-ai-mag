module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
      backgroundColor: theme => ({
       ...theme('colors'),
       'blue': '#2196f3',
      })
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
