/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: "'Nunito Variable', sans-serif",
      },
    },
  },
  plugins: [require("tailwindcss-safe-area"), require("tailwindcss-animate")],
};
