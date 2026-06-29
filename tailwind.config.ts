import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#111111",
        foreground: "#F5F5F5",
        muted: "#A5A5A5",
        accent: {
          DEFAULT: "#9333EA",
          glow: "#A855F7",
          silver: "#D1D1D1",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      boxShadow: {
        "neon-purple":
          "0 0 20px rgba(147, 51, 234, 0.35), 0 0 40px rgba(147, 51, 234, 0.15)",
        "neon-purple-lg":
          "0 0 30px rgba(147, 51, 234, 0.5), 0 0 60px rgba(147, 51, 234, 0.2)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.4)",
      },
      animation: {
        "glow-pulse": "glow-pulse 2.5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { filter: "drop-shadow(0 0 8px rgba(147,51,234,0.3))" },
          "50%": { filter: "drop-shadow(0 0 20px rgba(147,51,234,0.6))" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
