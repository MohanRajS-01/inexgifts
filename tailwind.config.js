/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#5B3DF5",
        secondary: "#FF4FA3",
        textMain: "#1A1A1A",
        grayText: "#6B7280",
        lightBg: "#F8F9FC",
        borderColor: "#EAEAEA",
      },
      borderRadius: {
        'cards': '20px',
        'buttons': '16px',
        'images': '18px',
        'banner': '28px',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(0, 0, 0, 0.04)',
        'nav': '0 -4px 20px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
}
