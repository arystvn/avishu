/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        wider: '0.15em',
        widest: '0.3em',
      },
      borderWidth: {
        DEFAULT: '1px',
      },
    },
  },
  plugins: [],
}

