export const profile = {
  name: "Davi Fraga",
  role: "Desenvolvedor Full Stack | Engenharia de Software",
  roleShort: "Full Stack Developer",
  statusBadge: "Disponível para oportunidades em Desenvolvimento de Software",
  headline: "Desenvolvedor Full Stack | Engenharia de Software",
  subheadline:
    "Desenvolvo aplicações web, APIs e sistemas corporativos com Java, TypeScript, React, Angular, Node.js, PostgreSQL e Docker, com foco em arquitetura, segurança, testes automatizados e qualidade de software.",

  strategicTechs: [
    "Java",
    "Spring Boot",
    "TypeScript",
    "Node.js",
    "NestJS",
    "React",
    "Next.js",
    "Angular",
    "PostgreSQL",
    "Docker",
  ],

  metrics: [
    {
      value: "578+",
      label: "Testes automatizados",
      detail: "Cobertura de API e Web no Gestão LGND",
    },
    {
      value: "1.000+",
      label: "Processos validados",
      detail: "Ingestão e testes na plataforma jurídica",
    },
    {
      value: "226+",
      label: "Registros reais",
      detail: "Operações ativas em produção",
    },
    {
      value: "5",
      label: "Containers em produção",
      detail: "Infraestrutura em VPS próprio",
    },
  ],

  about: {
    sectionTitle: "Sobre mim",
    sectionSubtitle: "Engenharia de software, background técnico e princípios de desenvolvimento",
    paragraphs: [
      "Sou estudante de Engenharia de Software e desenvolvedor Full Stack, com experiência prática no desenvolvimento de sistemas corporativos, aplicações web e APIs.",
      "Trabalho principalmente com Java/Spring Boot e TypeScript, utilizando tecnologias como NestJS, React, Next.js e Angular, além de PostgreSQL e Docker.",
      "Tenho interesse especial por arquitetura de software, backend, segurança, qualidade de código, bancos relacionais e testes automatizados.",
      "Já participei do desenvolvimento de sistemas corporativos corporativos (como no estágio na GetCoders) e também construí aplicações próprias implantadas em produção real.",
    ],
    principles: [
      {
        title: "Arquitetura & Resiliência",
        description: "Sistemas modulares com tratamento explícito de falhas parciais e separação limpa de responsabilidades.",
      },
      {
        title: "Segurança em Primeiro Lugar",
        description: "Proteção contra IDOR, Row Level Security (RLS) no banco de dados e sanitização estrita de credenciais.",
      },
      {
        title: "Quality Engineering",
        description: "Testes automatizados em múltiplas camadas (unitários, integração e E2E) como garantia de evolução contínua.",
      },
    ],
  },

  links: {
    github: "https://github.com/Davi-Fraga",
    linkedin: "https://www.linkedin.com/in/davi-kerdole-fraga-4a0b38351/",
    whatsapp: "https://wa.me/5562999699827",
    email: "fragadavi30@gmail.com",
    resumeUrl: "/curriculo-davi-fraga.pdf",
  },

  contact: {
    title: "Vamos conversar?",
    subtitle:
      "Estou aberto a oportunidades em desenvolvimento de software, estágio e projetos de tecnologia. Se quiser conversar sobre uma vaga, projeto ou colaboração, entre em contato.",
    channels: {
      email: "fragadavi30@gmail.com",
      linkedin: "https://www.linkedin.com/in/davi-kerdole-fraga-4a0b38351/",
      github: "https://github.com/Davi-Fraga",
      whatsapp: "https://wa.me/5562999699827",
    },
  },

  footer: {
    role: "Software Developer",
    note: "Desenvolvido por Davi Fraga com foco em performance e engenharia.",
  },
} as const;

export type Profile = typeof profile;
