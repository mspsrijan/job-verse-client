/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        montserrat: "'Montserrat', sans-serif",
      },

      colors: {
        customBlue: "#4440DA",
        customBlack: "#23232E",
      },
    },
  },
  plugins: [],
};
