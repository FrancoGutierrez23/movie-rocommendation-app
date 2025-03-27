import { defineConfig } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
const config = defineConfig({
  content: [
    './index.html', // If using Vite or basic HTML
    './src/**/*.{js,ts,jsx,tsx}', // For React/TypeScript
  ],
  theme: {
    extend: {
      maskImage: {
        fadeX: 'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0))',
      },
      WebkitMaskImage: {
        fadeX: 'linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 20%, rgba(0,0,0,1) 80%, rgba(0,0,0,0))',
      },
    },
  },
  plugins: [],
});

export default config;
