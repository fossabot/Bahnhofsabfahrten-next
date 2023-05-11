/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif']

    }
  },
  plugins: [],
}