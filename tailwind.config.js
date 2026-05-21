/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        background: '#f7f7f5',
        peach: {
          50:  '#fdf6f0',
          100: '#faeadb',
          200: '#f5d0b5',
          300: '#eeaf86',
          400: '#e68a55',
          500: '#d4693a',
          600: '#b84f2a',
          700: '#963c22',
          800: '#7a3120',
          900: '#642a1c',
        },
        warm: {
          50:  '#faf9f7',
          100: '#f5f0ea',
          200: '#ebe0d4',
          300: '#d9c5b0',
          400: '#c4a586',
          500: '#b08966',
          600: '#9a7150',
          700: '#7f5c40',
          800: '#6a4c36',
          900: '#58402f',
        },
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 20px rgba(0, 0, 0, 0.06)',
        'soft-md': '0 4px 30px rgba(0, 0, 0, 0.08)',
        'soft-lg': '0 8px 50px rgba(0, 0, 0, 0.10)',
        'soft-xl': '0 20px 80px rgba(0, 0, 0, 0.12)',
        'peach': '0 4px 24px rgba(212, 105, 58, 0.18)',
        'inner-soft': 'inset 0 1px 4px rgba(0,0,0,0.06)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.6 },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
