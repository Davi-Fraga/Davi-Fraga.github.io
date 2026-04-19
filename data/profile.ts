export const profile = {
  name: "Davi Fraga",
  headline: "Back-end Developer (Java & Python) | Front-end (HTML/CSS)",
  subheadline:
    "Construo aplicações e automações com foco em clareza, performance e boa arquitetura. Aberto a oportunidades e freelance.",

  about: {
    sectionTitle: "Sobre mim",
    sectionSubtitle: "Um pouco da minha história e motivação",
    paragraphs: [
      "Cursando Engenharia de Software na Faculdade SENAI FATESG (3\u00BA período). Meu foco é back-end com Java e Python \u2014 gosto de resolver problemas reais com código limpo e bem estruturado, criando automações e sistemas que funcionam de verdade.",
      "Também estou evoluindo no front-end (HTML/CSS) para entregar produtos completos. Acredito que um desenvolvedor versátil entrega mais valor, e é isso que busco a cada projeto.",
    ],
    highlights: [
      { label: "Back-end", value: "Java e Python" },
      { label: "Front-end", value: "HTML/CSS" },
      { label: "Ferramentas", value: "Git + VSCode/IntelliJ + Cursor AI" },
    ],
  },

  skills: {
    sectionTitle: "Habilidades",
    sectionSubtitle: "Tecnologias e ferramentas que utilizo no dia a dia",
    categories: [
      {
        category: "Back-end",
        items: ["Java", "Python"],
      },
      {
        category: "Front-end",
        items: ["HTML", "CSS", "JavaScript", "TypeScript", "Angular"],
      },
      {
        category: "Ferramentas",
        items: ["IntelliJ IDEA", "VSCode", "Git", "Cursor AI"],
      },
    ],
  },

  projects: {
    sectionTitle: "Projetos",
    sectionSubtitle: "Alguns dos projetos que desenvolvi recentemente",
    items: [
      // 1. Alma da Prata — primeiro card
      {
        title: "Sistema de Organização de Loja (Alma da Prata)",
        description:
          "Controle e organização de itens e rotinas do negócio (protótipo/gestão).",
        briefExplanation:
          "Sistema pensado para centralizar cadastros e oferecer visão geral da operação de uma loja \u2014 gerenciando itens, rotinas e organização interna. O objetivo é reduzir a desorganização do dia a dia e melhorar o controle do negócio de forma simples e acessível.",
        highlights: [
          "Cadastros de itens e categorias",
          "Visão geral da operação",
          "Operação simples e intuitiva",
        ],
        techBadges: ["Java/Python", "HTML/CSS", "Git"],
        // Demo: preencha demoUrl quando publicar a demo.
        // Opção A (recomendada): hospede no Vercel/Netlify e cole a URL aqui.
        // Opção B: crie uma rota interna /projects/alma-da-prata com screenshots
        //          e aponte demoUrl para "/projects/alma-da-prata".
        demoUrl: null,
        repoUrl: "#",
      },
      // 2. GynLog Fleet Manager — sem Demo
      {
        title: "GynLog Fleet Manager (Java Desktop)",
        description: "Sistema desktop para gestão de frotas no padrão MVC.",
        briefExplanation:
          "Aplicação desktop que gerencia veículos e rotinas operacionais de frotas \u2014 incluindo cadastros, consultas e regras de negócio. Organizado em camadas seguindo o padrão MVC, com foco em clareza de domínio e facilidade de manutenção.",
        highlights: [
          "CRUD completo de veículos e rotinas",
          "Arquitetura MVC bem definida",
          "Regras de negócio encapsuladas",
        ],
        techBadges: ["Java", "Swing", "MVC"],
        demoUrl: null,
        repoUrl: "https://github.com/lvpcdev/gynlog-fleet-manager.git",
      },
      // 3. API de Gestão — sem Demo
      {
        title: "API de Gestão (Back-end) \u2014 Java ou Python",
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
      // 4. PDV Posto de Combustível (novo, substituiu SaaS Omnichannel)
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
        title: "Engenharia de Software \u2014 3\u00BA período (em andamento)",
        institution: "Faculdade SENAI FATESG",
        period: "2024 \u2014 atual",
      },
      {
        title: "Operador de Suporte em Tecnologia da Informação",
        institution: "SENAI",
        period: "2023 \u2014 2024",
      },
    ],
    experience: [
      {
        title: "Projetos próprios e acadêmicos",
        institution: "Portfólio pessoal",
        period: "2024 \u2014 atual",
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
    text: "Feito com Next.js + Tailwind. \u00A9 2026 Davi Fraga",
  },
} as const;

export type Profile = typeof profile;
