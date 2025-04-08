import { defineConfig } from 'tailwindcss';
import animations from '@midudev/tailwind-animations';

/** @type {import('tailwindcss').Config} */
const config = defineConfig({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      screens: {
      '3xs': '256px',
      '2xs': '288px',
      'xs': '320px',
      '2xl': '1536px',
    }
    }
    
  },
  plugins: [
    animations
  ],
});

export default config;
