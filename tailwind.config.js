const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      red: colors.red,
      gray: colors.gray,
      white: colors.white,
      black: colors.black,
      blue: colors.blue,
    },
  },
  safelist: ["text-red-500", "text-blue-500"],
  plugins: [],
};
