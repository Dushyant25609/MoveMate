/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,ts,tsx}', './src/components/**/*.{js,ts,tsx}','./src/screens/**/*.{js,ts,tsx}'],

  presets: [require('nativewind/preset')],
  theme: {
     extend: {
       colors: {
         'primary-dark': '#14123b',
         'primary-light': '#14123b',
         'text-light': '#9064f5',
         'text-dark': '#000000',
      },
    },
  },
  plugins: [],
};
