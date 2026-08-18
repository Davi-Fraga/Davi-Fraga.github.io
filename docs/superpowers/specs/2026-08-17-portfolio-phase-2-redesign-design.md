# Fase 2 — Redesign visual, motion e experiência

## Status

Design aprovado em conversa em 17 de agosto de 2026. Esta especificação define a evolução visual incremental do portfólio sem alterar sua fonte editorial de verdade.

## Objetivo

Elevar o portfólio a uma experiência técnica, premium, minimalista e memorável que comunique, nesta ordem:

1. Software Engineering;
2. Product Design;
3. Creative Development.

Motion deve explicar hierarquia, progressão, arquitetura ou estado. Efeitos sem função serão removidos.

## Escopo protegido

Permanecem preservados:

- dados em `data/profile.ts`, `data/projects.ts`, `data/experience.ts` e `data/skills.ts`;
- textos, projetos, experiências, tecnologias e métricas da refatoração anterior;
- slugs, URLs, links, status e ordem editorial dos projetos;
- Gestão LGND como primeiro e maior destaque;
- relação entre GetCoders e Consolidador Redmine;
- estrutura e conteúdo das páginas de case;
- metadados e informações de SEO;
- contratos editoriais cobertos por `e2e/portfolio.spec.ts`.

Não serão inventados dados, métricas, screenshots, clientes, tecnologias ou componentes de arquitetura.

## Stack e estratégia

O projeto continuará usando Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 3, shadcn/Radix e `next-themes`.

Serão adicionados somente:

- `lenis` para suavização não intrusiva do scroll em desktop;
- `gsap` e ScrollTrigger para timelines e progressão ligada ao scroll;
- `@gsap/react` para lifecycle e cleanup React.

`framer-motion` será mantido apenas onde pequenas interações de UI justificarem seu runtime. Fades simples deverão preferir CSS ou GSAP já carregado. Inspira UI, Cult UI e Skiper UI serão apenas referências conceituais; nenhum código proprietário ou pacote integral será copiado.

## Direção visual

A direção será dark técnica e refinada, inspirada em ferramentas de desenvolvimento e SaaS premium, sem reproduzir identidade de terceiros.

### Princípios

- superfícies tonais, bordas finas e contraste controlado;
- tipografia clara, com hierarquia ampla e pouco ruído;
- accent violeta usado semanticamente;
- azul secundário restrito a poucos detalhes técnicos;
- uma única assinatura visual complexa no Gestão LGND;
- densidade alternada: projetos com presença, conteúdo textual com respiro;
- nenhuma estética gamer, neon, cósmica ou experimental que prejudique navegação.

### Tipografia

- Geist para interface e leitura, usando `next/font`;
- JetBrains Mono para labels, métricas e informações técnicas;
- um único `h1` semanticamente correto;
- display responsivo com `clamp()`;
- corpo entre 16 e 18 px, line-height mínimo de 1.5 e largura entre 65 e 75 caracteres.

### Tokens visuais

`DESIGN.md`, `app/globals.css` e `tailwind.config.ts` deverão manter papéis semânticos para:

- background, surface e surface-elevated;
- foreground e muted;
- border e border-hover;
- accent e accent-secondary;
- escala de spacing baseada em múltiplos de 4/8 px;
- raios de 16 px para cards, 20–24 px para superfícies principais e formato pill para ações compactas;
- durações, easings e breakpoints de motion.

## Arquitetura de motion

### Responsabilidades

- GSAP: Hero, ScrollTrigger, timelines, sticky progressivo, diagramas SVG, image reveal e transições maiores;
- CSS/Framer Motion: hover, focus, presence e microinterações isoladas;
- Lenis: suavização discreta de desktop sem bloquear entrada nativa.

### Infraestrutura

A implementação deverá criar abstrações equivalentes a:

- provider global de smooth scroll;
- configuração central de durações, easings e breakpoints;
- hook de preferência por movimento reduzido;
- Reveal;
- ImageReveal;
- Counter;
- animação de arquitetura;
- barra de progresso para cases.

A estrutura final será adaptada ao projeto atual, sem reorganização ampla.

### Integração Lenis e GSAP

Haverá uma única instância global de Lenis. Ela deverá:

- notificar `ScrollTrigger.update` em eventos de scroll;
- ser atualizada pelo `gsap.ticker` com conversão correta de segundos para milissegundos;
- desabilitar lag smoothing somente se necessário e documentado;
- remover ticker callbacks e listeners no cleanup;
- destruir a instância ao desmontar;
- não inicializar em reduced-motion ou quando a experiência touch nativa for preferível;
- preservar wheel, trackpad, teclado, scrollbar, âncoras, touch e histórico de navegação.

Animações React usarão `useGSAP` ou `gsap.context`, com cleanup de timelines, media queries e ScrollTriggers.

## Comportamento por seção

### Navbar

- permanece fixa/sticky e integrada visualmente ao Hero no topo;
- após aproximadamente 40–80 px, reduz altura e ganha fundo semitransparente, blur e borda;
- mantém indicador da seção ativa;
- preserva links, currículo, tema, menu móvel e retorno ao topo;
- menu fechado não poderá manter controles invisíveis focáveis;
- links e ícones terão alvos de toque adequados.

### Hero

- ocupa aproximadamente 80–95vh em desktop;
- preserva disponibilidade, nome, posicionamento, descrição, stack e CTAs atuais;
- usa uma timeline GSAP curta com badge, headline, subheadline, descrição, stack e ações;
- recebe grid CSS/SVG com baixa opacidade e um único glow atmosférico discreto;
- não terá typewriter, glitch, partículas, cursor customizado ou texto de profissão rotativo;
- animação não bloqueará navegação ou interação.

### Métricas

- preserva valores e descrições atuais;
- count-up ocorre uma vez, entre 700 e 1200 ms;
- reduced-motion mostra valores finais imediatamente;
- nenhuma métrica nova será criada.

### Featured Projects

Os quatro projetos permanecem:

1. Gestão LGND;
2. Consolidador Redmine;
3. Projeto OAB;
4. FluxoCorreto.

Em desktop:

- cards têm presença de aproximadamente 70–90vh;
- progressão usa sticky moderado e ScrollTrigger, sem longos pins;
- o card anterior reduz discretamente escala e opacidade quando o seguinte assume destaque;
- screenshots reais usam reveal com clip-path, opacity e escala máxima inicial de 1.025;
- quando não houver screenshot real, será usado placeholder técnico explícito, sem simular produto inexistente.

Abaixo de 768 px:

- não haverá stack complexa, pin ou scrub;
- projetos serão cards verticais comuns;
- todas as informações estarão visíveis sem hover;
- reveals serão leves e executados uma vez.

### Gestão LGND

Será o único signature moment.

O diagrama SVG usará somente a arquitetura registrada nos dados atuais. A sequência será:

1. entrada do container;
2. entrada do primeiro node;
3. desenho das conexões SVG;
4. entrada dos nodes dependentes;
5. indicadores discretos;
6. métricas existentes;
7. transição para screenshot real ou placeholder identificado.

As linhas serão finas, os nodes compactos e o contraste controlado. Não haverá infográfico gigante, caixas inventadas ou animação repetitiva.

### Cases secundários

Coligação 2026 e Landing Page Flamengo usarão cards inspirados conceitualmente em Shift Card:

- conteúdo essencial sempre visível;
- desktop revela detalhes adicionais com pequeno deslocamento;
- touch apresenta tudo no fluxo normal;
- hover máximo de `translateY(-4px)` e escala de imagem até 1.025;
- Flamengo pode ter tilt exclusivo de até 3 graus, desativado em touch e reduced-motion.

### Experiência e formação

- timeline discreta com SVG e progresso ligado ao scroll;
- entries entram com opacity e pequeno translateY;
- GetCoders mantém link visual para Consolidador Redmine;
- formação usa rows/cards simples, com pouco motion;
- mobile remove progressão complexa e mantém linha ou borda estática.

### Stack

- mantém categorias e tecnologias atuais;
- não usa carrossel, logos flutuantes, barras, percentuais ou 3D;
- interação limita-se a foreground, border/background e tooltip acessível opcional;
- tooltip funcionará por foco e não apenas por hover.

### Sobre

- funciona como pausa visual;
- recebe somente heading reveal e fade curto do conteúdo;
- não terá animação palavra por palavra em parágrafos.

### Contato e Footer

- contato preserva canais e conteúdo existentes;
- CTA pode ter deslocamento magnético de até 4 px somente em pointer fino;
- cópia de e-mail terá feedback real de sucesso e falha;
- Footer permanece minimalista, com fade e touch targets corretos.

### Páginas de case

- preservam todos os blocos editoriais atuais;
- entrada curta de 300–450 ms com opacity e y de 8–12 px;
- imagem principal usa o mesmo ImageReveal, quando houver recurso real;
- recebem linha fina de progresso de leitura;
- não repetem a arquitetura animada complexa da home.

## Responsividade

Breakpoints mínimos de QA:

- 320 px;
- 375 px;
- 430 px;
- 768 px;
- 1024 px;
- 1280 px;
- 1440 px;
- 1920 px.

Critérios:

- nenhum overflow horizontal;
- layout refluindo em coluna única a 320 px;
- nenhuma informação essencial dependente de hover;
- touch targets confortáveis;
- sticky e motion adaptados por capacidade, não apenas largura;
- resize não deixa pins, espaços vazios ou sobreposições.

## Acessibilidade

Meta: WCAG 2.2 AA.

Mudanças obrigatórias:

- adicionar skip link e `main` identificável em home e cases;
- corrigir ordem de headings do Hero;
- garantir foco visível;
- remover controles invisíveis da ordem de foco no menu móvel fechado;
- manter navegação integral por teclado;
- associar menu e botão com atributos apropriados;
- garantir labels e nomes acessíveis;
- preservar contraste mínimo de texto e controles;
- disponibilizar estados e dados em touch/foco;
- usar alt text para screenshots reais e `alt=""` apenas em decoração.

## Reduced motion

CSS e JavaScript deverão respeitar `prefers-reduced-motion: reduce`.

Nesse modo:

- Lenis não inicializa;
- pin, scrub, parallax e tilt são removidos;
- counters mostram o resultado final;
- transforms de entrada não essenciais são removidos;
- indicadores infinitos param;
- scroll suave de CSS e JavaScript é desabilitado;
- conteúdo permanece imediatamente visível e utilizável.

## Imagens e performance

- usar `next/image` quando houver recursos reais;
- dimensões ou aspect-ratio definidos para evitar CLS;
- lazy loading abaixo da dobra;
- alt text contextual;
- formatos otimizados;
- não criar screenshot falsa;
- motion contínuo limitado a transform e opacity;
- não manter `will-change` global ou permanente;
- evitar blur/filter e sombras pesadas em animação;
- manter no máximo um elemento principal e um detalhe secundário animando simultaneamente.

A implementação deverá comparar antes/depois quanto a bundle cliente, LCP, CLS e INP. Framer Motion não deverá continuar convertendo toda a home estática em componentes cliente apenas por fades.

## Componentes e arquivos previstos

Arquivos existentes com alterações prováveis:

- `app/layout.tsx`;
- `app/page.tsx`;
- `app/globals.css`;
- `app/projects/[slug]/page.tsx`;
- `tailwind.config.ts`;
- `components/navbar.tsx`;
- `components/hero.tsx`;
- `components/metrics-section.tsx`;
- `components/projects-section.tsx`;
- `components/featured-project-card.tsx`;
- `components/project-card.tsx`;
- `components/experience-section.tsx`;
- `components/skills-grid.tsx`;
- `components/about-section.tsx`;
- `components/contact-section.tsx`;
- `components/footer.tsx`;
- `components/section-title.tsx`;
- `components/motion-wrapper.tsx` ou sua substituição incremental;
- `e2e/portfolio.spec.ts`;
- `package.json` e `package-lock.json`.

Novos arquivos previstos, sujeitos aos padrões encontrados durante implementação:

- `DESIGN.md`;
- provider/hook de smooth scroll;
- configuração central de motion;
- componentes Reveal, ImageReveal e Counter;
- componente de arquitetura do Gestão LGND;
- componente de progresso de case.

Não serão alterados `data/*` salvo correção editorial separadamente aprovada.

## Sequência de implementação

1. Criar `DESIGN.md` e tokens visuais.
2. Configurar dependências e infraestrutura Lenis/GSAP/reduced-motion.
3. Implementar Hero e Navbar; validar hidratação, CLS e navegação.
4. Implementar featured projects e ImageReveal.
5. Implementar arquitetura animada do Gestão LGND.
6. Implementar cards secundários.
7. Implementar timeline de experiência e formação.
8. Refinar Stack, Sobre, Contato, Footer e pages de case.
9. Completar testes e QA técnico/visual.

Nenhuma fase avança com hydration error, regressão editorial, scroll quebrado, ScrollTrigger órfão ou layout shift introduzido.

## Testes e validação

### Automação

- manter os testes E2E editoriais atuais;
- adicionar testes para menu móvel aberto/fechado e ordem de foco;
- testar skip link;
- testar reduced-motion;
- testar âncoras e retorno ao topo;
- testar feedback de clipboard em sucesso e falha;
- testar ausência de overflow nos viewports principais;
- testar navegação de cases e conteúdo privado sem links públicos.

### Gates técnicos

Executar:

- lint, após configurar ESLint compatível com Next.js 16;
- `npm run typecheck`;
- testes existentes;
- `npm run build`;
- `npm run test:e2e` contra build de produção.

`next.config.mjs` atualmente ignora erros TypeScript no build. O typecheck separado é obrigatório e a remoção desse bypass será avaliada sem ampliar escopo silenciosamente.

### QA de navegador

- desktop, tablet, mobile e touch;
- teclado completo;
- reduced-motion;
- scroll lento, rápido, reverso, scrollbar e trackpad quando disponível;
- resize em diferentes pontos da página;
- console e hydration;
- screenshots comparativas;
- LCP, CLS, INP e fluidez do scroll.

## Critérios de aceite

- conteúdo e arquitetura editorial anteriores preservados;
- nenhum projeto, métrica ou tecnologia inventado;
- `DESIGN.md` criado e consumido pela implementação;
- tokens visuais e de motion centralizados;
- uma única instância Lenis, com cleanup e fallback nativo;
- GSAP e ScrollTrigger com lifecycle correto;
- reduced-motion funcional em CSS e JavaScript;
- Hero limpo, grid sutil e Navbar responsiva ao scroll;
- Gestão LGND como maior destaque e único signature moment;
- featured projects com experiência desktop e versão mobile simplificada;
- image reveals sem CLS;
- cases secundários acessíveis sem hover;
- timeline funcional e Stack discreta;
- sem cursor customizado, efeitos gamer, scroll hijacking ou overflow horizontal;
- teclado, touch, foco e contraste validados;
- imagens otimizadas ou placeholders honestos;
- nenhuma dependência redundante adicionada;
- lint, typecheck, testes e build aprovados;
- ausência de hydration errors, listeners órfãos e ScrollTriggers remanescentes.

## Fora de escopo

- reescrever conteúdo;
- adicionar ou remover projetos;
- mudar métricas ou claims;
- alterar slugs ou URLs públicas;
- criar screenshots ou dados fictícios;
- migrar Tailwind 3 para Tailwind 4;
- trocar o framework;
- adicionar CMS, API ou banco;
- copiar componentes pagos ou proprietários;
- adicionar WebGL fora do case Flamengo existente.
