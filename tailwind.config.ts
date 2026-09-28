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
        paper: "#FAFAF8",       /* Fundo principal (off-white) */
        "paper-2": "#F3F1ED",   /* Fundo secundário (cards) */
        ink: "#1A1A1A",         /* Texto principal */
        "ink-soft": "#595959",  /* Texto secundário */
        rule: "#E6E4DF",        /* Cor das linhas/bordas */
        flag: "#2563EB",        /* Azul para botões e links */
        ok: "#16A34A",          /* Verde para os checkmarks */
      },
      fontFamily: {
        sans: ["var(--font-plex)"],
        serif: ["var(--font-newsreader)"],
      },
    },
  },
  plugins: [],
};
export default config;