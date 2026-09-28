import Checklist from "./components/Checklist"; // Importação do componente que você criou

export default function Home() {
  return (
    <>
      {/* HERO */}
      <header className="border-b border-rule">
        <div className="max-w-3xl mx-auto px-7 pt-16 pb-14">
          <p className="font-serif italic text-ink-soft text-lg mb-4">
            Minicurso EaD — Docência Digital na Era da IA
          </p>
          <h1 className="font-serif text-[2.4rem] md:text-5xl leading-tight tracking-tight">
            Análise crítica de vieses em conteúdos educacionais gerados por IA
          </h1>
          <p className="mt-6 text-lg text-ink-soft max-w-[56ch]">
            Um minicurso prático para reconhecer estereótipos, omissões e
            representações inadequadas em materiais didáticos produzidos com
            inteligência artificial — e para revisá-los com critérios
            explícitos, sem perder de vista os limites dessa análise.
          </p>
          <p className="mt-8 text-sm text-ink-soft">
            Por <strong className="text-ink font-semibold">Vinícius Lima</strong> —
            UFRPE
          </p>
        </div>
      </header>

      {/* PÚBLICO E PRÉ-REQUISITOS */}
      <section className="border-b border-rule">
        <div className="max-w-3xl mx-auto px-7 py-13">
          <h2 className="font-serif text-2xl mb-6">
            Para quem é e o que você vai precisar
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-paper-2 p-6 rounded-md">
              <h3 className="font-semibold text-base mb-2">Público-alvo</h3>
              <p className="text-ink-soft text-[0.98rem]">
                Educadores, professores e criadores de conteúdo EaD que já
                usam ou pretendem usar IA generativa (ChatGPT, Gemini e
                similares) na produção de materiais didáticos.
              </p>
            </div>
            <div className="bg-paper-2 p-6 rounded-md">
              <h3 className="font-semibold text-base mb-2">
                Conhecimentos prévios
              </h3>
              <p className="text-ink-soft text-[0.98rem]">
                Familiaridade básica com alguma ferramenta de IA generativa —
                basta já ter pedido a ela um texto ou exemplo com fins
                educacionais.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* OBJETIVOS */}
      <section className="border-b border-rule">
        <div className="max-w-3xl mx-auto px-7 py-13">
          <h2 className="font-serif text-2xl mb-6">O que você vai aprender</h2>
          <ul className="flex flex-col gap-4">
            {[
              "Identificar estereótipos, omissões e representações inadequadas em exemplos gerados por IA.",
              "Comparar respostas de diferentes IAs para um mesmo prompt educacional e apontar diferenças de viés entre elas.",
              "Aplicar critérios explícitos — uma checklist de revisão — antes de levar um material para a sala de aula.",
              "Reconhecer os limites da própria análise: o que uma checklist não é capaz de capturar.",
            ].map((item, index) => (
              <li key={index} className="flex gap-3.5 items-start">
                {/* Aqui os pontinhos da lista foram atualizados para combinar com o design */}
                <div className="mt-1.5 w-2.5 h-2.5 rounded-sm bg-flag flex-none opacity-80" />
                <span className="text-ink text-[1.05rem] leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
          
          {/* COMPONENTE ADICIONADO AQUI: Ele vai renderizar logo abaixo da lista */}
          <Checklist />
          
        </div>
      </section>

      {/* VÍDEO */}
      <section className="border-b border-rule">
        <div className="max-w-3xl mx-auto px-7 py-13">
          <h2 className="font-serif text-2xl mb-6">Assista ao minicurso</h2>
          {/* Aqui adicionamos rounded-md, overflow-hidden e shadow-lg para emoldurar melhor o vídeo */}
          <div className="relative w-full pt-[56.25%] bg-ink rounded-md overflow-hidden shadow-lg border border-rule">
            {/* Substitua SEU_ID_DO_YOUTUBE pelo ID do vídeo publicado */}
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/SEU_ID_DO_YOUTUBE"
              title="Análise crítica de vieses em conteúdos educacionais com IA"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <p className="mt-3.5 text-sm text-ink-soft italic">
            Vídeo hospedado no YouTube · legendas revisadas disponíveis.
          </p>
        </div>
      </section>

      {/* AVALIAÇÃO */}
      <section className="border-b border-rule">
        <div className="max-w-3xl mx-auto px-7 py-13">
          <h2 className="font-serif text-2xl mb-6">Avaliação interativa</h2>
          <div className="bg-paper-2 rounded-md p-7 flex flex-wrap justify-between items-center gap-5 border border-rule">
            <div>
              <h3 className="font-semibold text-base">
                Teste o que você aprendeu
              </h3>
              <p className="mt-1.5 text-ink-soft max-w-[44ch]">
                Um quiz com casos reais de exemplos gerados por IA, feedback
                imediato e explicações para cada resposta.
              </p>
            </div>
            {/* Substitua # pelo link da atividade no Genially */}
            {/* Botão com transições suaves e efeito de flutuar */}
            <a
              href="#"
              target="_blank"
              rel="noopener"
              className="inline-block bg-ink hover:bg-flag text-paper px-6 py-3.5 text-[0.95rem] font-medium whitespace-nowrap transition-all duration-300 rounded-sm shadow-md hover:shadow-lg hover:-translate-y-0.5"
            >
              Abrir avaliação →
            </a>
          </div>
        </div>
      </section>

      {/* REFERÊNCIAS */}
      <section>
        <div className="max-w-3xl mx-auto px-7 py-13">
          <h2 className="font-serif text-2xl mb-6">Referências</h2>
          <ul className="flex flex-col gap-3 text-[0.95rem] text-ink-soft">
            <li className="pl-4 border-l-2 border-rule">
              UNESCO. <em>Recommendation on the Ethics of Artificial
              Intelligence</em>, 2021.
            </li>
            <li className="pl-4 border-l-2 border-rule">
              UNESCO. <em>AI and education: guidance for policy-makers</em>,
              2021.
            </li>
            <li className="pl-4 border-l-2 border-rule">
              Bender, E. M. et al. &ldquo;On the Dangers of Stochastic
              Parrots: Can Language Models Be Too Big?&rdquo; —{" "}
              <em>FAccT</em>, 2021.
            </li>
            <li className="pl-4 border-l-2 border-flag text-ink">
              <em>
                Adicione aqui as referências específicas usadas na sua
                análise e nos exemplos do vídeo.
              </em>
            </li>
          </ul>
        </div>
      </section>

      <footer className="max-w-3xl mx-auto px-7 py-10 text-sm text-ink-soft">
        Minicurso produzido por Vinícius Lima — Universidade Federal Rural de
        Pernambuco (UFRPE), 2026.
      </footer>
    </>
  );
}