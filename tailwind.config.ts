import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#FDF8F5",
          text: "#1A0F0A",
          secondary: "#6B5549",
          muted: "#9E8B82",
          border: "#EAE0D9",
          orange: "#FF4D1C",
          purple: "#7B3FAD",
          pink: "#D4547A",
          card: "#FFFFFF",
          dark: "#1A0F0A",
        },
      },
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        sans: ["var(--font-dm-sans)", "DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
