/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "bright-blue": "hsl(220, 98%, 61%)",
        "check-background":
          "linear-gradient hsl(192, 100%, 67%) to hsl(280, 87%, 65%)",
        "light-theme-very-light-gray": "hsl(0, 0%, 98%)",
        "light-theme-very-light-grayish": "hsl(236, 33%, 92%)",
        "light-theme-light-grayish-blue": "hsl(233, 11%, 84%)",
        "light-theme-dark-grayish-blue": "hsl(236, 9%, 61%)",
        "light-theme-very-dark-grayish-blue": "hsl(235, 19%, 35%)",
        "dark-theme-very-dark-blue": "hsl(235, 21%, 11%)",
        "dark-theme-very-dark-desaturated-blue": "hsl(235, 24%, 19%)",
        "dark-theme-light-grayish-blue": "hsl(234, 39%, 85%)",
        "dark-theme-light-grayish-blue-hover": "hsl(236, 33%, 92%)",
        "dark-theme-dark-grayish-blue": "hsl(234, 11%, 52%)",
        "dark-theme-very-dark-grayish-blue": "hsl(233, 14%, 35%)",
        "dark-theme-very-dark-grayish-blue-hover": "hsl(237, 14%, 26%)",
      },
      fontFamily: {
        "josefin-sans": ["Josefin Sans", "sans-serif"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require('tailwindcss-themer'),
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: "18px" },
      });
    }),
  ],
};
