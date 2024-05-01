const { nextui } = require('@nextui-org/react');

export default {
  content: [
    './index.html',
    './src/**/*.{ts,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      transitionProperty: {
        width: 'width',
      },
      transitionDuration: {
        200: '200ms',
        300: '300ms',
      },
      colors: {
        primaryColor: 'var(--primary-color)',
        secondaryColor: 'var(--secondary-color)',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
