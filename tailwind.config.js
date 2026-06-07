/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        alex: ['"Alex Brush"', 'cursive'],
        allura: ['"Allura"', 'cursive'],
        greatvibes: ['"Great Vibes"', 'cursive'],
        sacramento: ['"Sacramento"', 'cursive'],
        pinyon: ['"Pinyon Script"', 'cursive'],
        monsieur: ['"Monsieur La Doulaise"', 'cursive'],
      },
    },
  },
  plugins: [],
};
