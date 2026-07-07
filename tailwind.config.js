/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#09090B",
        primary: "#3B82F6",
        secondary: "#06B6D4",
        accent: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        muted: "#A1A1AA"
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
}
