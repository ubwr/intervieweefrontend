/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '250px',
      'xsm': '450px',
      'sm': '640px',
      'md': '751px',
      'mdlg': '900px',
      'lg': '1152px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontSize: {
        'xxs': '0.6rem',
      },
      spacing: {
        '108': '27rem',
        '128': '32rem',
        '160': '40rem',
        '200': '50rem',
      },
      colors: {
        primary: '#00B2FF',
        lightGray: '#f4f3f3',
        mediumLightGray: '#9e9e9e',
        secondary: '#BF282F',
        darkGray: '#242424',
        darkBlue: '#0089c4',
        mediumGray: '#5C5C5C',
        colorGreen: '#00C714',
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
        'koulen': ['koulen', 'sans-serif'],
        'noyhgeometric': ['noyhgeometric', 'sans-serif'],
        'noyhgeometric-medium': ['noyhgeometric-medium', 'sans-serif'],
        'kenyan': ['kenyan', 'sans-serif'],
        'newsreader': ['newsreader', 'sans-serif']
      }
    }
  },
  plugins: [],
}