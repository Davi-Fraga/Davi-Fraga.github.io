export const profile = {
  name: "Menino do Trem",
  headline: "Desenvolvedor Back-end (Java & Python) | Front-end (HTML/CSS)",
  subheadline:
    "Construo aplicações e automações com foco em clareza, performance e boa arquitetura. Aberto a estágio/primeira oportunidade e freelas.",
  cvPath: "/cv.pdf",

  about: {
    paragraphs: [
      "Estudo Engenharia de Software e desenvolvo projetos práticos desde o início da graduação. Meu foco é back-end com Java e Python — gosto de resolver problemas reais com código limpo e bem estruturado, criando automações e sistemas que funcionam de verdade.",
      "Também estou evoluindo no front-end (HTML/CSS) para conseguir entregar produtos completos. Acredito que um desenvolvedor versátil entrega mais valor, e é isso que busco a cada projeto.",
    ],
    highlights: [
      { label: "Back-end", value: "Java e Python" },
      { label: "Front-end", value: "HTML/CSS" },
      { label: "Rotina", value: "Git + VSCode/IntelliJ + Cursor AI" },
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
        "Dashboard e telas para atendimento/gestão com foco em UX e organização.",
      highlights:
        "Layout consistente, componentes reutilizáveis, visão de métricas.",
      techBadges: ["Next.js", "Tailwind", "shadcn/ui"],
      demoUrl: "#",
      repoUrl: "#",
    },
    {
      title: "Automação de Mensagens com n8n",
      description:
        "Fluxos para automação e integrações (ex.: webhooks e rotinas de atendimento).",
      highlights: "Workflows, integrações, validação de entradas, logs.",
      techBadges: ["n8n", "Webhooks", "APIs"],
      demoUrl: "#",
      repoUrl: "#",
    },
    {
      title: "GynLog Fleet Manager (Java Desktop)",
      description: "Sistema desktop para gestão de frotas no padrão MVC.",
      highlights: "CRUD, organização em camadas, regras de negócio.",
      techBadges: ["Java", "Swing", "MVC"],
      demoUrl: "#",
      repoUrl: "#",
    },
    {
      title: "Sistema/Organização de Loja (Alma da Prata)",
      description:
        "Controle e organização de itens/rotinas do negócio (protótipo/gestão).",
      highlights: "Cadastros, visão geral, operação simples.",
      techBadges: ["Java/Python", "HTML/CSS", "Git"],
      demoUrl: "#",
      repoUrl: "#",
    },
  ],

  timeline: {
    education: [
      {
        title: "Engenharia de Software — 3º período (em andamento)",
        institution: "Universidade",
        period: "2024 — atual",
      },
      {
        title: "Operador de Suporte em Tecnologia da Informação",
        institution: "SENAI",
        period: "2023 — 2024",
      },
    ],
    experience: [
      {
        title: "Projetos próprios e acadêmicos",
        institution: "Portifólio pessoal",
        period: "2024 — atual",
      },
    ],
  },

  contact: {
    message:
      "Quer conversar sobre vaga, estágio ou um freela? Me chama.",
    email: "seuemail@email.com",
    github: "https://github.com/seuusuario",
    linkedin: "https://linkedin.com/in/seuusuario",
    whatsapp: "https://wa.me/5500000000000",
  },

  footer: {
    text: "Feito com Next.js + Tailwind.",
  },
} as const;

export type Profile = typeof profile;
