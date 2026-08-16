/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1F2937',
        secondary: '#3B82F6',
        accent: '#DC2626',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        neutral: '#F3F4F6',
      },
      fontSize: {
        h1: ['32px', { lineHeight: '40px', fontWeight: '700' }],
        h2: ['24px', { lineHeight: '32px', fontWeight: '600' }],
        body: ['16px', { lineHeight: '24px' }],
        small: ['14px', { lineHeight: '20px' }],
      },
      spacing: {
        0: '0px',
        1: '8px',
        2: '16px',
        3: '24px',
        4: '32px',
        5: '40px',
        6: '48px',
        8: '64px',
        10: '80px',
      },
      minHeight: {
        48: '48px',
      },
      minWidth: {
        48: '48px',
      },
    },
  },
  plugins: [],
}
