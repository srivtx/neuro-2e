import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: {
          850: "#1f1f1f",
          950: "#0a0a0a",
        },
        accent: {
          DEFAULT: "#ffffff",
          muted: "#a1a1aa",
          dim: "#52525b",
        },
        danger: "#ef4444",
        warn: "#f59e0b",
        success: "#22c55e",
        info: "#3b82f6",
      },
      fontFamily: {
        sans: ["Geist", "Inter", "system-ui", "sans-serif"],
        mono: ["GeistMono", "Fira Code", "monospace"],
      },
      borderRadius: {
        DEFAULT: "0.375rem",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
