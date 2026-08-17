export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location?: string;
  type: string;
  summary: string;
  activities: string[];
  technologies: string[];
  featuredProjectSlug?: string;
  featuredProjectTitle?: string;
}

export interface EducationItem {
  id: string;
  course: string;
  institution: string;
  period: string;
  status: string;
  description?: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: "getcoders",
    role: "Estagiário em Desenvolvimento Web",
    company: "GetCoders",
    period: "01/2026 — Atual",
    location: "Goiânia, GO",
    type: "Estágio Corporativo",
    summary:
      "Atuação no desenvolvimento de sistemas web corporativos com foco em backend resiliente, integrações seguras e interfaces dinâmicas.",
    activities: [
      "Desenvolvimento de sistemas e serviços corporativos utilizando Java 17, Spring Boot, Angular e PostgreSQL",
      "Construção e manutenção de APIs REST estruturadas em camadas com validação estrita e DTOs",
      "Desenvolvimento e evolução do Consolidador Redmine, integrando chamados de múltiplas instâncias externas com resiliência a falhas parciais",
      "Implementação de interfaces corporativas reativas com Angular Material e Fuse",
      "Mascaramento de credenciais e proteção rigorosa de API keys em logs de aplicação e payloads REST",
      "Execução de testes automatizados e resolução de gargalos de integração entre sistemas",
    ],
    technologies: [
      "Java 17",
      "Spring Boot",
      "Angular",
      "PostgreSQL",
      "JPA / Hibernate",
      "REST APIs",
      "Angular Material",
      "Maven",
      "GitLab",
    ],
    featuredProjectSlug: "redmine-consolidador",
    featuredProjectTitle: "Consolidador Redmine",
  },
];

export const educations: EducationItem[] = [
  {
    id: "senai-fatesg",
    course: "Engenharia de Software",
    institution: "Faculdade SENAI FATESG",
    period: "2024 — 2028 (Previsão)",
    status: "Em andamento",
    description:
      "Formação com ênfase em arquitetura de software, estruturas de dados, engenharia de requisitos, bancos relacionais, testes e governança de TI.",
  },
  {
    id: "senai-suporte",
    course: "Operador de Suporte Técnico em TI",
    institution: "SENAI",
    period: "2023 — 2024",
    status: "Concluído",
    description:
      "Fundamentos de infraestrutura de redes, sistemas operacionais, hardware e atendimento a incidentes.",
  },
];
