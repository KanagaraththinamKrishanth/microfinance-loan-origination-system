/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef9ff',
          100: '#d8f1ff',
          200: '#b7e4ff',
          300: '#83d2ff',
          400: '#4ebbf7',
          500: '#1f9ae8',
          600: '#0a7cc2',
          700: '#0d5f96',
          800: '#124f7c',
          900: '#153f66'
        }
      },
      boxShadow: {
        soft: '0 10px 30px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
};
