/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: '#0B3C5D',
        sky: '#328CC1',
        gold: '#D9B310',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'serif'],
        sans: ['"IBM Plex Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

