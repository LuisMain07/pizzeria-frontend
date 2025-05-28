/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pizza: {
          50: '#fef7ed',
          100: '#fdedd3',
          200: '#fbd5a5',
          300: '#f8b76d',
          400: '#f59333',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}