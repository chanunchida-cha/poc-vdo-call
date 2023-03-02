/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        primary:"#264E35",
        secondary:"#6c4605",
        "secondary-light":"#e6cfaf",
        "primary-light":"#2D805C",
        "status-online":"#24AB57",
        "button-login":"#2D805C",
        "input-massage":"#E5CFAF",
        "active-secondary":"#6c4605",

      }
    },
  },
  plugins: [],
};
