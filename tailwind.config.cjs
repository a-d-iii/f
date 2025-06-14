module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      keyframes: {
        fade: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pop: {
          '0%': { transform: 'scale(0.5)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        fade: 'fade 0.3s ease-in-out',
        pop: 'pop 0.3s ease-out',
      },
      fontFamily: {
        segoe: ['"Segoe UI"', 'Helvetica', 'Arial', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
      },
      colors: {
        darkpurple: '#0a0116',
        seablue: '#0284c7',
        darkblue: '#1e3a8a',
      },
    },
  },
  plugins: [require('tailwindcss-filters')],
};
