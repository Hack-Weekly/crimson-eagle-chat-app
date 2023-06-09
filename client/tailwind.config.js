/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-primary': 'rgb(var(--main-primary) / <alpha-value>)',
        'main-secondary': 'rgb(var(--main-secondary) / <alpha-value>)',
        'main-background': 'rgb(var(--main-background) / <alpha-value>)',
        'light-background': 'rgb(var(--light-background) / <alpha-value>)',
        'main-search-background':
          'rgb(var(--main-search-background) / <alpha-value>)',
        'main-sidebar-background':
          'rgb(var(--main-sidebar-background) / <alpha-value>)',
        'main-accent': 'rgb(var(--main-accent) / <alpha-value>)',
        'accent-red': 'rgb(var(--accent-red) / <alpha-value>)',
        'accent-blue': 'rgb(var(--accent-blue) / <alpha-value>)',
        'accent-pink': 'rgb(var(--accent-pink) / <alpha-value>)',
        'accent-purple': 'rgb(var(--accent-purple) / <alpha-value>)',
        'accent-orange': 'rgb(var(--accent-orange) / <alpha-value>)',
        'accent-green': 'rgb(var(--accent-green) / <alpha-value>)',
        'dark-primary': '#E7E9EA',
        'light-primary': '#F8FAFF',
        'light-secondary': '#F0F4FA',
        dark: '#212B36',
        'dark-secondary': '#161C24',
        'light-border': '#EFF3F4',
        'light-line-reply': '#CFD9DE',
        'twitter-icon': '#D6D9DB',
        'image-preview-hover': '#272C30',
      },
      boxShadow: {
        'main-shadow': '0 35px 60px -15px rgba(var(--main-accent))',
      },
    },
  },
  plugins: [],
}
