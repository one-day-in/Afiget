/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          25: '#F2DFC1',
          50: '#E9C69B',
          100: '#EDCFAB',
          200: '#DFBA8F',
          300: '#CFA376',
          400: '#B98756',
        },
        warm: {
          dark: '#352318',
          chocolate: '#54290F',
          espresso: '#6B391E',
          muted: '#60442F',
          border: '#B98D60',
        },
        terracotta: {
          500: '#90532F',
          600: '#794126',
          700: '#622F1A',
        },
        caramel: {
          500: '#A86C3D',
          600: '#89532D',
          700: '#6C3E21',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Source Sans 3"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
