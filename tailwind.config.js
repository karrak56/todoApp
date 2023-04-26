/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '105': '420px',
        '128': '512px',
        '780': '780px',
        '1445': '1445px',
        'nav': '75px'
      },
      height: {
        '416': '416px',
        '128': '512px',
        '780': '780px',
        '861': '861px'
      },
      maxWidth: {
        'nav': '200px'
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
  ],
}