import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#0A1230", // fundo geral (azul-marinho)
        "paper-2": "#111C42", // cards e blocos
        ink: "#E6EEFF", // texto principal (azul bem claro)
        "ink-soft": "#9FB2DC", // texto secundário
        rule: "#24336B", // linhas e bordas
        flag: "#3B82F6", // destaque (azul vivo)
        sun: "#5CE1FF", // destaque ciano (estilo IA)
        deep: "#060B20", // blocos mais escuros (menu, hero, downloads)
        light: "#EEF4FF", // texto claro sobre blocos escuros
        ok: "#34D399", // checklist marcado
      },
      fontFamily: {
        serif: ["var(--font-serif)", "system-ui", "sans-serif"], // títulos
        sans: ["var(--font-sans)", "system-ui", "sans-serif"], // texto
      },
    },
  },
  plugins: [],
};

export default config;