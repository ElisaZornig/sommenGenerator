/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  // tailwind.config.js
    theme: {
      extend: {
        fontFamily: {
          comic: ['"Comic Neue"', 'cursive'],
        },
      },
    },
  plugins: [],

}

