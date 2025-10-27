/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        'gutter': '2rem',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        nunito: ['Nunito', 'sans-serif'],
      },
      colors: {
        dark: {
          bg: '#0f172a',
          surface: '#1e293b',
          text: '#f8fafc',
          border: '#334155',
        }
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
    },
  },
  
}
}