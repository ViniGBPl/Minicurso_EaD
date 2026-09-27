import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FAF7F1",
        "paper-2": "#F1ECE2",
        ink: "#201F1C",
        "ink-soft": "#55524A",
        flag: "#B23A26",
        "flag-soft": "#E7C9BE",
        ok: "#3E6259",
        "ok-soft": "#D9E3DA",
        rule: "#D8D1C1",
      },
      fontFamily: {
        serif: ["var(--font-newsreader)", "Georgia", "serif"],
        sans: ["var(--font-plex)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
