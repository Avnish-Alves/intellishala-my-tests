import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      screens: {
        wide: "1440px",
        short: { raw: "(min-width: 1024px) and (max-height: 929px)" },
      },
      colors: {
        brand: "#0156f3",
        "brand-soft": "#e9f1fe",
        page: "#f9fafd",
        line: "#f2f2f2",
        ink: "#1f2227",
        muted: "#6b7280",
        faint: "#9ca3af",
        danger: "#fb282f",
        "danger-ink": "#c81e25",
        "danger-soft": "#fef1f0",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
