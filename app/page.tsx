"use client";

import { useEffect, useState } from "react";

/* ============================================================
   TUDO NESTE ARQUIVO: estilos, componentes e conteúdo.
   Não depende do tailwind.config nem do layout.
   Para mudar as cores, edite as variáveis no começo do CSS (final do arquivo).
   Tema: quadro-negro verde + fichas de papel + lápis amarelo.
   ============================================================ */

// TODO: cole aqui o link da pasta do Dropbox quando estiver pronta
const LINK_DROPBOX = "#";

const navegacao = [
  { id: "como-estudar", rotulo: "Como estudar" },
  { id: "objetivos", rotulo: "Objetivos" },
  { id: "conceitos", rotulo: "Conceitos" },
  { id: "video", rotulo: "Vídeo" },
  { id: "pratica", rotulo: "Prática" },
  { id: "avaliacao", rotulo: "Avaliação" },
  { id: "materiais", rotulo: "Materiais" },
  { id: "referencias", rotulo: "Referências" },
];

const passos = [
  { titulo: "Leia os objetivos", detalhe: "Cerca de 2 min", href: "#objetivos" },
  { titulo: "Assista ao vídeo", detalhe: "20 a 30 min", href: "#video" },
  { titulo: "Teste você mesmo", detalhe: "Cerca de 10 min", href: "#pratica" },
  { titulo: "Faça a avaliação", detalhe: "Cerca de 10 min", href: "#avaliacao" },
];

const objetivos = [
  "Identificar estereótipos, omissões e representações inadequadas em exemplos gerados por IA.",
  "Comparar respostas de diferentes IAs para um mesmo prompt educacional e apontar diferenças de viés entre elas.",
  "Aplicar critérios explícitos — uma checklist de revisão — antes de levar um material para a sala de aula.",
  "Reconhecer os limites da própria análise: o que uma checklist não é capaz de capturar.",
];

const conceitos = [
  {
    nome: "Estereótipo",
    texto:
      "Generalização simplificada sobre um grupo, tratada como se fosse regra. Exemplo: associar uma profissão sempre ao mesmo gênero.",
  },
  {
    nome: "Omissão",
    texto:
      "Ausência de grupos, contextos ou perspectivas que deveriam aparecer. Exemplo: uma lista de cientistas em que só aparecem pessoas de um mesmo país.",
  },
  {
    nome: "Representação inadequada",
    texto:
      "Pessoa ou grupo retratado de forma distorcida, caricata ou desrespeitosa, mesmo sem intenção explícita.",
  },
];

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

const criterios = [
  "Os personagens fogem de estereótipos comuns de gênero, raça ou classe?",
  "A resposta da IA incluiu perspectivas de diferentes grupos (evitou omissões)?",
  "O contexto histórico ou social do exemplo foi preservado de forma justa?",
  "A linguagem sugerida pela IA é respeitosa e inclusiva?",
];

// Ajuste os títulos/descrições conforme os arquivos que subir no Dropbox
const materiais = [
  {
    titulo: "Slides do minicurso",
    descricao: "Os slides usados no vídeo, para revisar no seu ritmo.",
    tipo: "PDF",
  },
  {
    titulo: "Checklist de revisão",
    descricao: "A checklist em versão para imprimir e usar com seus materiais.",
    tipo: "PDF",
  },
  {
    titulo: "Prompts para testar",
    descricao: "Os prompts da atividade prática, prontos para copiar.",
    tipo: "PDF",
  },
];

/* ---------------------------- COMPONENTES ---------------------------- */

function Secao({
  id,
  numero,
  titulo,
  intro,
  children,
}: {
  id: string;
  numero: string;
  titulo: string;
  intro?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="ia-sec">
      <div className="ia-wrap">
        <p className="ia-eyebrow">Etapa {numero}</p>
        <h2 className="ia-h2">{titulo}</h2>
        {intro && <p className="ia-intro">{intro}</p>}
        <div className="ia-body">{children}</div>
      </div>
    </section>
  );
}

function Proximo({ href, rotulo }: { href: string; rotulo: string }) {
  return (
    <div className="ia-next">
      <a href={href}>
        {rotulo} <span aria-hidden>↓</span>
      </a>
    </div>
  );
}

function TesteVoceMesmo() {
  const [copiado, setCopiado] = useState<number | null>(null);

  const copiar = async (texto: string, idx: number) => {
    try {
      await navigator.clipboard.writeText(texto);
      setCopiado(idx);
      setTimeout(() => setCopiado(null), 2000);
    } catch {
      // sem permissão de área de transferência: ignora
    }
  };

  return (
    <div className="ia-stack">
      {prompts.map((p, idx) => (
        <div key={idx} className="ia-card">
          <p className="ia-mono">Prompt {idx + 1}</p>
          <h3 className="ia-h3">{p.titulo}</h3>
          <p className="ia-quote">{p.texto}</p>
          <div className="ia-row">
            <button
              onClick={() => copiar(p.texto, idx)}
              className="ia-btn ia-btn-sm"
            >
              {copiado === idx ? "Copiado ✓" : "Copiar prompt"}
            </button>
            <div className="ia-links">
              <span>Abrir em:</span>
              {ias.map((ia) => (
                <a
                  key={ia.nome}
                  href={ia.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {ia.nome}
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}
      <p className="ia-note">
        As respostas variam de uma tentativa para outra e mudam com as
        atualizações de cada IA. Isso também é um limite da análise: o que você
        observa vale para aquele momento, não é uma conclusão definitiva.
      </p>
    </div>
  );
}

function Checklist() {
  const [marcados, setMarcados] = useState<number[]>([]);

  const alternar = (i: number) =>
    setMarcados((m) => (m.includes(i) ? m.filter((x) => x !== i) : [...m, i]));

  const pct = (marcados.length / criterios.length) * 100;

  return (
    <div className="ia-card ia-check">
      <div className="ia-row ia-between">
        <h3 className="ia-h3">Checklist de revisão</h3>
        <span className="ia-mono">
          {marcados.length} de {criterios.length}
        </span>
      </div>
      <p className="ia-small">
        Use os critérios abaixo ao analisar a resposta da IA no seu dia a dia:
      </p>
      <div className="ia-bar" aria-hidden>
        <div style={{ width: `${pct}%` }} />
      </div>
      <ul className="ia-stack ia-tight">
        {criterios.map((c, i) => {
          const on = marcados.includes(i);
          return (
            <li key={i}>
              <button
                type="button"
                role="checkbox"
                aria-checked={on}
                onClick={() => alternar(i)}
                className={`ia-item ${on ? "on" : ""}`}
              >
                <span className="ia-box">
                  {on && (
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={3}
                      width="14"
                      height="14"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </span>
                <span>{c}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ------------------------------- PÁGINA ------------------------------- */

export default function Home() {
  const [ativo, setAtivo] = useState("");
  const [progresso, setProgresso] = useState(0);

  // barra de progresso de leitura
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      setProgresso(total > 0 ? (h.scrollTop / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // destaca no menu a seção em que a pessoa está
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setAtivo(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    navegacao.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="ia">
      <style>{css}</style>

      <div className="ia-bg" aria-hidden />
      <div className="ia-progress" aria-hidden>
        <div style={{ width: `${progresso}%` }} />
      </div>

      <div className="ia-content">
        <a href="#conteudo" className="ia-skip">
          Pular para o conteúdo
        </a>

        {/* MENU FIXO */}
        <nav className="ia-nav" aria-label="Navegação do minicurso">
          <div className="ia-wrap ia-nav-in">
            <a href="#topo" className="ia-brand">
              <span className="ia-dot" aria-hidden />
              Vieses em IA
            </a>
            <ul className="ia-nav-links">
              {navegacao.map((n) => (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    className={ativo === n.id ? "active" : ""}
                  >
                    {n.rotulo}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        {/* HERO */}
        <header id="topo" className="ia-hero">
          <div className="ia-wrap ia-hero-grid">
            <div>
              <p className="ia-tag">
                Minicurso EaD · Docência Digital na Era da IA
              </p>
              <h1 className="ia-h1">
                Análise crítica de vieses em conteúdos educacionais gerados por{" "}
                <span className="ia-mark">IA</span>
              </h1>
              <p className="ia-lead">
                Um minicurso prático para reconhecer estereótipos, omissões e
                representações inadequadas em materiais didáticos produzidos com
                inteligência artificial — e para revisá-los com critérios
                explícitos, sem perder de vista os limites dessa análise.
              </p>

              <div className="ia-row ia-cta">
                <a href="#como-estudar" className="ia-btn">
                  Começar o minicurso →
                </a>
                <a href="#video" className="ia-btn ia-btn-ghost">
                  Ir direto ao vídeo
                </a>
              </div>

              <ul className="ia-pills">
                <li>Estereótipo</li>
                <li>Omissão</li>
                <li>Representação inadequada</li>
              </ul>

              <p className="ia-by">
                Por <strong>Vinícius Lima</strong> — UFRPE
              </p>
            </div>

            <aside className="ia-card ia-summary" aria-label="Resumo do minicurso">
              <p className="ia-mono">Resumo</p>
              <dl>
                {[
                  ["Duração total", "cerca de 50 min"],
                  ["Formato", "Vídeo + prática + avaliação"],
                  ["Ritmo", "No seu tempo, assíncrono"],
                  ["Nível", "Introdutório"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </header>

        <main id="conteudo">
          {/* COMO ESTUDAR */}
          <Secao
            id="como-estudar"
            numero="01"
            titulo="Como estudar"
            intro="O minicurso tem quatro etapas curtas. Siga a ordem abaixo ou clique em qualquer passo para ir direto a ele."
          >
            <ol className="ia-grid-2 ia-steps">
              {passos.map((p, i) => (
                <li key={p.titulo}>
                  <a href={p.href} className="ia-card ia-step">
                    <span className="ia-num">{i + 1}</span>
                    <span className="ia-grow">
                      <strong>{p.titulo}</strong>
                      <small>{p.detalhe}</small>
                    </span>
                    <span className="ia-arrow" aria-hidden>
                      →
                    </span>
                  </a>
                </li>
              ))}
            </ol>

            <div className="ia-grid-2 ia-mt">
              <div className="ia-card">
                <h3 className="ia-h3">Público-alvo</h3>
                <p className="ia-small">
                  Educadores, professores e criadores de conteúdo EaD que já
                  usam ou pretendem usar IA generativa (ChatGPT, Gemini e
                  similares) na produção de materiais didáticos.
                </p>
              </div>
              <div className="ia-card">
                <h3 className="ia-h3">Conhecimentos prévios</h3>
                <p className="ia-small">
                  Familiaridade básica com alguma ferramenta de IA generativa —
                  basta já ter pedido a ela um texto ou exemplo com fins
                  educacionais.
                </p>
              </div>
            </div>

            <Proximo href="#objetivos" rotulo="Próximo: objetivos" />
          </Secao>

          {/* OBJETIVOS */}
          <Secao id="objetivos" numero="02" titulo="O que você vai aprender">
            <ul className="ia-stack">
              {objetivos.map((o, i) => (
                <li key={o} className="ia-card ia-obj">
                  <span className="ia-big">{i + 1}</span>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
            <Proximo href="#conceitos" rotulo="Próximo: conceitos-chave" />
          </Secao>

          {/* CONCEITOS */}
          <Secao
            id="conceitos"
            numero="03"
            titulo="Três problemas para reconhecer"
            intro="Um resumo rápido para consultar antes ou depois do vídeo."
          >
            <div className="ia-grid-3">
              {conceitos.map((c) => (
                <div key={c.nome} className="ia-card ia-concept">
                  <h3 className="ia-h3">{c.nome}</h3>
                  <p className="ia-small">{c.texto}</p>
                </div>
              ))}
            </div>
            <Proximo href="#video" rotulo="Próximo: assistir ao vídeo" />
          </Secao>

          {/* VÍDEO */}
          <Secao id="video" numero="04" titulo="Assista ao minicurso">
            <div className="ia-video">
              {/* Substitua SEU_ID_DO_YOUTUBE pelo ID do vídeo publicado */}
              <iframe
                src="https://www.youtube.com/embed/SEU_ID_DO_YOUTUBE"
                title="Análise crítica de vieses em conteúdos educacionais com IA"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="ia-note">
              Duração: 20 a 30 minutos · vídeo hospedado no YouTube · legendas
              revisadas disponíveis.
            </p>
            <Proximo href="#pratica" rotulo="Próximo: praticar" />
          </Secao>

          {/* PRÁTICA */}
          <Secao
            id="pratica"
            numero="05"
            titulo="Teste você mesmo"
            intro="Copie um prompt, cole em duas ou mais IAs e compare as respostas usando a checklist de revisão logo abaixo."
          >
            <TesteVoceMesmo />
            <div className="ia-mt">
              <Checklist />
            </div>
            <Proximo href="#avaliacao" rotulo="Próximo: avaliação" />
          </Secao>

          {/* AVALIAÇÃO */}
          <Secao id="avaliacao" numero="06" titulo="Avaliação interativa">
            <div className="ia-card ia-eval">
              <div>
                <h3 className="ia-h3">Teste o que você aprendeu</h3>
                <p className="ia-small">
                  Um quiz com casos de exemplos gerados por IA, feedback
                  imediato e explicações para cada resposta.
                </p>
              </div>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdYJGXa5KZrtMNzjJbf595TQpOh93R9BlgqKK9pm8Q8m7xIBQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="ia-btn"
              >
                Abrir avaliação →
              </a>
            </div>
          </Secao>

          {/* MATERIAIS */}
          <Secao
            id="materiais"
            numero="07"
            titulo="Materiais para baixar"
            intro="Todos os PDFs e materiais de apoio do minicurso ficam reunidos em uma pasta no Dropbox. Baixe para consultar offline ou usar com seus alunos."
          >
            <ul className="ia-grid-3">
              {materiais.map((m) => (
                <li key={m.titulo} className="ia-card">
                  <span className="ia-chip">{m.tipo}</span>
                  <h3 className="ia-h3">{m.titulo}</h3>
                  <p className="ia-small">{m.descricao}</p>
                </li>
              ))}
            </ul>
            <div className="ia-row ia-mt">
              <a
                href={LINK_DROPBOX}
                target="_blank"
                rel="noopener noreferrer"
                className="ia-btn"
              >
                Abrir pasta no Dropbox ↗
              </a>
              <span className="ia-small">Abre em uma nova aba.</span>
            </div>
          </Secao>

          {/* REFERÊNCIAS */}
          <Secao id="referencias" numero="08" titulo="Referências">
            <ul className="ia-refs">
              <li>
                UNESCO. <em>Recommendation on the Ethics of Artificial
                Intelligence</em>, 2021.
              </li>
              <li>
                UNESCO. <em>AI and education: guidance for policy-makers</em>,
                2021.
              </li>
              <li>
                Bender, E. M. et al. “On the Dangers of Stochastic Parrots: Can
                Language Models Be Too Big?” — <em>FAccT</em>, 2021.
              </li>
              <li className="ia-todo">
                Adicione aqui as referências específicas usadas na sua análise
                e nos exemplos do vídeo.
              </li>
            </ul>
          </Secao>
        </main>

        <footer className="ia-footer">
          <div className="ia-wrap ia-row ia-between">
            <p>
              Minicurso produzido por Vinícius Lima — Universidade Federal Rural
              de Pernambuco (UFRPE), 2026.
            </p>
            <a href="#topo">Voltar ao topo ↑</a>
          </div>
        </footer>
      </div>
    </div>
  );
}

/* ------------------------------- ESTILOS ------------------------------- */
/* Os resets usam :where() (especificidade zero) para NÃO sobrescrever as
   margens e fontes das classes .ia-* abaixo. */

const css = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Fraunces:ital,opsz,wght@0,9..144,600;0,9..144,700;1,9..144,600&family=Nunito:wght@400;600;700&display=swap');

html { scroll-behavior: smooth; }
html, body { background: #0E2B27 !important; }

.ia {
  --board: #0E2B27;
  --paper: #FBF6E8;
  --ink: #1E2B28;
  --ink-soft: #55655F;
  --chalk: #F4F1E6;
  --chalk-soft: #B7CBC3;
  --line: rgba(244, 241, 230, 0.16);
  --yellow: #F6C945;
  --coral: #F26B4F;
  --coral-d: #B93F27;
  --sky: #6EC1F5;
  --mint: #7AD9A9;
  --green: #1F6F5C;
  --green-d: #134A3D;

  position: relative;
  font-family: 'Nunito', system-ui, sans-serif;
  color: var(--chalk);
  line-height: 1.65;
  overflow-x: clip;
  -webkit-font-smoothing: antialiased;
}
.ia *, .ia *::before, .ia *::after { box-sizing: border-box; }
.ia :where(h1, h2, h3) { font-family: 'Fraunces', Georgia, serif; font-weight: 700; margin: 0; letter-spacing: -0.01em; line-height: 1.15; }
.ia :where(p, dl, dd, ul, ol, figure) { margin: 0; }
.ia :where(ul, ol) { list-style: none; padding: 0; }
.ia :where(a) { color: inherit; text-decoration: none; }
.ia :where(button) { font: inherit; color: inherit; cursor: pointer; }

/* fundo de quadro-negro */
.ia-bg {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background:
    radial-gradient(55rem 36rem at 15% -5%, rgba(130, 210, 180, .16), transparent 62%),
    radial-gradient(50rem 34rem at 105% 105%, rgba(246, 201, 69, .08), transparent 60%),
    radial-gradient(90rem 60rem at 50% 50%, transparent 55%, rgba(0, 0, 0, .35) 100%),
    #0E2B27;
}
.ia-content { position: relative; z-index: 1; }

.ia-progress { position: fixed; top: 0; left: 0; right: 0; height: 4px; z-index: 100; }
.ia-progress div { height: 100%; background: var(--yellow); }

.ia-wrap { max-width: 1080px; margin: 0 auto; padding: 0 28px; }
.ia-skip { position: absolute; left: -9999px; top: 8px; background: var(--yellow); color: var(--ink); padding: 8px 14px; border-radius: 8px; z-index: 200; }
.ia-skip:focus { left: 12px; }

/* menu */
.ia-nav { position: sticky; top: 0; z-index: 50; background: rgba(10, 33, 30, .88); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom: 1px solid var(--line); }
.ia-nav-in { display: flex; align-items: center; gap: 28px; height: 64px; }
.ia-brand { display: flex; align-items: center; gap: 10px; font-family: 'Fraunces', serif; font-weight: 700; font-size: 1.1rem; white-space: nowrap; }
.ia-dot { width: 12px; height: 12px; border-radius: 3px; background: var(--yellow); transform: rotate(12deg); }
.ia-nav-links { display: flex; gap: 4px; overflow-x: auto; scrollbar-width: none; font-size: .92rem; font-weight: 600; color: var(--chalk-soft); }
.ia-nav-links::-webkit-scrollbar { display: none; }
.ia-nav-links a { display: inline-block; padding: 8px 14px; border-radius: 999px; white-space: nowrap; transition: .2s; }
.ia-nav-links a:hover { color: var(--chalk); background: rgba(255, 255, 255, .08); }
.ia-nav-links a.active { color: var(--ink); background: var(--yellow); }

/* hero */
.ia-hero { padding: 112px 0 104px; }
.ia-hero-grid { display: grid; grid-template-columns: 1fr 320px; gap: 72px; align-items: start; }
.ia-tag { font-family: 'Caveat', cursive; font-weight: 700; font-size: 1.75rem; line-height: 1.2; color: var(--yellow); margin-bottom: 22px; }
.ia-h1 { font-size: clamp(2.4rem, 5vw, 3.7rem); line-height: 1.12; margin-bottom: 32px; }
.ia-mark { background: linear-gradient(transparent 58%, rgba(246, 201, 69, .6) 58%); padding: 0 .14em; margin: 0 -.06em; }
.ia-lead { font-size: 1.15rem; color: var(--chalk-soft); max-width: 58ch; margin-bottom: 40px; }
.ia-cta { margin-bottom: 40px; }
.ia-pills { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 40px; }
.ia-pills li { font-size: .85rem; font-weight: 700; padding: 7px 15px; border-radius: 999px; color: var(--ink); }
.ia-pills li:nth-child(1) { background: var(--yellow); }
.ia-pills li:nth-child(2) { background: var(--sky); }
.ia-pills li:nth-child(3) { background: var(--mint); }
.ia-by { font-size: .92rem; color: var(--chalk-soft); }
.ia-by strong { color: var(--chalk); }

.ia-summary { transform: rotate(1.4deg); border-top: 8px solid var(--coral); padding: 28px; margin-top: 8px; }
.ia-summary:hover { transform: rotate(0deg) translateY(-3px); }
.ia-summary dl { display: flex; flex-direction: column; gap: 18px; margin-top: 18px; }
.ia-summary dt { font-size: .74rem; text-transform: uppercase; letter-spacing: .12em; font-weight: 700; color: var(--ink-soft); }
.ia-summary dd { font-weight: 700; font-size: 1.02rem; margin-top: 2px; color: var(--ink); }

/* seções */
.ia-sec { padding: 104px 0; border-top: 1px solid var(--line); scroll-margin-top: 64px; }
.ia-sec .ia-wrap { max-width: 820px; }
.ia-eyebrow { font-family: 'Caveat', cursive; font-weight: 700; font-size: 1.6rem; line-height: 1; color: var(--yellow); margin-bottom: 14px; }
.ia-h2 { font-size: clamp(1.9rem, 3.6vw, 2.5rem); margin-bottom: 18px; }
.ia-intro { color: var(--chalk-soft); font-size: 1.05rem; max-width: 60ch; }
.ia-body { margin-top: 44px; }
.ia-h3 { font-size: 1.22rem; margin: 6px 0 10px; }
.ia-small { font-size: .98rem; color: var(--chalk-soft); }
.ia-card .ia-small { color: var(--ink-soft); }
.ia-note { margin-top: 22px; font-size: .92rem; color: var(--chalk-soft); font-style: italic; }
.ia-mt { margin-top: 32px; }
.ia-stack { display: flex; flex-direction: column; gap: 20px; }
.ia-tight { gap: 8px; margin-top: 6px; }
.ia-row { display: flex; flex-wrap: wrap; align-items: center; gap: 20px; }
.ia-between { justify-content: space-between; }
.ia-grow { flex: 1; }
.ia-grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; }
.ia-grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }

/* fichas de papel */
.ia-card { background: var(--paper); color: var(--ink); border-radius: 14px; padding: 26px; box-shadow: 0 2px 0 rgba(0, 0, 0, .25), 0 18px 30px -20px rgba(0, 0, 0, .7); transition: transform .25s, box-shadow .25s; }
.ia-card:hover { transform: translateY(-3px); box-shadow: 0 2px 0 rgba(0, 0, 0, .25), 0 24px 36px -20px rgba(0, 0, 0, .8); }
.ia-mono { font-size: .74rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase; color: var(--coral-d); }

.ia-step { display: flex; align-items: center; gap: 18px; padding: 20px 22px; }
.ia-step strong { display: block; font-size: 1.02rem; }
.ia-step small { color: var(--ink-soft); font-size: .88rem; }
.ia-num { flex: none; width: 42px; height: 42px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-family: 'Fraunces', serif; font-weight: 700; font-size: 1.1rem; color: var(--ink); background: var(--yellow); }
.ia-steps li:nth-child(2) .ia-num { background: var(--coral); }
.ia-steps li:nth-child(3) .ia-num { background: var(--sky); }
.ia-steps li:nth-child(4) .ia-num { background: var(--mint); }
.ia-arrow { color: var(--ink-soft); transition: .2s; }
.ia-step:hover .ia-arrow { color: var(--green); transform: translateX(4px); }

.ia-obj { display: flex; gap: 22px; align-items: flex-start; }
.ia-big { font-family: 'Fraunces', serif; font-weight: 700; font-size: 2.1rem; line-height: 1; color: var(--coral); flex: none; width: 28px; }
.ia-concept { border-top: 8px solid var(--yellow); }
.ia-grid-3 .ia-concept:nth-child(2) { border-top-color: var(--coral); }
.ia-grid-3 .ia-concept:nth-child(3) { border-top-color: var(--sky); }
.ia-chip { display: inline-block; font-size: .72rem; font-weight: 700; letter-spacing: .1em; padding: 3px 10px; border-radius: 6px; color: #fff; background: var(--coral-d); margin-bottom: 10px; }

/* botões (lápis amarelo) */
.ia-btn { display: inline-block; border: 0; padding: 15px 26px; border-radius: 12px; font-weight: 700; font-size: 1rem; color: #2A2200; background: var(--yellow); box-shadow: 0 4px 0 #C99A12; transition: transform .15s, box-shadow .15s; white-space: nowrap; }
.ia-btn:hover { transform: translateY(-2px); box-shadow: 0 6px 0 #C99A12; }
.ia-btn:active { transform: translateY(3px); box-shadow: 0 1px 0 #C99A12; }
.ia-btn-sm { padding: 11px 20px; font-size: .92rem; }
.ia-btn-ghost { color: var(--chalk); background: transparent; box-shadow: none; border: 2px solid var(--chalk-soft); padding: 13px 24px; }
.ia-btn-ghost:hover { box-shadow: none; background: rgba(255, 255, 255, .08); border-color: var(--chalk); }
.ia-btn-ghost:active { box-shadow: none; }
.ia-card .ia-btn { color: #fff; background: var(--green); box-shadow: 0 4px 0 var(--green-d); }
.ia-card .ia-btn:hover { box-shadow: 0 6px 0 var(--green-d); }
.ia-card .ia-btn:active { box-shadow: 0 1px 0 var(--green-d); }

/* vídeo: moldura de madeira */
.ia-video { position: relative; padding-top: 56.25%; border: 10px solid #9A6B3F; border-radius: 10px; background: #02100E; overflow: hidden; box-shadow: 0 0 0 2px #6F4A28, 0 30px 50px -24px rgba(0, 0, 0, .8); }
.ia-video iframe { position: absolute; inset: 0; width: 100%; height: 100%; border: 0; }

/* prática */
.ia-quote { margin: 14px 0 22px; padding: 6px 0 6px 18px; border-left: 4px solid var(--yellow); font-family: 'Fraunces', serif; font-size: 1.1rem; font-style: italic; font-weight: 600; }
.ia-links { display: flex; flex-wrap: wrap; gap: 6px 16px; font-size: .9rem; color: var(--ink-soft); }
.ia-links a { color: var(--green); font-weight: 700; text-decoration: underline; text-underline-offset: 3px; }
.ia-links a:hover { color: var(--coral-d); }
.ia-check .ia-small { margin-top: 4px; }
.ia-bar { height: 8px; border-radius: 99px; background: rgba(0, 0, 0, .1); margin: 18px 0 14px; overflow: hidden; }
.ia-bar div { height: 100%; border-radius: 99px; background: var(--green); transition: width .35s; }
.ia-item { width: 100%; display: flex; gap: 14px; align-items: flex-start; text-align: left; background: transparent; border: 0; padding: 12px 12px; border-radius: 10px; transition: .2s; }
.ia-item:hover { background: rgba(0, 0, 0, .05); }
.ia-box { flex: none; width: 24px; height: 24px; margin-top: 2px; border-radius: 7px; border: 2px solid var(--ink-soft); display: flex; align-items: center; justify-content: center; color: #fff; transition: .2s; }
.ia-item.on .ia-box { background: var(--green); border-color: var(--green); }
.ia-item.on span:last-child { color: var(--ink-soft); text-decoration: line-through; }

/* avaliação */
.ia-eval { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 24px; padding: 32px; border-left: 10px solid var(--yellow); }
.ia-eval .ia-small { max-width: 46ch; }

/* referências / rodapé / próximo */
.ia-refs { display: flex; flex-direction: column; gap: 16px; color: var(--chalk-soft); font-size: .98rem; }
.ia-refs li { padding-left: 18px; border-left: 3px solid var(--line); }
.ia-refs li.ia-todo { border-left-color: var(--yellow); color: var(--chalk); font-style: italic; }
.ia-next { display: flex; justify-content: flex-end; margin-top: 44px; }
.ia-next a { font-size: .95rem; font-weight: 700; color: var(--chalk-soft); transition: .2s; }
.ia-next a:hover { color: var(--yellow); }
.ia-footer { border-top: 1px solid var(--line); background: #091F1C; padding: 40px 0; font-size: .92rem; color: var(--chalk-soft); }
.ia-footer a { color: var(--chalk); font-weight: 700; }
.ia-footer a:hover { color: var(--yellow); }

@media (max-width: 860px) {
  .ia-hero { padding: 72px 0 64px; }
  .ia-hero-grid { grid-template-columns: 1fr; gap: 48px; }
  .ia-summary { transform: none; }
  .ia-grid-2, .ia-grid-3 { grid-template-columns: 1fr; }
  .ia-sec { padding: 72px 0; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .ia-card, .ia-btn { transition: none; }
}
`;