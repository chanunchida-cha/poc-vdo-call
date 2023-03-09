/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#264E35",
        secondary: "#6c4605",
        "secondary-light": "#e6cfaf",
        "primary-light": "#2D805C",
        "status-online": "#24AB57",
        "button-login": "#2D805C",
        "input-massage": "#E5CFAF",
        "active-secondary": "#6c4605",
        "bg-close-camera": "#202124",
        "call-button": "#0D2C1D",
      },
    },
    screens: {
      'xs': "160px",
      // => @media (min-width: 640px) { ... }
      'sm': "640px",
      // => @media (min-width: 640px) { ... }

      'md': "768px",
      // => @media (min-width: 768px) { ... }

      'lg': "1024px",
      // => @media (min-width: 1024px) { ... }

      'xl': "1280px",
      // => @media (min-width: 1280px) { ... }

      '2xl': "1536px",
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
};
