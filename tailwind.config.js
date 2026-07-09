/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        cursive: ['Dancing Script', 'cursive']
      },
      colors: {
        primary: '#5B3EE0', // Purple button color
        secondary: '#E53B75', // Pink text/badges
      }
    },
  },
  plugins: [],
}
