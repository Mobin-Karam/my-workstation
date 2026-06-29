import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      fontFamily: {
        sans: ["Vazirmatn", "system-ui", "sans-serif"],
      },
    },
  },

  plugins: [],
} satisfies Config;