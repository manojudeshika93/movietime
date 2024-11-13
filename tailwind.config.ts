import plugin from 'tailwindcss/plugin';

import colors from './src/config/tailwind.colors';
import tailwindUtils from './src/config/tailwind.utils';

module.exports = {
  theme: {
    colors: colors,
    extend: {
      boxShadow: {
        md: '0px 0px 4px 1px #00000014',
        lg: '0px 0px 7px 0px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities(tailwindUtils);
    }),
  ],
};
