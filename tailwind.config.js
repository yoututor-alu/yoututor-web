/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        deepNavy: "#151936", // primary background, text emphasis
        gray: "#979797", // muted text, borders
        softPink: "#FED6D6", // soft pink, accents/highlights
        aquaMint: "#BDF0E6", // secondary accent
        lightCyan: "#D8EFF2", // background sections
        paleMint: "#E2F7F3" // hover/card backgrounds
      },
      fontFamily: {
        sans: [
          "Nunito Sans",
          "DM Sans",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
};
