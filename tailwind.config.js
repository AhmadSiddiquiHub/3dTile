/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "myriad-variable-concept": ["Myriad Variable Concept", "sans-serif"],
      },
    },
  },
  plugins: [],
};
