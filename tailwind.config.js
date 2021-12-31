module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        top: "0 -2px 5px 0 rgb(0 0 0 / 20%)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
