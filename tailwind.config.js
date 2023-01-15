/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    screens: {
      xs: '320px',
      sm: '360px',
    },
    colors: {
      magenta: {
        300: '#a00083',
        400: '#bf0051',
      },
      gray: {
        100: '#e2dee1',
        300: '#c3c3c3',
      },
      blue: '#4880fa',
      black: '#000000',
      white: '#ffffff',
    },
    fontSize: {
      base: '1rem',
      sm: '0.85rem',
      md: '1.25rem',
      lg: '1.5rem',
    },
  },
  plugins: [],
}
