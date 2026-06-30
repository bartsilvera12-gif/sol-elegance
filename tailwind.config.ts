import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#14100b", dark: "#0e0b07", alt: "#100c08", card: "#1c1710" },
        ink: { 100: "#f6efe2", 200: "#f4ece0", 300: "#c4b69d", 400: "#9c8d74", 500: "#7a6e58" },
        gold: { DEFAULT: "#c6a76b", light: "#e7d2a3", soft: "#f0dcab", deep: "#caa86a" },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', "serif"],
        body: ['"Jost"', "sans-serif"],
        script: ['"Pinyon Script"', "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
