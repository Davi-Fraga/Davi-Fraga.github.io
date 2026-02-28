export const profile = {
  name: "Davi Fraga",
  headline: "Back-end Developer (Java & Python) | Front-end (HTML/CSS)",
  subheadline:
    "Construo aplicacoes e automacoes com foco em clareza, performance e boa arquitetura. Aberto a estagio/primeira oportunidade e freelas.",

  about: {
    paragraphs: [
      "Cursando Engenharia de Software na Faculdade SENAI FATESG (3\u00BA periodo). Meu foco e back-end com Java e Python \u2014 gosto de resolver problemas reais com codigo limpo e bem estruturado, criando automacoes e sistemas que funcionam de verdade.",
      "Tambem estou evoluindo no front-end (HTML/CSS) para conseguir entregar produtos completos. Acredito que um desenvolvedor versatil entrega mais valor, e e isso que busco a cada projeto.",
    ],
    highlights: [
      { label: "Back-end", value: "Java e Python" },
      { label: "Front-end", value: "HTML/CSS" },
      { label: "Ferramentas", value: "Git + VSCode/IntelliJ + Cursor AI" },
    ],
  },

  skills: [
    {
      category: "Back-end",
      items: ["Java", "Python"],
    },
    {
      category: "Front-end",
      items: ["HTML", "CSS"],
    },
    {
      category: "Ferramentas",
      items: ["IntelliJ IDEA", "VSCode", "Git", "Cursor AI"],
    },
  ],

  projects: [
    {
      title: "SaaS de Atendimento Omnichannel (Front-end)",
      description:
        "Dashboard e telas para atendimento/gestao com foco em UX e organizacao.",
      briefExplanation:
        "Painel desenvolvido para centralizar a operacao de atendimento ao cliente \u2014 reunindo visao geral, listas de chamados, status em tempo real e metricas de desempenho. A interface foi construida com componentes reutilizaveis e uma estrutura de UI consistente para facilitar a manutencao e escalabilidade do projeto.",
      highlights: [
        "Layout consistente e responsivo",
        "Componentes reutilizaveis com shadcn/ui",
        "Visao de metricas e dashboards",
      ],
      techBadges: ["Next.js", "Tailwind", "shadcn/ui"],
      demoUrl: "#",
      repoUrl: "#",
    },
    {
      title: "GynLog Fleet Manager (Java Desktop)",
      description: "Sistema desktop para gestao de frotas no padrao MVC.",
      briefExplanation:
        "Aplicacao desktop que gerencia veiculos e rotinas operacionais de frotas \u2014 incluindo cadastros, consultas e regras de negocio. Organizado em camadas seguindo o padrao MVC, com foco em clareza de dominio e facilidade de manutencao do codigo.",
      highlights: [
        "CRUD completo de veiculos e rotinas",
        "Arquitetura MVC bem definida",
        "Regras de negocio encapsuladas",
      ],
      techBadges: ["Java", "Swing", "MVC"],
      demoUrl: "#",
      repoUrl: "#",
    },
    {
      title: "Sistema/Organizacao de Loja (Alma da Prata)",
      description:
        "Controle e organizacao de itens/rotinas do negocio (prototipo/gestao).",
      briefExplanation:
        "Sistema pensado para centralizar cadastros e oferecer visao geral da operacao de uma loja \u2014 gerenciando itens, rotinas e organizacao interna. O objetivo e reduzir a desorganizacao do dia a dia e melhorar o controle do negocio de forma simples e acessivel.",
      highlights: [
        "Cadastros de itens e categorias",
        "Visao geral da operacao",
        "Operacao simples e intuitiva",
      ],
      techBadges: ["Java/Python", "HTML/CSS", "Git"],
      demoUrl: "#",
      repoUrl: "#",
    },
    {
      title: "API de Gestao (Back-end) \u2014 Java ou Python",
      description:
        "API REST para cadastro e consulta de dados com validacoes.",
      briefExplanation:
        "Base de back-end para operacoes CRUD (ex.: clientes, produtos), com endpoints REST bem definidos, validacao de dados de entrada e organizacao por camadas. Projetada para ser extensivel e servir como ponto de partida para sistemas maiores.",
      highlights: [
        "Endpoints REST padronizados",
        "Validacao de dados de entrada",
        "Estrutura em camadas (controller/service/repository)",
      ],
      techBadges: ["Java", "Python", "Git"],
      demoUrl: "#",
      repoUrl: "#",
    },
  ],

  timeline: {
    education: [
      {
        title: "Engenharia de Software \u2014 3\u00BA periodo (em andamento)",
        institution: "Faculdade SENAI FATESG",
        period: "2024 \u2014 atual",
      },
      {
        title: "Operador de Suporte em Tecnologia da Informacao",
        institution: "SENAI",
        period: "2023 \u2014 2024",
      },
    ],
    experience: [
      {
        title: "Projetos proprios e academicos",
        institution: "Portfolio pessoal",
        period: "2024 \u2014 atual",
      },
    ],
  },

  contact: {
    message:
      "Quer conversar sobre vaga, estagio ou um freela? Me chama.",
    cardTitle: "Bora tirar sua ideia do papel",
    cardText:
      "Posso ajudar a construir APIs, automacoes e interfaces diretas ao ponto. Se voce tem uma vaga, freela ou um projeto em mente, me chama e eu te respondo rapido.",
    social: {
      github: "https://github.com/Davi-Fraga",
      linkedin: "https://www.linkedin.com/in/davi-kerdole-fraga-4a0b38351/",
      whatsapp: "https://wa.me/5562999699827",
      instagram: null,
    },
  },

  footer: {
    text: "Feito com Next.js + Tailwind. \u00A9 2026 Davi Fraga",
  },
} as const;

export type Profile = typeof profile;
