/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Scans all JS, JSX, TS, and TSX files in the 'src' directory
    './public/index.html',        // Include your main HTML file if it's in 'public'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
