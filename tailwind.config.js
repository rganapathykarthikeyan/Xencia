/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        NavGradiantStart: "#1F922B",
        NavGradiantMid: "#3B7DB9",
        NavGradiantEnd: "#143A8E",
        statusGreen: "#00D408"
      }
    },
    fontFamily: {
      sand: ["QuickSand", "sans-serif"],
    },
  },
  plugins: [],
}

