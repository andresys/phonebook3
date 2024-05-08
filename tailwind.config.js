/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/views/**/*.html.erb',
    './app/helpers/**/*.rb',
    './app/assets/stylesheets/**/*.css',
    './app/javascript/**/*.js'
  ],
  theme: {
    screens: {
      'sm': '500px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
      'tall': { 'raw': '(min-height: 800px)' },
    },
    extend: {
      colors: {
        pb: {
          50:  '#F5F7FA',
          100: '#E9EEF5',
          200: '#CEDBE9',
          300: '#A3BCD6',
          400: '#729ABE',
          500: '#507DA7',
          600: '#446E9B',
          700: '#335071',
          800: '#2D455F',
          900: '#293B51',
          950: '#1C2735'
        },
      },
    },
  },
  plugins: [],
}