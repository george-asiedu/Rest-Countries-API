/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        darkNavy: '#2B3844',
        veryDarkNavy: '#202C36',
        black: '#111517',
        lightBackground: '#979797',
        paraText: '#808080'
      }
    },
  },
  plugins: [],
}