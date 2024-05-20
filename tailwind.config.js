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
        statusGreen: "#00D408",
        titleBlue: "#1E66AE",
        greyText: "#212121",
        greyText2: "#666666",
        blueBg: "#1875F0",
        darkModeSide: "#2F2F2F",
        chatDark: "#DCE4E9"
      },
      backgroundImage: {
        backgroundImg: "url('/images/bg-small.svg')"
      },
    },
    fontFamily: {
      sand: ["QuickSand", "sans-serif"],
    },
  },
  plugins: [],
}

