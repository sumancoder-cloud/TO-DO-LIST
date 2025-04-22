/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2B8CFF',
        secondary: '#F5F5F5',
        dark: '#1A1A1A',
      },
    },
  },
  plugins: [],
}

