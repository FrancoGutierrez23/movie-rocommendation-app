import { defineConfig } from 'tailwindcss';
import animations from '@midudev/tailwind-animations';

/** @type {import('tailwindcss').Config} */
const config = defineConfig({
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
  },
  plugins: [
    animations
  ],
});

export default config;
