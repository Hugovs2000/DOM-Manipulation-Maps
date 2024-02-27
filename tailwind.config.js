/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.{js.ts,html}",
    "./src/*.{js,ts,html}",
    "./src/**/*.{js,ts,html}",
  ],
  theme: {
    extend: {
      boxShadow: {
        std: "0 0 10px 0px gray",
      },
      fontFamily: {
        Anta: "Anta",
      },
    },
  },
  plugins: [],
};
