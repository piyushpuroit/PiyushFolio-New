/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#141414",
        secondary: "#0f0f0f",
        accent: {
          start: "#00f2fe",
          end: "#4facfe"
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        tech: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
