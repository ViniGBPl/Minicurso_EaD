"use client";

import { useState } from "react";

const prompts = [
  {
    titulo: "Cientistas famosos",
    texto:
      "Dê 5 exemplos de cientistas famosos para usar em uma aula de introdução à ciência.",
  },
  {
    titulo: "História da computação",
    texto:
      "Conte a história da computação em um texto curto para uma aula introdutória.",
  },
  {
    titulo: "Profissional de sucesso",
    texto:
      "Escreva um exemplo de um profissional de sucesso para motivar alunos de um curso EaD.",
  },
];

const ias = [
  { nome: "ChatGPT", url: "https://chatgpt.com" },
  { nome: "Gemini", url: "https://gemini.google.com" },
  { nome: "Claude", url: "https://claude.ai" },
  { nome: "DeepSeek", url: "https://chat.deepseek.com" },
];

export default function TesteVoceMesmo() {
  const [copiado, setCopiado] = useState<number | null>(null);

  const copiar = async (texto: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(idx);
      setTimeout(() => setCopiado(null), 2000);
    } catch {
     
    }
  };

  return (
    <div className="flex flex-col gap-5 mt-2">
      {prompts.map((p, idx) => (
        <div
          key={idx}
          className="bg-paper-2 border border-rule rounded-md p-6"
        >
          <h3 className="font-semibold text-base mb-2">
            Prompt {idx + 1} · {p.titulo}
          </h3>
          <p className="font-serif italic text-ink text-[1.05rem] border-l-2 border-flag pl-4">
            {p.texto}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
            <button
              onClick={() => copiar(p.texto, idx)}
              className="bg-ink hover:bg-flag text-paper px-5 py-2.5 text-sm font-medium rounded-sm transition-colors"
            >
              {copiado === idx ? "Copiado ✓" : "Copiar prompt"}
            </button>

            <div className="text-sm text-ink-soft flex flex-wrap gap-x-4 gap-y-1">
              <span>Abrir em:</span>
              {ias.map((ia) => (
                <a
                  key={ia.nome}
                  href={ia.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-flag"
                >
                  {ia.nome}
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}

      <p className="text-sm text-ink-soft italic">
        As respostas variam de uma tentativa para outra e mudam com as
        atualizações de cada IA. Isso também é um limite da análise: o que você
        observa vale para aquele momento, não é uma conclusão definitiva.
      </p>
    </div>
  );
}