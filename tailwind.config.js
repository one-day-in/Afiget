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
          25: '#FCFAF5',
          50: '#F8F4EC',
          100: '#F3EDE3',
          200: '#EAE0D2',
          300: '#DFD1BF',
          400: '#C9B69B',
        },
        warm: {
          dark: '#32251D',
          chocolate: '#3C2B21',
          espresso: '#503B2D',
          muted: '#726559',
          border: '#E1D4C2',
        },
        terracotta: {
          500: '#8A4549',
          600: '#77383F',
          700: '#652D35',
        },
        caramel: {
          500: '#AC8655',
          600: '#906B3E',
          700: '#745331',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope"', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
