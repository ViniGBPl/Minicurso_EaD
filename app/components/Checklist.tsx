"use client";

import { useState } from "react";

export default function Checklist() {
  const [checked, setChecked] = useState<number[]>([]);

  const criterios = [
    "Os personagens fogem de estereótipos comuns de gênero, raça ou classe?",
    "A resposta da IA incluiu perspectivas de diferentes grupos (evitou omissões)?",
    "O contexto histórico ou social do exemplo foi preservado de forma justa?",
    "A linguagem sugerida pela IA é respeitosa e inclusiva?"
  ];

  const toggleCheck = (index: number) => {
    if (checked.includes(index)) {
      setChecked(checked.filter((i) => i !== index));
    } else {
      setChecked([...checked, index]);
    }
  };

  return (
    <div className="bg-paper-2 p-6 mt-8 border border-rule rounded-sm shadow-sm">
      <h3 className="font-serif text-xl text-ink mb-4">
        Ferramenta de Bolso: Checklist de Revisão
      </h3>
      <p className="text-sm text-ink-soft mb-5">
        Use os critérios abaixo ao analisar a resposta da IA no seu dia a dia:
      </p>
      <ul className="flex flex-col gap-3">
        {criterios.map((criterio, idx) => (
          <li
            key={idx}
            className="flex items-start gap-3 cursor-pointer group"
            onClick={() => toggleCheck(idx)}
          >
            <button
              className={`mt-0.5 w-5 h-5 flex items-center justify-center border transition-colors ${
                checked.includes(idx)
                  ? "bg-ok border-ok text-white"
                  : "border-ink-soft bg-paper group-hover:border-ink"
              }`}
            >
              {checked.includes(idx) && (
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <span
              className={`text-[0.95rem] transition-colors ${
                checked.includes(idx) ? "text-ink-soft line-through decoration-rule" : "text-ink"
              }`}
            >
              {criterio}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}