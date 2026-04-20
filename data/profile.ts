export const profile = {
  name: "Davi Fraga",
  headline: "Back-end Developer (Java & Python) | Front-end (HTML/CSS + Angular)",
  subheadline:
    "Construo aplicações e automações com foco em clareza, performance e boa arquitetura. Aberto a oportunidades e freelance.",

  about: {
    sectionTitle: "Sobre mim",
    sectionSubtitle: "Um pouco da minha história e motivação",
    paragraphs: [
      "Cursando Engenharia de Software na Faculdade SENAI FATESG (3º período). Meu foco é back-end com Java e Python — gosto de resolver problemas reais com código limpo e bem estruturado, criando automações e sistemas que funcionam de verdade.",
      "Também estou evoluindo no front-end (HTML/CSS e Angular) para entregar produtos completos. Acredito que um desenvolvedor versátil entrega mais valor, e é isso que busco a cada projeto.",
    ],
    highlights: [
      { label: "Back-end", value: "Java e Python" },
      { label: "Front-end", value: "HTML/CSS + Angular" },
      { label: "Ferramentas", value: "Git + VSCode/IntelliJ + Cursor AI" },
    ],
  },

  skills: {
    sectionTitle: "Stack & Ferramentas",
    sectionSubtitle: "Tecnologias que utilizo para construir soluções de ponta a ponta",
    sectionBadge: "Tecnologias",
    categories: [
      {
        category: "Linguagens",
        description: "Base sólida para back-end e front-end",
        items: [
          { name: "Java", primary: true },
          { name: "Python", primary: true },
          { name: "JavaScript", primary: true },
          { name: "TypeScript", primary: false },
        ],
      },
      {
        category: "Front-end",
        description: "Interfaces modernas e responsivas",
        items: [
          { name: "Angular", primary: true },
          { name: "React", primary: false },
          { name: "HTML", primary: false },
          { name: "CSS", primary: false },
        ],
      },
      {
        category: "Back-end & APIs",
        description: "Serviços robustos e escaláveis",
        items: [
          { name: "Spring Boot", primary: true },
          { name: "FastAPI", primary: false },
        ],
      },
      {
        category: "Banco de Dados",
        description: "Persistência e modelagem de dados",
        items: [
          { name: "PostgreSQL", primary: true },
          { name: "SQLite", primary: false },
          { name: "Oracle", primary: false },
        ],
      },
      {
        category: "Infra & DevOps",
        description: "Deploy, versionamento e containers",
        items: [
          { name: "Docker", primary: true },
          { name: "Git", primary: true },
          { name: "GitHub", primary: false },
          { name: "Vercel", primary: false },
        ],
      },
      {
        category: "IA & Ferramentas",
        description: "Produtividade com inteligência artificial",
        items: [
          { name: "OpenAI", primary: false },
          { name: "Claude", primary: false },
          { name: "Gemini", primary: false },
          { name: "Cursor AI", primary: true },
        ],
      },
      {
        category: "Especializado",
        description: "Ferramentas de nicho e integrações",
        items: [],
      },
    ],
  },

  projects: {
    sectionTitle: "Projetos",
    sectionSubtitle: "Alguns dos projetos que desenvolvi recentemente",
    items: [
      {
        title: "Sistema de Organização de Loja (Alma da Prata)",
        description:
          "Controle e organização de itens e rotinas do negócio (protótipo/gestão).",
        briefExplanation:
          "Sistema pensado para centralizar cadastros e oferecer visão geral da operação de uma loja — gerenciando itens, rotinas e organização interna. O objetivo é reduzir a desorganização do dia a dia e melhorar o controle do negócio de forma simples e acessível.",
        highlights: [
          "Cadastros de itens e categorias",
          "Visão geral da operação",
          "Operação simples e intuitiva",
        ],
        techBadges: ["Java/Python", "HTML/CSS", "Git"],
        demoUrl: null,
        repoUrl: "#",
      },
      {
        title: "GynLog Fleet Manager (Java Desktop)",
        description: "Sistema desktop para gestão de frotas no padrão MVC.",
        briefExplanation:
          "Aplicação desktop que gerencia veículos e rotinas operacionais de frotas — incluindo cadastros, consultas e regras de negócio. Organizado em camadas seguindo o padrão MVC, com foco em clareza de domínio e facilidade de manutenção.",
        highlights: [
          "CRUD completo de veículos e rotinas",
          "Arquitetura MVC bem definida",
          "Regras de negócio encapsuladas",
        ],
        techBadges: ["Java", "Swing", "MVC"],
        demoUrl: null,
        repoUrl: "https://github.com/lvpcdev/gynlog-fleet-manager.git",
      },
      {
        title: "API de Gestão (Back-end) — Java ou Python",
        description:
          "API REST para cadastro e consulta de dados com validações.",
        briefExplanation:
          "Base de back-end para operações CRUD (ex.: clientes, produtos), com endpoints REST bem definidos, validação de dados de entrada e organização por camadas. Projetada para ser extensível e servir como ponto de partida para sistemas maiores.",
        highlights: [
          "Endpoints REST padronizados",
          "Validação de dados de entrada",
          "Estrutura em camadas (controller/service/repository)",
        ],
        techBadges: ["Java", "Python", "Git"],
        demoUrl: null,
        repoUrl: "https://github.com/Davi-Fraga/Estagio-GetCoders.git",
      },
      {
        title: "PDV Posto de Combustível (Java Swing)",
        description:
          "Sistema desktop para gestão e abastecimento, integrado com banco de dados.",
        briefExplanation:
          "Aplicação em Java Swing focada em rotina de posto: cadastro/gestão de itens e operação de abastecimento. Persistência em banco de dados para manter registros e facilitar o controle operacional.",
        highlights: [
          "Módulos de gestão e cadastros",
          "Tela/fluxo de abastecimento",
          "Integração com banco de dados",
        ],
        techBadges: ["Java", "Swing", "JDBC", "Git"],
        demoUrl: null,
        repoUrl: "https://github.com/Davi-Fraga/pdv-posto-de-combustivel.git",
      },
    ],
  },

  timeline: {
    sectionTitle: "Experiência & Formação",
    sectionSubtitle: "Minha trajetória acadêmica e profissional",
    educationLabel: "Formação",
    experienceLabel: "Experiência",
    education: [
      {
        title: "Engenharia de Software — 3º período (em andamento)",
        institution: "Faculdade SENAI FATESG",
        period: "2024 — atual",
      },
      {
        title: "Operador de Suporte em Tecnologia da Informação",
        institution: "SENAI",
        period: "2025 — 2026",
      },
    ],
    experience: [
      {
        title: "Estagiário de Desenvolvimento",
        institution: "GetCoders",
        period: "2025 — atual",
        description:
          "Atuação em projetos de desenvolvimento back-end e front-end, aplicando boas práticas de código, versionamento com Git e metodologias ágeis. Participação em sprints, code reviews e entregas contínuas em ambiente colaborativo.",
      },
      {
        title: "Projetos próprios e acadêmicos",
        institution: "Portfólio pessoal",
        period: "2024 — atual",
        description: null,
      },
    ],
  },

  contact: {
    message:
      "Quer conversar sobre vaga, estágio ou freelance? Me chama.",
    cardTitle: "Bora tirar sua ideia do papel",
    cardText:
      "Posso ajudar a construir APIs, automações e interfaces diretas ao ponto. Se você tem uma vaga, um freelance ou um projeto em mente, me chama que eu respondo rápido.",
    whatsappLabel: "WhatsApp",
    whatsappHint: "Resposta rápida garantida",
    socialLabel: "Me encontre nas redes",
    rightCardTitle: "Contato Direto",
    rightCardText:
      "Clique no botão abaixo para iniciar uma conversa no WhatsApp e discutir seu projeto.",
    rightCardCta: "Iniciar conversa no WhatsApp",
    social: {
      github: "https://github.com/Davi-Fraga",
      linkedin: "https://www.linkedin.com/in/davi-kerdole-fraga-4a0b38351/",
      whatsapp: "https://wa.me/5562999699827",
      instagram: null,
    },
  },

  hero: {
    ctaProjects: "Ver projetos",
    ctaContact: "Falar comigo",
  },

  footer: {
    text: "Feito com Next.js + Tailwind. © 2026 Davi Fraga",
  },
} as const;

export type Profile = typeof profile;
