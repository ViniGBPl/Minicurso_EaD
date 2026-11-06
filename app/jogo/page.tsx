"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/* ============================================================
   JOGO "CAÇA AO VIÉS" — mídia complementar (Item 2 da 2ª VA)
   Estilo trilha de lições: corações, XP, sequência de acertos,
   chat com IAs, arrastar e soltar e montar equipes.
   As IAs do jogo (Bit, Luma e Nino) são personagens fictícios;
   as falas são inspiradas nas conversas reais com ChatGPT,
   Gemini e DeepSeek usadas no minicurso.
   ============================================================ */

type Tipo = "estereotipo" | "omissao" | "representacao";
type TipoOuOk = Tipo | "ok";

const TIPOS: Record<TipoOuOk, { nome: string; cor: string; emoji: string }> = {
  estereotipo: { nome: "Estereótipo", cor: "#F26B4F", emoji: "🏷️" },
  omissao: { nome: "Omissão", cor: "#6EC1F5", emoji: "🕳️" },
  representacao: { nome: "Representação", cor: "#C79BF2", emoji: "🎭" },
  ok: { nome: "Tá ok", cor: "#7AD9A9", emoji: "✅" },
};

type CharId = "voce" | "bit" | "luma" | "nino" | "lupa";
const CHARS: Record<CharId, { nome: string; emoji: string; cor: string }> = {
  voce: { nome: "Você", emoji: "🧑‍🏫", cor: "#F6C945" },
  bit: { nome: "Bit", emoji: "🤖", cor: "#6EC1F5" },
  luma: { nome: "Luma", emoji: "✨", cor: "#C79BF2" },
  nino: { nome: "Nino", emoji: "🧠", cor: "#7AD9A9" },
  lupa: { nome: "Profa. Lupa", emoji: "🔍", cor: "#F6C945" },
};

/* ------------------------------ DADOS ------------------------------ */

type Parte = { t: string; vies?: { tipo: Tipo; nota: string } };
type Msg = { who: CharId; partes: Parte[] };

type Step =
  | { kind: "chat"; titulo: string; msgs: Msg[] }
  | {
      kind: "classificar";
      titulo: string;
      itens: { t: string; tipo: TipoOuOk; nota: string }[];
      baldes: TipoOuOk[];
    }
  | {
      kind: "equipe";
      titulo: string;
      pool: { nome: string; emoji: string; pais: string; continente: string; mulher: boolean; brasil: boolean; area: string }[];
    }
  | {
      kind: "consertar";
      titulo: string;
      frase: (string | number)[];
      slots: { certo: string; errado: string; nota: string }[];
    };

type Licao = { nome: string; emoji: string; resumo: string; steps: Step[] };

const LICOES: Licao[] = [
  {
    nome: "Sala dos Cientistas",
    emoji: "🔬",
    resumo: "Quem aparece quando a IA lista 'cientistas famosos'?",
    steps: [
      {
        kind: "chat",
        titulo: "Toque nas falas com viés",
        msgs: [
          { who: "voce", partes: [{ t: "Me dão 5 cientistas famosos pra minha aula de ciências? 🙏" }] },
          {
            who: "bit",
            partes: [
              { t: "Claro! " },
              {
                t: "Galileu, Newton, Darwin, Einstein",
                vies: {
                  tipo: "omissao",
                  nota: "Quatro homens europeus. Ninguém da América Latina, da África ou da Ásia. Foi exatamente a lista do ChatGPT e do DeepSeek no nosso teste.",
                },
              },
              { t: " e Marie Curie. 🧪 " },
              { t: "Peça pros alunos descobrirem a pergunta que cada um tentou responder!" },
            ],
          },
          {
            who: "nino",
            partes: [
              { t: "Pensei em incluir o brasileiro Vital Brazil… " },
              {
                t: "mas fiquei com os clássicos, que são mais famosos. 😅",
                vies: {
                  tipo: "omissao",
                  nota: "A IA puxa para o mais comum na internet. No raciocínio do DeepSeek dava pra ver isso: ele pensou em Vital Brazil e Rosalind Franklin e desistiu.",
                },
              },
            ],
          },
          {
            who: "luma",
            partes: [
              {
                t: "Marie Curie, Carl Sagan, Darwin, Einstein e Hipátia de Alexandria!",
                vies: {
                  tipo: "omissao",
                  nota: "Melhorou no gênero (duas mulheres), mas todos são da Europa, dos EUA ou do Mediterrâneo antigo. Foi a resposta do Gemini.",
                },
              },
              { t: " 🌟" },
            ],
          },
        ],
      },
      {
        kind: "equipe",
        titulo: "Monte uma lista de 5 cientistas mais diversa",
        pool: [
          { nome: "Albert Einstein", emoji: "🧑‍🔬", pais: "🇩🇪 Alemanha", continente: "Europa", mulher: false, brasil: false, area: "Física" },
          { nome: "Isaac Newton", emoji: "🍎", pais: "🇬🇧 Inglaterra", continente: "Europa", mulher: false, brasil: false, area: "Física" },
          { nome: "Charles Darwin", emoji: "🐢", pais: "🇬🇧 Inglaterra", continente: "Europa", mulher: false, brasil: false, area: "Biologia" },
          { nome: "Marie Curie", emoji: "⚛️", pais: "🇵🇱 Polônia", continente: "Europa", mulher: true, brasil: false, area: "Química" },
          { nome: "Katherine Johnson", emoji: "🚀", pais: "🇺🇸 EUA", continente: "América", mulher: true, brasil: false, area: "Matemática" },
          { nome: "César Lattes", emoji: "🔭", pais: "🇧🇷 Brasil", continente: "América", mulher: false, brasil: true, area: "Física" },
          { nome: "Bertha Lutz", emoji: "🐸", pais: "🇧🇷 Brasil", continente: "América", mulher: true, brasil: true, area: "Zoologia" },
          { nome: "Tu Youyou", emoji: "🌿", pais: "🇨🇳 China", continente: "Ásia", mulher: true, brasil: false, area: "Farmacologia" },
          { nome: "Alhazen", emoji: "👁️", pais: "🇮🇶 atual Iraque", continente: "Ásia", mulher: false, brasil: false, area: "Óptica" },
          { nome: "Wangari Maathai", emoji: "🌳", pais: "🇰🇪 Quênia", continente: "África", mulher: true, brasil: false, area: "Ciências ambientais" },
        ],
      },
    ],
  },
  {
    nome: "Profissão: Sucesso",
    emoji: "💼",
    resumo: "Qual é o 'rosto' do sucesso para a IA?",
    steps: [
      {
        kind: "chat",
        titulo: "Toque nas falas com viés",
        msgs: [
          { who: "voce", partes: [{ t: "Escrevam um exemplo de profissional de sucesso pra motivar meus alunos de EaD 💪" }] },
          {
            who: "bit",
            partes: [
              {
                t: "Steve Jobs, cofundador da Apple!",
                vies: {
                  tipo: "estereotipo",
                  nota: "Sucesso = bilionário americano da tecnologia, que nem estudou a distância. Foi a resposta real do ChatGPT.",
                },
              },
              { t: " Ele também enfrentou fracassos. 🍏" },
            ],
          },
          {
            who: "luma",
            partes: [
              { t: "O Lucas estudou EaD " },
              {
                t: "abrindo mão de todo fim de semana, com disciplina férrea,",
                vies: {
                  tipo: "estereotipo",
                  nota: "Tudo vira mérito individual, sem falar de tempo, dinheiro ou rede de apoio. Quem trabalha e estuda pode se sentir culpado.",
                },
              },
              { t: " e virou dev numa multinacional. 🚀" },
            ],
          },
          {
            who: "nino",
            partes: [{ t: "A Juliana era recepcionista, mãe de dois filhos, estudava à noite e virou coordenadora. 🌱" }],
          },
        ],
      },
      {
        kind: "consertar",
        titulo: "Arraste as peças para montar um exemplo mais realista",
        frase: ["Um bom exemplo é ", 0, ", que ", 1, " e hoje ", 2, "."],
        slots: [
          { certo: "a Juliana, recepcionista e mãe", errado: "Steve Jobs, bilionário da Apple", nota: "Um exemplo próximo da realidade de quem faz EaD inspira mais do que um bilionário." },
          { certo: "estudava à noite depois do trabalho", errado: "nasceu com talento de gênio", nota: "'Talento de gênio' faz o aluno achar que sucesso não é pra ele." },
          { certo: "coordena a equipe onde começou", errado: "é dono de uma multinacional", nota: "Sucesso não é só cargo alto ou dinheiro. Crescer de onde se está também conta." },
        ],
      },
    ],
  },
  {
    nome: "Problema do Mercado",
    emoji: "🛒",
    resumo: "Separe o que tem viés do que está ok.",
    steps: [
      {
        kind: "classificar",
        titulo: "Arraste cada trecho para a caixa certa",
        baldes: ["estereotipo", "omissao", "representacao", "ok"],
        itens: [
          { t: "A mãe foi ao mercado e o pai levou o carro à oficina.", tipo: "estereotipo", nota: "Papel doméstico sempre com a mulher e carro com o homem: o estereótipo de gênero mais comum em exercícios." },
          { t: "Ana e Beatriz dividiram a conta da pizza igualmente.", tipo: "ok", nota: "Situação do dia a dia sem papel estereotipado. Foi o tipo de problema que as IAs reais deram!" },
          { t: "Meninas são mais caprichosas, então a Júlia fez o cartaz.", tipo: "estereotipo", nota: "Generaliza um comportamento para todas as meninas." },
          { t: "Uma lista de inventores só com nomes dos EUA e da Europa.", tipo: "omissao", nota: "Faltam inventores de outros continentes, inclusive brasileiros." },
          { t: "Um desenho de indígena caricato, de cocar e 'tanga'.", tipo: "representacao", nota: "Imagem genérica e caricata, que não representa povos reais." },
          { t: "O enfermeiro Carlos e a engenheira Júlia mediram a sala.", tipo: "ok", nota: "Até quebra estereótipos de profissão! 👏" },
        ],
      },
    ],
  },
  {
    nome: "Aula de História",
    emoji: "🌎",
    resumo: "Como a IA fala dos povos indígenas?",
    steps: [
      {
        kind: "chat",
        titulo: "Toque nas falas com viés",
        msgs: [
          { who: "voce", partes: [{ t: "Preciso de um texto curto sobre os povos indígenas do Brasil 📚" }] },
          {
            who: "bit",
            partes: [
              {
                t: "Os índios viviam nas florestas caçando e pescando.",
                vies: {
                  tipo: "representacao",
                  nota: "Junta mais de 300 povos num rótulo só e fala deles só no passado, como se não existissem hoje.",
                },
              },
              { t: " 🌳" },
            ],
          },
          {
            who: "luma",
            partes: [
              { t: "Em 1500, " },
              {
                t: "os portugueses descobriram o Brasil",
                vies: {
                  tipo: "omissao",
                  nota: "'Descobrir' apaga quem já vivia aqui. A história fica contada só do lado do colonizador.",
                },
              },
              { t: " e trouxeram muitas mudanças. ⛵" },
            ],
          },
          {
            who: "nino",
            partes: [{ t: "Hoje existem mais de 300 povos indígenas no Brasil, com línguas e direitos próprios. ✊" }],
          },
        ],
      },
      {
        kind: "consertar",
        titulo: "Arraste as peças para reescrever o texto",
        frase: ["Antes de 1500, ", 0, " já viviam aqui. Em 1500, os portugueses ", 1, ". Hoje, os povos indígenas são ", 2, "."],
        slots: [
          { certo: "milhões de pessoas de centenas de povos", errado: "os índios", nota: "Mostra a diversidade em vez de um rótulo único." },
          { certo: "chegaram ao território", errado: "descobriram o Brasil", nota: "Não dá pra 'descobrir' uma terra onde milhões de pessoas já viviam." },
          { certo: "mais de 300 povos, com línguas e lutas atuais", errado: "parte do folclore, como o Saci", nota: "Povos vivos não são lenda. São cidadãos com direitos." },
        ],
      },
    ],
  },
  {
    nome: "Chefão: Computação",
    emoji: "💻",
    resumo: "As três IAs contam a história da computação.",
    steps: [
      {
        kind: "chat",
        titulo: "Toque nas falas com viés",
        msgs: [
          { who: "voce", partes: [{ t: "Contem a história da computação pra uma aula introdutória 🖥️" }] },
          {
            who: "luma",
            partes: [
              { t: "Na Segunda Guerra surgiu o ENIAC, " },
              {
                t: "um computador gigante criado por engenheiros.",
                vies: {
                  tipo: "omissao",
                  nota: "Seis mulheres programaram o ENIAC (Kay McNulty, Betty Jennings, Betty Snyder, Marlyn Wescoff, Fran Bilas e Ruth Lichterman) e ficaram décadas fora da história.",
                },
              },
            ],
          },
          {
            who: "bit",
            partes: [
              {
                t: "Os grandes nomes são Turing, von Neumann, Gates e Jobs.",
                vies: {
                  tipo: "omissao",
                  nota: "Só homens dos EUA e da Europa. Faltam Ada Lovelace, Grace Hopper, Al-Khwarizmi…",
                },
              },
              { t: " 👨‍💻" },
            ],
          },
          {
            who: "nino",
            partes: [{ t: "E não esqueçam do Al-Khwarizmi: o nome dele deu origem à palavra 'algoritmo'! 📜" }],
          },
        ],
      },
      {
        kind: "classificar",
        titulo: "Última rodada: arraste para a caixa certa",
        baldes: ["estereotipo", "omissao", "ok"],
        itens: [
          { t: "Programar é coisa de menino que gosta de videogame.", tipo: "estereotipo", nota: "Afasta meninas e quem não joga. Programação é pra todo mundo." },
          { t: "Ada Lovelace escreveu o primeiro programa da história.", tipo: "ok", nota: "Fato histórico que reconhece uma mulher pioneira. 👏" },
          { t: "A computação foi inventada nos EUA.", tipo: "omissao", nota: "Apaga contribuições da Europa, do mundo árabe, da Ásia…" },
          { t: "Grace Hopper criou um dos primeiros compiladores.", tipo: "ok", nota: "Correto! Ela também popularizou o termo 'bug'. 🐛" },
        ],
      },
    ],
  },
];

const CORACOES = 3;
const XP_PASSO = 15;

/* ----------------------------- COMPONENTES ----------------------------- */

type Sheet = { ok: boolean; titulo: string; texto: string } | null;

function Avatar({ id, size = 40 }: { id: CharId; size?: number }) {
  const c = CHARS[id];
  return (
    <span className="cv-av" style={{ background: c.cor, width: size, height: size, fontSize: size * 0.55 }} aria-hidden>
      {c.emoji}
    </span>
  );
}

function Coach({ texto, humor = "🔍" }: { texto: string; humor?: string }) {
  return (
    <div className="cv-coach">
      <span className="cv-av cv-av-lupa" aria-hidden>{humor}</span>
      <p className="cv-coach-bubble">{texto}</p>
    </div>
  );
}

/* ------- passo: chat ------- */
function ChatStep({
  step,
  onAcerto,
  onErro,
  onFim,
}: {
  step: Extract<Step, { kind: "chat" }>;
  onAcerto: () => void;
  onErro: () => void;
  onFim: () => void;
}) {
  const [vis, setVis] = useState(1);
  const [achados, setAchados] = useState<string[]>([]);
  const [errados, setErrados] = useState<string[]>([]);
  const [nota, setNota] = useState<{ tipo: TipoOuOk; texto: string } | null>(null);
  const terminou = useRef(false);

  const alvos = useMemo(
    () => step.msgs.flatMap((m, i) => m.partes.map((p, j) => (p.vies ? `${i}-${j}` : "")).filter(Boolean)),
    [step]
  );

  useEffect(() => {
    if (vis < step.msgs.length) {
      const t = setTimeout(() => setVis((v) => v + 1), 1100);
      return () => clearTimeout(t);
    }
  }, [vis, step.msgs.length]);

  useEffect(() => {
    if (!terminou.current && alvos.length && alvos.every((a) => achados.includes(a))) {
      terminou.current = true;
      setTimeout(onFim, 700);
    }
  }, [achados, alvos, onFim]);

  const tocar = (i: number, j: number) => {
    const id = `${i}-${j}`;
    const p = step.msgs[i].partes[j];
    if (step.msgs[i].who === "voce") return;
    if (p.vies) {
      if (!achados.includes(id)) {
        setAchados((a) => [...a, id]);
        onAcerto();
      }
      setNota({ tipo: p.vies.tipo, texto: p.vies.nota });
    } else if (!errados.includes(id)) {
      setErrados((e) => [...e, id]);
      onErro();
      setNota({ tipo: "ok", texto: "Esse trecho está ok! Procure frases que generalizam, deixam alguém de fora ou distorcem um grupo." });
    }
  };

  return (
    <div>
      <div className="cv-chat">
        {step.msgs.slice(0, vis).map((m, i) => {
          const c = CHARS[m.who];
          const eu = m.who === "voce";
          return (
            <div key={i} className={`cv-msg ${eu ? "eu" : ""}`}>
              {!eu && <Avatar id={m.who} />}
              <div className="cv-bubble" style={!eu ? { borderColor: c.cor } : undefined}>
                {!eu && <span className="cv-name" style={{ color: c.cor }}>{c.nome}</span>}
                <p>
                  {m.partes.map((p, j) => {
                    const id = `${i}-${j}`;
                    const found = achados.includes(id);
                    const wrong = errados.includes(id);
                    if (eu) return <span key={j}>{p.t}</span>;
                    return (
                      <button
                        key={j}
                        type="button"
                        className={`cv-seg ${found ? "found" : ""} ${wrong ? "wrong" : ""}`}
                        style={found && p.vies ? { background: TIPOS[p.vies.tipo].cor + "40", borderColor: TIPOS[p.vies.tipo].cor } : undefined}
                        onClick={() => tocar(i, j)}
                      >
                        {p.t}
                      </button>
                    );
                  })}
                </p>
              </div>
              {eu && <Avatar id="voce" />}
            </div>
          );
        })}
        {vis < step.msgs.length && (
          <div className="cv-msg">
            <Avatar id={step.msgs[vis].who} />
            <div className="cv-bubble cv-typing" aria-label="digitando">
              <span /><span /><span />
            </div>
          </div>
        )}
      </div>
      <p className="cv-count">
        🎯 Vieses encontrados: <strong>{achados.length}/{alvos.length}</strong>
      </p>
      <div aria-live="polite">
        {nota ? (
          <Coach
            humor={nota.tipo === "ok" ? "🤔" : TIPOS[nota.tipo].emoji}
            texto={(nota.tipo === "ok" ? "" : `${TIPOS[nota.tipo].nome}! `) + nota.texto}
          />
        ) : (
          <Coach texto="Leia o que as IAs responderam e toque no trecho que te incomodar." />
        )}
      </div>
    </div>
  );
}

/* ------- passo: classificar (arrastar) ------- */
function ClassificarStep({
  step,
  onAcerto,
  onErro,
  onFim,
}: {
  step: Extract<Step, { kind: "classificar" }>;
  onAcerto: () => void;
  onErro: () => void;
  onFim: () => void;
}) {
  const [colocados, setColocados] = useState<Record<number, TipoOuOk>>({});
  const [sel, setSel] = useState<number | null>(null);
  const [sacode, setSacode] = useState<number | null>(null);
  const [hover, setHover] = useState<TipoOuOk | null>(null);
  const [nota, setNota] = useState<{ tipo: TipoOuOk; texto: string; ok: boolean } | null>(null);

  const soltar = (idx: number, balde: TipoOuOk) => {
    const item = step.itens[idx];
    setSel(null);
    if (item.tipo === balde) {
      const novo = { ...colocados, [idx]: balde };
      setColocados(novo);
      onAcerto();
      setNota({ tipo: balde, texto: item.nota, ok: true });
      if (Object.keys(novo).length === step.itens.length) setTimeout(onFim, 700);
    } else {
      onErro();
      setSacode(idx);
      setTimeout(() => setSacode(null), 400);
      setNota({ tipo: item.tipo, texto: `Não é ${TIPOS[balde].nome.toLowerCase()}. Tente outra caixa!`, ok: false });
    }
  };

  const soltos = step.itens.map((_, i) => i).filter((i) => !(i in colocados));

  return (
    <div>
      <p className="cv-small cv-dim">Arraste com o mouse ou toque no trecho e depois na caixa.</p>
      <div className="cv-chips">
        {soltos.map((i) => (
          <button
            key={i}
            type="button"
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", String(i));
              setSel(i);
            }}
            onClick={() => setSel(sel === i ? null : i)}
            className={`cv-chip ${sel === i ? "sel" : ""} ${sacode === i ? "shake" : ""}`}
            aria-pressed={sel === i}
          >
            {step.itens[i].t}
          </button>
        ))}
        {soltos.length === 0 && <p className="cv-dim">Tudo separado! 🎉</p>}
      </div>
      <div className="cv-bins" style={{ gridTemplateColumns: `repeat(${step.baldes.length}, 1fr)` }}>
        {step.baldes.map((b) => (
          <div
            key={b}
            role="button"
            tabIndex={0}
            className={`cv-bin ${hover === b ? "over" : ""} ${sel !== null ? "armed" : ""}`}
            style={{ borderColor: TIPOS[b].cor }}
            onDragOver={(e) => {
              e.preventDefault();
              setHover(b);
            }}
            onDragLeave={() => setHover(null)}
            onDrop={(e) => {
              e.preventDefault();
              setHover(null);
              const idx = Number(e.dataTransfer.getData("text/plain"));
              if (!Number.isNaN(idx)) soltar(idx, b);
            }}
            onClick={() => sel !== null && soltar(sel, b)}
            onKeyDown={(e) => {
              if ((e.key === "Enter" || e.key === " ") && sel !== null) {
                e.preventDefault();
                soltar(sel, b);
              }
            }}
          >
            <span className="cv-bin-head" style={{ background: TIPOS[b].cor }}>
              {TIPOS[b].emoji} {TIPOS[b].nome}
            </span>
            <div className="cv-bin-body">
              {Object.entries(colocados)
                .filter(([, v]) => v === b)
                .map(([k]) => (
                  <span key={k} className="cv-mini">{step.itens[Number(k)].t}</span>
                ))}
            </div>
          </div>
        ))}
      </div>
      <div aria-live="polite">
        {nota && <Coach humor={nota.ok ? "🎉" : "😬"} texto={nota.texto} />}
      </div>
    </div>
  );
}

/* ------- passo: montar equipe ------- */
function EquipeStep({
  step,
  onFim,
}: {
  step: Extract<Step, { kind: "equipe" }>;
  onFim: () => void;
}) {
  const [time, setTime] = useState<number[]>([]);
  const [hover, setHover] = useState(false);

  const add = (i: number) => {
    if (time.includes(i)) setTime(time.filter((x) => x !== i));
    else if (time.length < 5) setTime([...time, i]);
  };

  const escolhidos = time.map((i) => step.pool[i]);
  const mulheres = escolhidos.filter((p) => p.mulher).length;
  const continentes = new Set(escolhidos.map((p) => p.continente)).size;
  const brasil = escolhidos.some((p) => p.brasil);
  const metas = [
    { ok: time.length === 5, txt: `5 cientistas (${time.length}/5)` },
    { ok: mulheres >= 2, txt: `Pelo menos 2 mulheres (${mulheres})` },
    { ok: continentes >= 3, txt: `3 continentes ou mais (${continentes})` },
    { ok: brasil, txt: "Pelo menos 1 brasileiro(a)" },
  ];
  const pronto = metas.every((m) => m.ok);

  return (
    <div>
      <Coach texto="A lista das IAs era toda europeia. Monte a sua: arraste ou toque nos cards para colocar na sua lista." />
      <div
        className={`cv-team ${hover ? "over" : ""}`}
        onDragOver={(e) => {
          e.preventDefault();
          setHover(true);
        }}
        onDragLeave={() => setHover(false)}
        onDrop={(e) => {
          e.preventDefault();
          setHover(false);
          const i = Number(e.dataTransfer.getData("text/plain"));
          if (!Number.isNaN(i) && !time.includes(i)) add(i);
        }}
      >
        {[0, 1, 2, 3, 4].map((k) => {
          const i = time[k];
          const p = i !== undefined ? step.pool[i] : null;
          return (
            <button key={k} type="button" className={`cv-slot ${p ? "full" : ""}`} onClick={() => i !== undefined && add(i)} disabled={!p}>
              {p ? (
                <>
                  <span className="cv-slot-emoji">{p.emoji}</span>
                  <span className="cv-slot-name">{p.nome}</span>
                </>
              ) : (
                <span className="cv-dim">vaga {k + 1}</span>
              )}
            </button>
          );
        })}
      </div>
      <ul className="cv-goals">
        {metas.map((m) => (
          <li key={m.txt} className={m.ok ? "ok" : ""}>
            {m.ok ? "✅" : "⬜"} {m.txt}
          </li>
        ))}
      </ul>
      <div className="cv-cards">
        {step.pool.map((p, i) => (
          <button
            key={p.nome}
            type="button"
            draggable={!time.includes(i)}
            onDragStart={(e) => e.dataTransfer.setData("text/plain", String(i))}
            onClick={() => add(i)}
            className={`cv-card-sci ${time.includes(i) ? "in" : ""}`}
            aria-pressed={time.includes(i)}
          >
            <span className="cv-sci-emoji">{p.emoji}</span>
            <strong>{p.nome}</strong>
            <span className="cv-sci-meta">{p.pais}</span>
            <span className="cv-sci-meta">{p.area}</span>
          </button>
        ))}
      </div>
      <button className="cv-btn cv-btn-wide" disabled={!pronto} onClick={onFim}>
        {pronto ? "Enviar minha lista 🚀" : "Complete as metas acima"}
      </button>
    </div>
  );
}

/* ------- passo: consertar a frase (arrastar peças) ------- */
function ConsertarStep({
  step,
  onAcerto,
  onErro,
  onFim,
}: {
  step: Extract<Step, { kind: "consertar" }>;
  onAcerto: () => void;
  onErro: () => void;
  onFim: () => void;
}) {
  const pecas = useMemo(() => {
    const todas = step.slots.flatMap((s) => [s.certo, s.errado]);
    // embaralha de forma estável
    return todas
      .map((t, i) => ({ t, k: (i * 7 + 3) % todas.length }))
      .sort((a, b) => a.k - b.k)
      .map((x) => x.t);
  }, [step]);
  const [preench, setPreench] = useState<(string | null)[]>(step.slots.map(() => null));
  const [sel, setSel] = useState<string | null>(null);
  const [res, setRes] = useState<boolean[] | null>(null);
  const [notas, setNotas] = useState<string[]>([]);

  const usadas = preench.filter(Boolean) as string[];

  const colocar = (slot: number, peca: string) => {
    if (res?.[slot]) return;
    const novo = preench.map((p) => (p === peca ? null : p));
    novo[slot] = peca;
    setPreench(novo);
    setSel(null);
    setRes(null);
  };

  const tirar = (slot: number) => {
    if (res?.[slot]) return;
    const novo = [...preench];
    novo[slot] = null;
    setPreench(novo);
  };

  const verificar = () => {
    const r = step.slots.map((s, i) => preench[i] === s.certo);
    setRes(r);
    if (r.every(Boolean)) {
      onAcerto();
      setNotas(step.slots.map((s) => s.nota));
      setTimeout(onFim, 900);
    } else {
      onErro();
      setNotas(step.slots.filter((_, i) => !r[i]).map((s) => s.nota));
      setPreench(preench.map((p, i) => (r[i] ? p : null)));
    }
  };

  return (
    <div>
      <div className="cv-card-paper cv-sentence">
        {step.frase.map((f, k) =>
          typeof f === "string" ? (
            <span key={k}>{f}</span>
          ) : (
            <span
              key={k}
              role="button"
              tabIndex={0}
              className={`cv-blank ${preench[f] ? "full" : ""} ${res?.[f] ? "right" : ""} ${sel ? "armed" : ""}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                const p = e.dataTransfer.getData("text/plain");
                if (p) colocar(f, p);
              }}
              onClick={() => (sel ? colocar(f, sel) : tirar(f))}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  if (sel) colocar(f, sel);
                  else tirar(f);
                }
              }}
            >
              {preench[f] ?? "＿＿＿＿"}
            </span>
          )
        )}
      </div>
      <div className="cv-chips">
        {pecas
          .filter((p) => !usadas.includes(p))
          .map((p) => (
            <button
              key={p}
              type="button"
              draggable
              onDragStart={(e) => e.dataTransfer.setData("text/plain", p)}
              onClick={() => setSel(sel === p ? null : p)}
              className={`cv-chip ${sel === p ? "sel" : ""}`}
              aria-pressed={sel === p}
            >
              {p}
            </button>
          ))}
      </div>
      <div aria-live="polite">
        {notas.length > 0 && (
          <Coach humor={res?.every(Boolean) ? "🎉" : "😬"} texto={notas.join(" ")} />
        )}
      </div>
      <button className="cv-btn cv-btn-wide" disabled={preench.some((p) => !p)} onClick={verificar}>
        Verificar
      </button>
    </div>
  );
}

/* ------------------------------- PÁGINA ------------------------------- */

export default function JogoCacaAoVies() {
  const [tela, setTela] = useState<"inicio" | "mapa" | "licao" | "fim">("inicio");
  const [licao, setLicao] = useState(0);
  const [passo, setPasso] = useState(0);
  const [coracoes, setCoracoes] = useState(CORACOES);
  const [xp, setXp] = useState(0);
  const [combo, setCombo] = useState(0);
  const [melhorCombo, setMelhorCombo] = useState(0);
  const [feitas, setFeitas] = useState<number[]>([]);
  const [sheet, setSheet] = useState<Sheet>(null);
  const [chave, setChave] = useState(0);
  const [flash, setFlash] = useState<"" | "bom" | "ruim">("");

  const L = LICOES[licao];
  const step = L.steps[passo];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [tela, licao, passo]);

  const abrir = (i: number) => {
    setLicao(i);
    setPasso(0);
    setCoracoes(CORACOES);
    setSheet(null);
    setChave((k) => k + 1);
    setTela("licao");
  };

  const acerto = () => {
    setXp((x) => x + 10);
    const n = combo + 1;
    setCombo(n);
    setMelhorCombo((m) => Math.max(m, n));
    setFlash("bom");
    setTimeout(() => setFlash(""), 350);
  };

  const erro = () => {
    if (coracoes <= 0) return;
    setCombo(0);
    setFlash("ruim");
    setTimeout(() => setFlash(""), 350);
    const n = Math.max(0, coracoes - 1);
    setCoracoes(n);
    if (n === 0)
      setSheet({ ok: false, titulo: "Sem corações 💔", texto: "Acontece! Revisar com calma faz parte. Bora tentar essa lição de novo?" });
  };

  const fimPasso = () => {
    if (coracoes <= 0) return;
    setXp((x) => x + XP_PASSO);
    const frases = ["Mandou bem! 🎉", "Olho de águia! 🦅", "Arrasou! 🔥", "Isso aí! 💪"];
    setSheet({
      ok: true,
      titulo: frases[(licao + passo) % frases.length],
      texto: passo + 1 < L.steps.length ? "Próximo desafio desta lição liberado." : "Lição concluída! Material aprovado para a aula. ✅",
    });
  };

  const continuar = () => {
    if (!sheet) return;
    if (!sheet.ok) {
      abrir(licao);
      return;
    }
    setSheet(null);
    if (passo + 1 < L.steps.length) {
      setPasso(passo + 1);
      setChave((k) => k + 1);
    } else {
      const novas = feitas.includes(licao) ? feitas : [...feitas, licao];
      setFeitas(novas);
      setTela(novas.length === LICOES.length ? "fim" : "mapa");
    }
  };

  const progresso = ((passo + (sheet?.ok ? 1 : 0)) / L.steps.length) * 100;

  return (
    <div className={`cv ${flash}`}>
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="cv-bg" aria-hidden />

      {tela !== "inicio" && (
        <header className="cv-hud">
          <div className="cv-hud-in">
            {tela === "licao" ? (
              <button className="cv-x" onClick={() => setTela("mapa")} aria-label="Voltar ao mapa">✕</button>
            ) : (
              <a className="cv-x" href="/" aria-label="Voltar ao minicurso">←</a>
            )}
            {tela === "licao" && (
              <div className="cv-bar" aria-label={`Progresso da lição: ${Math.round(progresso)}%`}>
                <div style={{ width: `${progresso}%` }} />
              </div>
            )}
            <span className="cv-stat" title="Sequência de acertos">🔥 {combo}</span>
            <span className="cv-stat" title="Pontos de experiência">💎 {xp}</span>
            {tela === "licao" && (
              <span className="cv-stat cv-hearts" title="Corações">
                {"❤️".repeat(coracoes)}
                {"🤍".repeat(CORACOES - coracoes)}
              </span>
            )}
          </div>
        </header>
      )}

      <main className="cv-wrap">
        {tela === "inicio" && (
          <section className="cv-hero">
            <a href="/" className="cv-back">← Voltar ao minicurso</a>
            <div className="cv-cast" aria-hidden>
              <span className="cv-float" style={{ animationDelay: "0s" }}>🤖</span>
              <span className="cv-float big" style={{ animationDelay: ".3s" }}>🔍</span>
              <span className="cv-float" style={{ animationDelay: ".6s" }}>✨</span>
              <span className="cv-float" style={{ animationDelay: ".9s" }}>🧠</span>
            </div>
            <h1 className="cv-h1">
              Caça ao <span className="cv-mark">Viés</span>
            </h1>
            <p className="cv-lead">
              Três IAs muito prestativas (e nem sempre justas) vão ajudar você a
              preparar as aulas da semana. A <strong>Profa. Lupa 🔍</strong> vai
              te ensinar a pegar os vieses antes que eles cheguem na sala.
            </p>
            <div className="cv-intro-cast">
              {(["bit", "luma", "nino"] as CharId[]).map((id) => (
                <div key={id} className="cv-who">
                  <Avatar id={id} size={52} />
                  <strong>{CHARS[id].nome}</strong>
                </div>
              ))}
            </div>
            <ul className="cv-how">
              <li>💬 Toque nas falas com viés</li>
              <li>🫳 Arraste trechos e peças</li>
              <li>🧑‍🔬 Monte equipes mais diversas</li>
              <li>❤️ 3 corações por lição</li>
            </ul>
            <button className="cv-btn cv-btn-wide" onClick={() => setTela("mapa")}>
              Começar ▶
            </button>
            <p className="cv-fine">
              5 lições · cerca de 10 minutos. Bit, Luma e Nino são personagens
              fictícios; as falas são inspiradas nas conversas reais com ChatGPT,
              Gemini e DeepSeek usadas no minicurso.
            </p>
          </section>
        )}

        {tela === "mapa" && (
          <section className="cv-map">
            <h2 className="cv-h2">Sua trilha</h2>
            <Coach
              texto={
                feitas.length === 0
                  ? "Comece pela primeira lição. Cada uma libera a próxima!"
                  : `Boa! ${feitas.length} de ${LICOES.length} lições feitas. Bora pra próxima?`
              }
            />
            <ol className="cv-path">
              {LICOES.map((l, i) => {
                const feita = feitas.includes(i);
                const liberada = i === 0 || feitas.includes(i - 1);
                return (
                  <li key={l.nome} className="cv-node-wrap" style={{ marginLeft: `${[0, 90, 140, 90, 0][i]}px` }}>
                    <button
                      className={`cv-node ${feita ? "feita" : ""} ${liberada ? "" : "lock"}`}
                      disabled={!liberada}
                      onClick={() => abrir(i)}
                      aria-label={`${l.nome}${feita ? " (concluída)" : liberada ? "" : " (bloqueada)"}`}
                    >
                      <span>{liberada ? l.emoji : "🔒"}</span>
                      {feita && <span className="cv-crown">👑</span>}
                    </button>
                    <div className="cv-node-label">
                      <strong>{l.nome}</strong>
                      <span>{l.resumo}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </section>
        )}

        {tela === "licao" && (
          <section className="cv-lesson" key={chave}>
            <p className="cv-tag">
              {L.emoji} {L.nome}
            </p>
            <h2 className="cv-h2">{step.titulo}</h2>
            {step.kind === "chat" && <ChatStep step={step} onAcerto={acerto} onErro={erro} onFim={fimPasso} />}
            {step.kind === "classificar" && <ClassificarStep step={step} onAcerto={acerto} onErro={erro} onFim={fimPasso} />}
            {step.kind === "equipe" && <EquipeStep step={step} onFim={fimPasso} />}
            {step.kind === "consertar" && <ConsertarStep step={step} onAcerto={acerto} onErro={erro} onFim={fimPasso} />}
          </section>
        )}

        {tela === "fim" && (
          <section className="cv-hero">
            <div className="cv-cast" aria-hidden>
              <span className="cv-float big">🏆</span>
            </div>
            <p className="cv-tag">Semana revisada!</p>
            <h1 className="cv-h1">Revisor(a) de Viés</h1>
            <div className="cv-results">
              <div><span>💎</span><strong>{xp}</strong> XP</div>
              <div><span>🔥</span><strong>{melhorCombo}</strong> melhor sequência</div>
              <div><span>👑</span><strong>{LICOES.length}</strong> lições</div>
            </div>
            <Coach
              humor="🎓"
              texto="Lembre: na vida real ninguém marca os trechos pra você, e uma checklist não pega tudo. Compare IAs, revise com calma e converse com outras pessoas."
            />
            <div className="cv-actions">
              <button
                className="cv-btn cv-btn-ghost"
                onClick={() => {
                  setFeitas([]);
                  setXp(0);
                  setCombo(0);
                  setMelhorCombo(0);
                  setTela("mapa");
                }}
              >
                Jogar de novo
              </button>
              <a className="cv-btn" href="/#avaliacao">
                Ir para a avaliação final →
              </a>
            </div>
          </section>
        )}
      </main>

      {sheet && (
        <div className={`cv-sheet ${sheet.ok ? "ok" : "bad"}`} role="dialog" aria-live="assertive">
          <div className="cv-sheet-in">
            <div>
              <h3 className="cv-h3">{sheet.titulo}</h3>
              <p>{sheet.texto}</p>
            </div>
            <button className="cv-btn" onClick={continuar} autoFocus>
              {sheet.ok ? "Continuar" : "Tentar de novo"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------- ESTILOS ------------------------------- */

const css = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Fraunces:opsz,wght@9..144,700&family=Nunito:wght@400;600;700;800;900&display=swap');

html, body { background: #0E2B27 !important; }
.cv {
  --paper: #FBF6E8; --ink: #1E2B28; --ink-soft: #55655F;
  --chalk: #F4F1E6; --chalk-soft: #B7CBC3; --line: rgba(244,241,230,.16);
  --yellow: #F6C945; --coral: #F26B4F; --mint: #58CC8A; --mint-d: #3E9E68; --red: #EE5A4A;
  position: relative; min-height: 100vh; padding-bottom: 140px;
  font-family: 'Nunito', system-ui, sans-serif; color: var(--chalk); line-height: 1.55;
}
.cv *, .cv *::before, .cv *::after { box-sizing: border-box; }
.cv :where(h1,h2,h3,p,ul,ol) { margin: 0; }
.cv :where(ul,ol) { list-style: none; padding: 0; }
.cv :where(a) { color: inherit; text-decoration: none; }
.cv :where(button) { font: inherit; color: inherit; }
.cv-bg { position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background: radial-gradient(55rem 36rem at 15% -5%, rgba(130,210,180,.16), transparent 62%),
    radial-gradient(50rem 34rem at 105% 105%, rgba(246,201,69,.08), transparent 60%), #0E2B27; transition: background .3s; }
.cv.bom .cv-bg { box-shadow: inset 0 0 0 6px var(--mint); }
.cv.ruim .cv-bg { box-shadow: inset 0 0 0 6px var(--red); }
.cv-wrap { position: relative; z-index: 1; max-width: 760px; margin: 0 auto; padding: 24px 20px; }

/* HUD */
.cv-hud { position: sticky; top: 0; z-index: 20; background: rgba(10,33,30,.92); backdrop-filter: blur(10px); border-bottom: 1px solid var(--line); }
.cv-hud-in { max-width: 760px; margin: 0 auto; padding: 12px 20px; display: flex; align-items: center; gap: 14px; }
.cv-x { background: none; border: 0; font-size: 1.3rem; color: var(--chalk-soft); cursor: pointer; padding: 4px 8px; }
.cv-bar { flex: 1; height: 16px; background: rgba(255,255,255,.12); border-radius: 999px; overflow: hidden; }
.cv-bar div { height: 100%; background: linear-gradient(var(--mint), var(--mint-d)); border-radius: 999px; transition: width .4s; }
.cv-stat { font-weight: 900; white-space: nowrap; }
.cv-hearts { letter-spacing: 1px; }
.cv-hud-in .cv-stat:first-of-type { margin-left: auto; }
.cv-bar + .cv-stat { margin-left: 0 !important; }

/* tipografia */
.cv-h1 { font-family: 'Fraunces', Georgia, serif; font-size: clamp(2.6rem, 8vw, 4rem); line-height: 1; margin: 8px 0 14px; }
.cv-mark { color: var(--yellow); }
.cv-h2 { font-family: 'Fraunces', Georgia, serif; font-size: 1.6rem; margin: 4px 0 16px; }
.cv-h3 { font-family: 'Fraunces', Georgia, serif; font-size: 1.35rem; }
.cv-lead { font-size: 1.12rem; color: var(--chalk); }
.cv-tag { font-family: 'Caveat', cursive; font-size: 1.6rem; color: var(--yellow); }
.cv-small { font-size: .95rem; }
.cv-dim { color: var(--chalk-soft); }
.cv-fine { font-size: .85rem; color: var(--chalk-soft); margin-top: 16px; }
.cv-back { color: var(--chalk-soft); font-weight: 700; }

/* botões */
.cv-btn { display: inline-flex; justify-content: center; align-items: center; gap: 8px; border: 0; cursor: pointer;
  background: var(--mint); color: #0b2a1d; font-weight: 900; font-size: 1.05rem; padding: 14px 26px;
  border-radius: 16px; box-shadow: 0 4px 0 var(--mint-d); text-transform: uppercase; letter-spacing: .03em; transition: transform .1s; }
.cv-btn:active { transform: translateY(3px); box-shadow: 0 1px 0 var(--mint-d); }
.cv-btn:disabled { background: #3b4f4a; color: #8aa39b; box-shadow: 0 4px 0 #2a3a36; cursor: not-allowed; }
.cv-btn-wide { width: 100%; margin-top: 20px; }
.cv-btn-ghost { background: transparent; color: var(--chalk); border: 2px solid var(--line); box-shadow: 0 4px 0 rgba(0,0,0,.3); }
.cv :focus-visible { outline: 3px solid var(--yellow); outline-offset: 2px; }
.cv-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 20px; }

/* início */
.cv-hero { text-align: center; padding-top: 10px; }
.cv-hero .cv-back { display: inline-block; margin-bottom: 10px; }
.cv-cast { display: flex; justify-content: center; gap: 14px; font-size: 2.6rem; margin-top: 10px; }
.cv-float { display: inline-block; animation: cv-bob 2.4s ease-in-out infinite; }
.cv-float.big { font-size: 4rem; }
@keyframes cv-bob { 50% { transform: translateY(-10px) rotate(-4deg); } }
.cv-intro-cast { display: flex; justify-content: center; gap: 22px; margin: 22px 0; }
.cv-who { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.cv-how { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; text-align: left; }
.cv-how li { background: rgba(255,255,255,.06); border: 1px solid var(--line); border-radius: 14px; padding: 12px 14px; font-weight: 700; }

/* avatar e treinadora */
.cv-av { display: inline-flex; align-items: center; justify-content: center; border-radius: 50%; flex-shrink: 0; box-shadow: 0 3px 0 rgba(0,0,0,.3); }
.cv-av-lupa { width: 52px; height: 52px; font-size: 1.8rem; background: var(--yellow); }
.cv-coach { display: flex; align-items: flex-end; gap: 10px; margin: 16px 0; text-align: left; }
.cv-coach-bubble { position: relative; background: var(--paper); color: var(--ink); border-radius: 16px; padding: 12px 16px; font-weight: 700; border: 2px solid #E5DCC4; }
.cv-coach-bubble::before { content: ""; position: absolute; left: -9px; bottom: 14px; border: 8px solid transparent; border-right-color: var(--paper); border-left: 0; }

/* mapa */
.cv-path { display: flex; flex-direction: column; gap: 26px; margin-top: 20px; }
.cv-node-wrap { display: flex; align-items: center; gap: 16px; }
.cv-node { position: relative; width: 78px; height: 78px; border-radius: 50%; border: 0; cursor: pointer;
  background: var(--yellow); box-shadow: 0 6px 0 #B8901E; font-size: 2.2rem; flex-shrink: 0; transition: transform .1s; }
.cv-node:active { transform: translateY(4px); box-shadow: 0 2px 0 #B8901E; }
.cv-node.feita { background: var(--mint); box-shadow: 0 6px 0 var(--mint-d); }
.cv-node.lock { background: #3b4f4a; box-shadow: 0 6px 0 #2a3a36; cursor: not-allowed; }
.cv-crown { position: absolute; top: -14px; right: -6px; font-size: 1.4rem; }
.cv-node-label { display: flex; flex-direction: column; }
.cv-node-label span { color: var(--chalk-soft); font-size: .92rem; }

/* chat */
.cv-chat { display: flex; flex-direction: column; gap: 14px; }
.cv-msg { display: flex; align-items: flex-end; gap: 10px; animation: cv-pop .3s ease-out; }
.cv-msg.eu { justify-content: flex-end; }
@keyframes cv-pop { from { opacity: 0; transform: translateY(8px) scale(.97); } }
.cv-bubble { background: var(--paper); color: var(--ink); border-radius: 18px 18px 18px 4px; padding: 10px 14px; max-width: 82%; border: 2px solid transparent; }
.cv-msg.eu .cv-bubble { background: var(--yellow); border-radius: 18px 18px 4px 18px; font-weight: 700; }
.cv-name { display: block; font-weight: 900; font-size: .85rem; margin-bottom: 2px; }
.cv-bubble p { font-size: 1.08rem; line-height: 1.7; }
.cv-seg { background: none; border: 0; border-bottom: 2px dotted #B9AE92; padding: 0 2px; border-radius: 4px; cursor: pointer; text-align: left; display: inline; }
.cv-seg:hover { background: #F6C94540; }
.cv-seg.found { border: 2px solid; font-weight: 800; }
.cv-seg.wrong { text-decoration: line-through; text-decoration-color: #B9AE92; animation: cv-shake .3s; }
.cv-typing { display: flex; gap: 5px; padding: 14px 16px; }
.cv-typing span { width: 8px; height: 8px; border-radius: 50%; background: #9AA59F; animation: cv-dot 1s infinite; }
.cv-typing span:nth-child(2) { animation-delay: .15s; }
.cv-typing span:nth-child(3) { animation-delay: .3s; }
@keyframes cv-dot { 50% { transform: translateY(-4px); opacity: .5; } }
@keyframes cv-shake { 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
.cv-count { margin-top: 14px; font-weight: 800; }

/* chips e caixas */
.cv-chips { display: flex; flex-wrap: wrap; gap: 10px; margin: 14px 0; }
.cv-chip { background: var(--paper); color: var(--ink); border: 2px solid #E5DCC4; border-radius: 14px; padding: 10px 14px;
  font-weight: 700; cursor: grab; box-shadow: 0 4px 0 #D4C9AC; text-align: left; transition: transform .1s; }
.cv-chip:active { cursor: grabbing; }
.cv-chip.sel { border-color: var(--yellow); background: #FFF4CC; transform: translateY(-2px); }
.cv-chip.shake { animation: cv-shake .3s; border-color: var(--red); }
.cv-bins { display: grid; gap: 10px; margin-top: 10px; }
.cv-bin { border: 3px dashed; border-radius: 16px; min-height: 120px; background: rgba(255,255,255,.04); overflow: hidden; transition: transform .15s, background .15s; cursor: default; }
.cv-bin.armed { cursor: pointer; }
.cv-bin.over, .cv-bin.armed:hover { background: rgba(255,255,255,.12); transform: scale(1.02); }
.cv-bin-head { display: block; color: #1E2B28; font-weight: 900; font-size: .85rem; padding: 6px 8px; text-align: center; }
.cv-bin-body { padding: 8px; display: flex; flex-direction: column; gap: 6px; }
.cv-mini { background: var(--paper); color: var(--ink); font-size: .78rem; border-radius: 8px; padding: 4px 6px; animation: cv-pop .25s; }

/* equipe */
.cv-team { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; padding: 10px; border-radius: 18px; border: 3px dashed var(--line); transition: background .15s; }
.cv-team.over { background: rgba(255,255,255,.08); }
.cv-slot { min-height: 86px; border-radius: 14px; border: 2px solid var(--line); background: rgba(255,255,255,.04); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 2px; padding: 6px; cursor: default; }
.cv-slot.full { background: var(--paper); color: var(--ink); cursor: pointer; animation: cv-pop .25s; }
.cv-slot-emoji { font-size: 1.6rem; }
.cv-slot-name { font-size: .75rem; font-weight: 800; text-align: center; line-height: 1.2; }
.cv-goals { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; margin: 14px 0; font-weight: 700; font-size: .95rem; }
.cv-goals li.ok { color: var(--mint); }
.cv-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(132px, 1fr)); gap: 10px; }
.cv-card-sci { background: var(--paper); color: var(--ink); border: 2px solid #E5DCC4; border-radius: 16px; padding: 12px 8px;
  display: flex; flex-direction: column; align-items: center; gap: 2px; cursor: grab; box-shadow: 0 4px 0 #D4C9AC; transition: transform .1s, opacity .2s; }
.cv-card-sci:hover { transform: translateY(-2px); }
.cv-card-sci.in { opacity: .35; border-color: var(--mint); }
.cv-sci-emoji { font-size: 1.8rem; }
.cv-card-sci strong { font-size: .9rem; text-align: center; line-height: 1.2; }
.cv-sci-meta { font-size: .78rem; color: var(--ink-soft); }

/* consertar */
.cv-card-paper { background: var(--paper); color: var(--ink); border-radius: 18px; padding: 20px; }
.cv-sentence { font-size: 1.15rem; line-height: 2.4; font-weight: 700; }
.cv-blank { display: inline-block; min-width: 120px; padding: 0 10px; margin: 0 2px; border-bottom: 3px solid #B9AE92; border-radius: 8px; color: #9AA59F; cursor: pointer; text-align: center; line-height: 1.6; }
.cv-blank.armed { background: #FFF4CC; }
.cv-blank.full { background: #EFE7D2; color: var(--ink); border-bottom-color: var(--yellow); }
.cv-blank.right { background: #DDF5E6; border-bottom-color: var(--mint); }

/* resultados */
.cv-results { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin: 20px 0; }
.cv-results div { background: rgba(255,255,255,.06); border: 2px solid var(--line); border-radius: 16px; padding: 14px; display: flex; flex-direction: column; align-items: center; font-size: .9rem; }
.cv-results span { font-size: 1.8rem; }
.cv-results strong { font-size: 1.6rem; }
.cv-hero .cv-actions { justify-content: center; }

/* bandeja inferior */
.cv-sheet { position: fixed; left: 0; right: 0; bottom: 0; z-index: 30; animation: cv-up .25s ease-out; }
.cv-sheet.ok { background: #D7FFB8; color: #2B6A1F; }
.cv-sheet.bad { background: #FFDFE0; color: #9B2C2C; }
.cv-sheet-in { max-width: 760px; margin: 0 auto; padding: 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap; }
.cv-sheet.bad .cv-btn { background: var(--red); color: #fff; box-shadow: 0 4px 0 #B83A2E; }
@keyframes cv-up { from { transform: translateY(100%); } }

@media (max-width: 600px) {
  .cv-how, .cv-goals { grid-template-columns: 1fr; }
  .cv-team { grid-template-columns: repeat(3, 1fr); }
  .cv-bins { grid-template-columns: 1fr 1fr !important; }
  .cv-node-wrap { margin-left: 0 !important; }
  .cv-hud-in { gap: 8px; font-size: .9rem; }
}
@media (prefers-reduced-motion: reduce) { .cv *, .cv *::before { animation: none !important; transition: none !important; } }
`;
