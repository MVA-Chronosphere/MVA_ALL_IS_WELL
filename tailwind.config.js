/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Inria Serif"', 'serif'], // for headings
        sans: ['Inter', 'sans-serif'],     // Inter becomes default sans (body)
      },
      colors: {
        primary: {
          navy: '#002d72',
          gold: '#d4af37',
        },
      },
    },
  },
  plugins: [],
}