const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addComponents, theme }) => {
      const spacing = theme('spacing', {})
      addComponents({
        '.stack': {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        },
        '.stack > *': {
          marginTop: 0,
          marginBottom: 0,
        },
        '.stack > * + *': {
          marginTop: spacing['6'],
        },
      })
      for (const [size, marginTop] of Object.entries(spacing)) {
        addComponents({
          [`.stack-${size} > * + *`]: marginTop,
        })
      }
    }),
  ],
}
