// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      extend: {
        colors: {
          primary: '#0f172a',     // dark navy
          background: '#0b1120',  // near-black background
          surface: '#1e293b',     // card/section background
          accent: '#38bdf8',      // bright blue (buttons, highlights)
          highlight: '#facc15',   // golden yellow (callouts, hover)
          muted: '#94a3b8',       // soft gray text
          border: '#334155',      // soft border
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        boxShadow: {
          glow: '0 0 10px rgba(56, 189, 248, 0.5)',
        },
        backgroundImage: {
          'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
          'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        },
      },
    },
    plugins: [],
  }
  