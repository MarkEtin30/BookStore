/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // this give the abily to make dark/light mode!! css tailwind
  // by also adding in the <div class="dark">!!!
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {},
  },
  plugins: [],
};
