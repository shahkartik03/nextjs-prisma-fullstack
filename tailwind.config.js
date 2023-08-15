/** @type {import('tailwindcss').Config} */
module.exports = {
  // remvoed page dir from the list below
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {},
    },
  },
  plugins: [],
}
