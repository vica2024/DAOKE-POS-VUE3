/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,js,jsx,tsx}'
  ],
  theme: {
    extend: {
      style: {
        fontSize: {
          tiny: '0.625rem', // 10px
          small: '0.75rem', // 12px
        },
      },
      screens: {
        xl:'1280px'
      },
    },
  },
  plugins: [],
};
