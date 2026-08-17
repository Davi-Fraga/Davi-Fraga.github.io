export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "backend",
    name: "Backend",
    description: "APIs RESTful, arquitetura em camadas, injeção de dependência e persistência",
    skills: [
      "Java",
      "Spring Boot",
      "Node.js",
      "NestJS",
      "Express",
      "REST APIs",
      "JPA / Hibernate",
      "Prisma",
    ],
  },
  {
    id: "frontend",
    name: "Frontend",
    description: "Aplicações web reativas, tipadas, componentizadas e acessíveis",
    skills: [
      "TypeScript",
      "React",
      "Next.js",
      "Angular",
      "Tailwind CSS",
      "Angular Material",
    ],
  },
  {
    id: "database",
    name: "Banco de Dados",
    description: "Modelagem relacional, caching em memória, otimização e controle de acesso",
    skills: [
      "PostgreSQL",
      "Supabase",
      "MySQL",
      "Redis",
      "SQL",
      "RLS",
    ],
  },
  {
    id: "devops",
    name: "DevOps & Ferramentas",
    description: "Conteinerização, orquestração, servidores web e controle de versão",
    skills: [
      "Docker",
      "Docker Compose",
      "Caddy",
      "VPS",
      "Vercel",
      "Git",
      "GitHub",
      "GitLab",
    ],
  },
  {
    id: "quality",
    name: "Quality Engineering",
    description: "Pirâmide de testes, cobertura de código e testes end-to-end",
    skills: [
      "Vitest",
      "Playwright",
      "JUnit",
      "Testing Library",
      "Testes Unitários",
      "Testes de Integração",
      "Testes E2E",
    ],
  },
  {
    id: "security",
    name: "Segurança",
    description: "Políticas de autorização, defesa em profundidade e blindagem de dados",
    skills: [
      "RBAC",
      "RLS",
      "Autorização",
      "Proteção contra IDOR",
      "Gestão de credenciais",
    ],
  },
];
