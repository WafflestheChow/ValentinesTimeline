/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"Inter"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 20px 60px rgba(255, 120, 160, 0.25)'
      },
      colors: {
        blush: '#FDE2E7',
        rose: '#F9B4C4',
        berry: '#B2465C'
      }
    }
  },
  plugins: []
};
