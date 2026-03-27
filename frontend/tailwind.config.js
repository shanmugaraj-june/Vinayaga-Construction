/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: '#F5B800',
          black: '#0A0A0A',
          dark: '#111111',
          gray: '#1A1A1A',
          light: '#F8F8F0',
        }
      },
    },
  },
  plugins: [],
}
