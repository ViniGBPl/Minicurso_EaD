import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

// Mantive o nome da variável --font-serif para os componentes continuarem
// funcionando; ela agora aponta para a fonte dos títulos (Space Grotesk).
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
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
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="bg-paper text-ink font-sans antialiased">
        {children}
      </body>
    </html>
  );
}