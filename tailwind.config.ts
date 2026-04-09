import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif:  ["Satoshi", "system-ui", "sans-serif"],
        sans:   ["Satoshi", "system-ui", "sans-serif"],
      },
      colors: {
        ink:       "#1a1510",
        espresso:  "#2c2018",
        walnut:    "#3d2e1e",
        tobacco:   "#6b4f35",
        tan:       "#9a7d5f",
        linen:     "#c8b49a",
        parchment: "#e2d5c3",
        cream:     "#f0e8db",
        brass:     "#a8895a",
      },
    },
  },
  plugins: [],
};

export default config;
