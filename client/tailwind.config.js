/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        "minus-nav": "calc(100vh - 64px)",
        sm: {
          "minus-nav": "calc(100vh - 56px)",
        }
      },
      minHeight: {
        "minus-nav": "calc(100vh - 64px)",
        sm: {
          "minus-nav": "calc(100vh - 56px)",
        }
      }
    },
  },
  plugins: [],
}