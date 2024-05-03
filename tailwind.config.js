import withMT from '@material-tailwind/react/utils/withMT';

export default withMT({
  content: ['./index.html', './src/**/*.{ts,tsx}'],
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
  plugins: [],
});
