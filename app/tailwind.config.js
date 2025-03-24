/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'blue-bg': '#4F46E5',
        'button-color': '#10B981',
        gold: '#F59E0B',
        'light-gray-bg': '#F3F4F6',
        'text-color': '#1F2937',
        'light-gray-border': '#D1D5DB',
        'indigo-blue-dark': '#4338CA',
        black: '#000000',
      },
    },
  },
  plugins: [require('daisyui')],
}
