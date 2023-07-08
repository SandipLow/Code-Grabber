/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./client/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'cdek-black' : '#212121',
        'cdek-aqua' : '#04D8FB',
        'cdek-gray' : '#707171',
        'cdek-blue' : '#0484BC',
      },
      spacing: {
        '1/10' : '10%',
        '2/10' : '20%',
        '4/10' : '40%',
        '6/10' : '60%',
        '8/10' : '80%',
      },
    },
  },
  plugins: [],
}