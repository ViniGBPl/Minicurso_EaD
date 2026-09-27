import type { Metadata } from "next";
import { Newsreader, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
});

export const metadata: Metadata = {
  title: "Análise Crítica de Vieses em Conteúdos Educacionais com IA",
  description:
    "Minicurso sobre como reconhecer e revisar vieses em materiais didáticos gerados por IA.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${newsreader.variable} ${plex.variable}`}>
      <body className="bg-paper text-ink font-sans">{children}</body>
    </html>
  );
}
