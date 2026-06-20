import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "Arial", "sans-serif"],
      },
      colors: {
        ink: "#202020",
        muted: "#72787f",
        page: "#f4f7f9",
        line: "#d9dee3",
      },
      boxShadow: {
        soft: "0 18px 60px rgba(24, 28, 32, 0.08)",
        card: "0 10px 28px rgba(24, 28, 32, 0.07)",
      },
      borderRadius: {
        panel: "8px",
      },
    },
  },
  plugins: [],
};

export default config;
