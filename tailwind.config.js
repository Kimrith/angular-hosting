/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
    './node_modules/flowbite/**/*.js',
    './node_modules/flowbite-angular/**/*.js',
  ],
  theme: {
    extend: {
      // Example: Add custom screens or other extensions here
      // screens: {
      //   'iphone11': '414px',
      // }
    },
  },
  plugins: [require('flowbite/plugin')],
};
