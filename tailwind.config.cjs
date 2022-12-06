/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backgroundImage: {
      'login_bg' : "url('./login_bg.png')"
    },
    fontFamily: {
      'roboto':["Roboto", "sans-serif"]
    },
    extend: {},
  },
  plugins: [],
}