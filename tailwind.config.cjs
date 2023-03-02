/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        primary:"#264E35",
        "status-online":"#24AB57",
        "button-login":"#2D805C",
        "input-massage":"#E5CFAF",
        "bg-close-camera":"#202124"
      }
    },
  },
  plugins: [],
};
