export interface ProjectMetric {
  label: string;
  value: string;
  description?: string;
}

export interface ArchitectureNode {
  step: string;
  title: string;
  description: string;
  tech: string;
}

export interface ProjectCaseStudy {
  context: string;
  problem: string;
  solution: string;
  architecture: {
    overview: string;
    flow: ArchitectureNode[];
  };
  engineeringDecisions: {
    decision: string;
    rationale: string;
  }[];
  challengesAndSolutions: {
    challenge: string;
    solution: string;
  }[];
  security: string[];
  testing: {
    description: string;
    metrics?: string[];
  };
  infrastructure: string[];
  results: string[];
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: string;
  status: "Produto em produção" | "Em desenvolvimento" | "Concluído" | "Case Técnico";
  featured: boolean;
  isEngineeringCase?: boolean;
  corporateContext?: string;
  summary: string;
  technologies: string[];
  primaryTechs: string[];
  metrics: ProjectMetric[];
  highlights: string[];
  githubUrl?: string;
  demoUrl?: string;
  caseStudy: ProjectCaseStudy;
}

export const projects: Project[] = [
  {
    id: "gestao-lgnd",
    slug: "gestao-lgnd",
    title: "Gestão LGND — Central da Manada",
    tagline: "Plataforma full stack centralizada para gestão de operações, equipes e registros",
    category: "Full Stack • Backend • DevOps",
    status: "Produto em produção",
    featured: true,
    summary:
      "Plataforma corporativa full stack desenvolvida e implantada em VPS para centralizar operações, usuários, equipes e dados organizacionais com alta confiabilidade e segurança.",
    technologies: [
      "NestJS",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "BullMQ",
      "Docker",
      "Caddy",
      "VPS",
    ],
    primaryTechs: ["NestJS", "Next.js", "PostgreSQL", "Docker", "Redis", "Prisma"],
    metrics: [
      { value: "578", label: "Testes automatizados", description: "456 de API e 122 Web" },
      { value: "226+", label: "Registros operacionais", description: "Dados reais em produção" },
      { value: "5", label: "Containers Docker", description: "Cluster em VPS próprio" },
      { value: "~140", label: "Entidades padronizadas", description: "Modelagem relacional" },
    ],
    highlights: [
      "Arquitetura em monorepo separando API NestJS e frontend Next.js",
      "Infraestrutura conteinerizada com 5 containers orquestrados e deploy em VPS com reverse proxy Caddy",
      "Controle de acesso baseado em papéis (RBAC) e proteção estrita contra vulnerabilidades de autorização (IDOR)",
      "Ingestão assíncrona com Redis + BullMQ para processar webhooks do Google Forms",
      "Serviço de geolocalização integrado com OpenStreetMap / Nominatim com cache e rate limiting",
      "Cobertura de 578 testes automatizados (456 de API e 122 web)",
    ],
    githubUrl: "",
    demoUrl: "",
    caseStudy: {
      context:
        "A organização necessitava de uma plataforma unificada e confiável para centralizar a gestão de membros, equipes, formulários dinâmicos e registros operacionais dispersos em planilhas e formulários sem sincronização.",
      problem:
        "A descentralização das informações causava inconsistência de dados, ausência de auditoria de acessos, perda de histórico operacional e alto custo de processamento manual na consolidação de cadastros.",
      solution:
        "Desenvolvimento de uma plataforma full stack moderna com backend desacoplado em NestJS, frontend reativo em Next.js, banco relacional PostgreSQL com Prisma ORM e processamento em segundo plano com filas Redis/BullMQ, conteinerizado em Docker.",
      architecture: {
        overview:
          "Frontend Next.js se comunica com a API RESTful NestJS sob autenticação JWT com RBAC. O backend delega tarefas pesadas (webhooks, geocodificação, notificações) para filas BullMQ suportadas por Redis, persistindo o estado normalizado no PostgreSQL.",
        flow: [
          {
            step: "01",
            title: "Frontend Next.js",
            description: "SPA/SSR reativo com interfaces tipadas, controle de permissões por tela e formulários validados com Zod.",
            tech: "Next.js / TypeScript",
          },
          {
            step: "02",
            title: "Reverse Proxy & TLS",
            description: "Caddy Server gerenciando terminação SSL/TLS automática e balanceamento de rotas para os containers.",
            tech: "Caddy / Docker",
          },
          {
            step: "03",
            title: "Core API NestJS",
            description: "Camada de domínio com injeção de dependências, guards de autenticação/RBAC, sanitização e interceptors.",
            tech: "NestJS / Express",
          },
          {
            step: "04",
            title: "Filas Assíncronas & Cache",
            description: "BullMQ com Redis para processamento de webhooks externos (Google Forms), throttling e cache de geolocalização.",
            tech: "BullMQ / Redis",
          },
          {
            step: "05",
            title: "Persistência Relacional",
            description: "PostgreSQL com migrations estruturadas via Prisma ORM, índices otimizados e relacionamentos normalizados.",
            tech: "PostgreSQL / Prisma",
          },
        ],
      },
      engineeringDecisions: [
        {
          decision: "Adoção de NestJS no backend",
          rationale:
            "Arquitetura modular fortemente tipada inspirada em Angular/Spring, facilitando injeção de dependências, separação de controllers, services, guards e pipes de validação.",
        },
        {
          decision: "Processamento com BullMQ + Redis",
          rationale:
            "Isolamento da recepção de webhooks para garantir resposta imediata (HTTP 200) e execução resiliente com retry adaptativo e controle de concorrência.",
        },
        {
          decision: "Infraestrutura com Docker + Caddy em VPS",
          rationale:
            "Independência de vendor lock-in, reprodutibilidade exata entre ambientes de desenvolvimento e produção com consumo previsível de recursos.",
        },
      ],
      challengesAndSolutions: [
        {
          challenge: "Risco de IDOR e vazamento de dados entre equipes",
          solution:
            "Implementação de Guards e Interceptors no NestJS que validam dinamicamente se o usuário autenticado possui ownership ou permissão explícita sobre a entidade requisitada.",
        },
        {
          challenge: "Taxa limite da API pública de geolocalização (Nominatim)",
          solution:
            "Camada de cache em memória/Redis com normalização de endereços e limitador de taxa (throttling) na fila de processamento.",
        },
        {
          challenge: "Inconsistência em envios de formulários externos",
          solution:
            "Schema validation rigoroso via Zod/class-validator antes da ingestão na fila, registrando dead-letter queues para inspeção e auditoria.",
        },
      ],
      security: [
        "Autenticação via JWT com rotação de tokens",
        "Role-Based Access Control (RBAC) com validação em nível de rota e de entidade (prevenção de IDOR)",
        "Sanitização de inputs contra injeção SQL e XSS",
        "Headers de segurança HTTP (CORS restrito, CSP, HSTS via Caddy)",
        "Armazenamento seguro de segredos em variáveis de ambiente isoladas nos containers Docker",
      ],
      testing: {
        description:
          "Suite completa de testes unitários e de integração cobrindo fluxos de autenticação, permissões RBAC, services de negócio e webhooks.",
        metrics: [
          "578 testes automatizados no total",
          "456 testes de integração e unitários de API no NestJS",
          "122 testes de componentes e fluxos de tela no Next.js",
        ],
      },
      infrastructure: [
        "5 Containers Docker (API, Frontend, PostgreSQL, Redis, Worker)",
        "Docker Compose estruturado com networks isoladas",
        "Caddy como Reverse Proxy com certificado TLS automático",
        "Deploy automatizado em VPS Linux",
      ],
      results: [
        "Mais de 226 registros operacionais cadastrados e gerenciados em produção",
        "Aproximadamente 140 entidades padronizadas no modelo de dados",
        "Redução de 100% no retrabalho de reconciliação manual de formulários",
        "Sistema em produção com alta disponibilidade e tempo de resposta < 150ms",
      ],
    },
  },
  {
    id: "redmine-consolidador",
    slug: "redmine-consolidador",
    title: "Consolidador Redmine",
    tagline: "Sistema corporativo para unificação e consolidação de atividades de múltiplas instâncias Redmine",
    category: "Sistema Corporativo • Backend • Integração",
    status: "Concluído",
    featured: true,
    corporateContext: "GetCoders — Estágio em Desenvolvimento Web",
    summary:
      "Sistema corporativo desenvolvido durante minha experiência na GetCoders para consolidação centralizada de atividades provenientes de múltiplas instâncias Redmine com alta tolerância a falhas parciais.",
    technologies: [
      "Java 17",
      "Spring Boot",
      "Angular",
      "PostgreSQL",
      "Angular Material",
      "JPA/Hibernate",
      "Maven",
    ],
    primaryTechs: ["Java 17", "Spring Boot", "Angular", "PostgreSQL", "JPA/Hibernate"],
    metrics: [
      { value: "Multi-instância", label: "Conexões Redmine", description: "Consolidação paralela" },
      { value: "Zero Downtime", label: "Tolerância a Falhas", description: "Execução resiliente" },
      { value: "100%", label: "Mascaramento de Credenciais", description: "Segurança de logs/APIs" },
    ],
    highlights: [
      "Desenvolvido no contexto corporativo da GetCoders para gestão e consolidação de chamados",
      "Integração resiliente com múltiplas instâncias Redmine via REST APIs protegidas",
      "Tratamento de falhas parciais: o sistema continua as consultas mesmo quando uma das instâncias externas está inacessível",
      "Deduplicação de registros e normalização de entidades em banco PostgreSQL",
      "Proteção de API keys e mascaramento estrito de credenciais em logs e payloads JSON",
      "Arquitetura em camadas com Spring Boot (Controller, Service, Repository, DTOs)",
    ],
    githubUrl: "",
    demoUrl: "",
    caseStudy: {
      context:
        "Na GetCoders, equipes multidisciplinares precisavam acompanhar demandas e apontamentos distribuídos em múltiplos servidores Redmine independentes de diferentes clientes.",
      problem:
        "Consultar manualmente cada instância Redmine consumia tempo excessivo, impedia visibilidade consolidada de horas e produtividade, e deixava as equipes vulneráveis a indisponibilidades parciais de rede.",
      solution:
        "Construção de uma aplicação corporativa com backend Java 17 / Spring Boot e frontend Angular para consumir paralelamente as APIs do Redmine, deduplicar apontamentos e fornecer um dashboard unificado.",
      architecture: {
        overview:
          "O frontend Angular consome a API do Spring Boot. O backend orquestra chamadas HTTP assíncronas/paralelas às instâncias Redmine cadastradas, filtra e normaliza os dados no PostgreSQL e entrega relatórios consolidados.",
        flow: [
          {
            step: "01",
            title: "Frontend Angular",
            description: "Interface corporativa desenvolvida com Angular Material/Fuse, com filtros avançados por período, desenvolvedor e projeto.",
            tech: "Angular / TypeScript",
          },
          {
            step: "02",
            title: "Spring Security & Controllers",
            description: "Endpoints REST seguros com validação de escopo e payload DTO imutável.",
            tech: "Spring Boot / Java 17",
          },
          {
            step: "03",
            title: "Integration & Resilience Service",
            description: "Cliente HTTP com pool de conexões, timeouts dedicados e captura de exceções para falhas parciais.",
            tech: "Spring RestTemplate / WebClient",
          },
          {
            step: "04",
            title: "Deduplication & Data Layer",
            description: "Normalização e deduplicação de tarefas antes da persistência no banco PostgreSQL.",
            tech: "Spring Data JPA / Hibernate",
          },
        ],
      },
      engineeringDecisions: [
        {
          decision: "Uso de Java 17 e Spring Boot",
          rationale:
            "Robustez tipada, ecossistema maduro para integração corporativa, excelente suporte a concorrência e facilidade de manutenção a longo prazo.",
        },
        {
          decision: "Estratégia de Resiliência a Falhas Parciais",
          rationale:
            "Se um dos 4 servidores Redmine estiver fora do ar ou lento, a consulta não aborta: retorna os dados disponíveis com indicador visual de status para o usuário.",
        },
        {
          decision: "Camada rigorosa de DTOs e Sanitização",
          rationale:
            "Garantir que chaves de API nunca transitem para o cliente ou sejam expostas em logs acidentais de stack trace.",
        },
      ],
      challengesAndSolutions: [
        {
          challenge: "Formatos e campos customizados divergentes entre versões do Redmine",
          solution:
            "Criou-se uma camada de adaptadores (Adapter Pattern) que normaliza as respostas de diferentes versões para um modelo de domínio padronizado.",
        },
        {
          challenge: "Segurança e segregação de credenciais",
          solution:
            "Armazenamento de tokens com criptografia em repouso e mascaramento automático através de custom Serializers no Jackson.",
        },
      ],
      security: [
        "Mascaramento de API Keys e credenciais nos logs da aplicação e respostas HTTP",
        "Armazenamento seguro de credenciais das instâncias externas",
        "Validação estrita de entradas com Bean Validation",
        "Proteção contra CSRF e CORS configurado restritivamente",
      ],
      testing: {
        description:
          "Testes unitários e de integração com JUnit e Mockito validando parsers de dados, lógica de consolidação e resiliência a timeouts.",
        metrics: [
          "Testes de integração com MockRestServiceServer simulando instâncias fora do ar",
          "Cobertura de regras de deduplicação e cálculo de horas",
        ],
      },
      infrastructure: [
        "Backend conteinerizado com OpenJDK 17",
        "Banco de dados PostgreSQL com migrations gerenciadas",
        "Integração contínua e build automatizado com Maven",
      ],
      results: [
        "Unificação do acompanhamento operacional de múltiplos clientes em uma única interface",
        "Redução do tempo de extração de relatórios de horas de horas para segundos",
        "Sistema estável em uso interno na empresa",
      ],
    },
  },
  {
    id: "projeto-oab",
    slug: "projeto-oab",
    title: "Plataforma de Gestão Jurídica",
    tagline: "Engenharia de dados e ingestão automatizada de processos judiciais via DataJud e DJEN",
    category: "Backend • Data Engineering • Integração de APIs",
    status: "Em desenvolvimento",
    featured: true,
    summary:
      "Plataforma de engenharia de dados jurídicos com ingestão automatizada, validação de numeração única CNJ e integração resiliente com APIs públicas do Conselho Nacional de Justiça.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "Neon",
      "Auth.js",
      "DataJud",
      "DJEN",
    ],
    primaryTechs: ["TypeScript", "Next.js", "Prisma", "PostgreSQL / Neon", "DataJud API"],
    metrics: [
      { value: "1.000+", label: "Processos validados", description: "Casos reais de teste" },
      { value: "5", label: "Tribunais integrados", description: "Normalização multijurisdicional" },
      { value: "100%", label: "Ingestão Idempotente", description: "Deduplicação por hash" },
    ],
    highlights: [
      "Integração direta com APIs oficiais do CNJ: DataJud e Diário de Justiça Eletrônico Nacional (DJEN)",
      "Ingestão automatizada com validação algorítmica de numeração única CNJ (módulo 97)",
      "Mais de 1.000 processos reais validados em testes cobrindo dados de cinco tribunais distintos",
      "Mecanismo de resiliência com backoff adaptativo e tratamento estrito de HTTP 429 (Rate Limit)",
      "Deduplicação de movimentações por hash criptográfico e ingestão idempotente",
      "Tratamento avançado de inconsistências de timezone entre tribunais e normalização de dados",
    ],
    githubUrl: "",
    demoUrl: "",
    caseStudy: {
      context:
        "Advogados e escritórios jurídicos necessitam monitorar publicações e movimentações processuais diárias em múltiplos tribunais sem depender de conferências manuais morosas.",
      problem:
        "As APIs públicas de tribunais e do CNJ possuem limites estritos de requisições, frequentes respostas HTTP 429 (Too Many Requests), variações de payload entre diferentes estados e falta de padronização de fusos horários.",
      solution:
        "Construção de um pipeline de ingestão e normalização de dados jurídicos com backoff exponencial adaptativo, validação rigorosa de números CNJ e persistência idempotente no PostgreSQL Neon.",
      architecture: {
        overview:
          "O pipeline recebe números de processos ou termos de busca, valida a chave CNJ, executa requisições com rate-limiting inteligente contra o DataJud/DJEN, computa hashes de movimentações para evitar duplicações e armazena em banco relacional.",
        flow: [
          {
            step: "01",
            title: "Validation Layer",
            description: "Validação matemática de dígito verificador CNJ (ISO 7064 Mod 97-10) antes de qualquer requisição externa.",
            tech: "TypeScript / Zod",
          },
          {
            step: "02",
            title: "Resilient Ingestion Engine",
            description: "Cliente HTTP com controle de concorrência, jitter aleatório e backoff exponencial para respeitar limites do CNJ.",
            tech: "Fetch API / Adaptive Backoff",
          },
          {
            step: "03",
            title: "Hash Deduplication",
            description: "Cálculo de SHA-256 sobre a tupla (tribunal, processo, data, conteúdo) para garantir idempotência em re-execuções.",
            tech: "Crypto / TypeScript",
          },
          {
            step: "04",
            title: "Timezone Normalizer & DB",
            description: "Conversão uniforme de datas para UTC e persistência relacional com Prisma no PostgreSQL Neon serverless.",
            tech: "Prisma / PostgreSQL Neon",
          },
        ],
      },
      engineeringDecisions: [
        {
          decision: "Validação CNJ local prévia",
          rationale:
            "Evita consumir quota de requisições externas com números inválidos ou mal digitados através do cálculo do módulo 97 no próprio backend.",
        },
        {
          decision: "Ingestão Idempotente via Hash SHA-256",
          rationale:
            "Permite re-executar rotinas de coleta sem gerar registros duplicados de movimentações ou publicações judiciais.",
        },
        {
          decision: "Uso de PostgreSQL serverless no Neon",
          rationale:
            "Escalabilidade automática de computação com suporte nativo a branching de banco para ambientes de homologação e testes.",
        },
      ],
      challengesAndSolutions: [
        {
          challenge: "Respostas frequentes de HTTP 429 (Rate Limiting) das APIs do CNJ",
          solution:
            "Implementação de um algoritmo de Token Bucket com Backoff Adaptativo que desacelera progressivamente e retenta com jitter quando detecta saturação.",
        },
        {
          challenge: "Diferenças de fuso horário entre tribunais (ex: TJSP vs TJAM)",
          solution:
            "Normalização em pipeline para ISO 8601 UTC com preservação da zona de origem como metadado adicional.",
        },
      ],
      security: [
        "Autenticação de usuários via Auth.js com sessões seguras",
        "Segregação de dados de clientes por workspace",
        "Tratamento de dados em conformidade com sigilo profissional e LGPD",
      ],
      testing: {
        description:
          "Bateria de testes automatizados com datasets de mais de 1.000 processos reais anonimizados em 5 tribunais.",
        metrics: [
          "1.000+ processos reais testados no pipeline",
          "Testes de validação de dígito verificador CNJ cobrindo 100% dos ramos da justiça",
        ],
      },
      infrastructure: [
        "PostgreSQL gerenciado no Neon com pooling de conexões",
        "Deploy serverless no Vercel com edge caching",
        "Monitoramento e alertas de taxa de erro de integração",
      ],
      results: [
        "Pipeline capaz de ingerir dados com 100% de consistência e zero duplicações",
        "Suporte comprovado a dados de 5 tribunais distintos com estruturas heterogêneas",
        "Processamento resiliente mesmo durante oscilações das APIs de origem",
      ],
    },
  },
  {
    id: "fluxocorreto",
    slug: "fluxocorreto",
    title: "FluxoCorreto",
    tagline: "SaaS de gestão financeira e fluxo de caixa com forte rigor de regras contábeis e testes",
    category: "SaaS Financeiro • Full Stack • Quality Engineering",
    status: "Concluído",
    featured: true,
    summary:
      "SaaS financeiro com isolamento temporal de lançamentos, conciliação e garantia de integridade matemática, validado por uma robusta suíte de 216 testes automatizados.",
    technologies: [
      "React",
      "TypeScript",
      "Vite",
      "Supabase",
      "PostgreSQL",
      "TanStack Query",
      "Zod",
      "Playwright",
      "Vitest",
    ],
    primaryTechs: ["React", "TypeScript", "Supabase", "PostgreSQL", "Playwright", "Zod"],
    metrics: [
      { value: "216", label: "Testes automatizados", description: "Unitários, integração e E2E" },
      { value: "53", label: "Arquivos de teste", description: "Alta cobertura de cenários" },
      { value: "100%", label: "Prevenção de Dupla Contagem", description: "Regras financeiras estritas" },
    ],
    highlights: [
      "Gestão de fluxo de caixa, conciliação de lançamentos e relatórios financeiros dinâmicos",
      "Modelagem contábil com prevenção estrita de dupla contagem e isolamento temporal de saldos",
      "216 testes automatizados distribuídos em 53 arquivos de teste cobrindo fluxos críticos",
      "Testes End-to-End (E2E) completos implementados com Playwright",
      "Validação estrita de schemas em runtime com Zod e tipagem estática ponta a ponta",
      "Camada de dados otimizada com TanStack Query para cache e sincronização reativa",
    ],
    githubUrl: "",
    demoUrl: "",
    caseStudy: {
      context:
        "Micro e pequenas empresas enfrentam erros contábeis constantes ao projetar saldos futuros devido a lançamentos retroativos e conciliações inconsistentes.",
      problem:
        "Erros de arredondamento, dupla contagem de transferências entre contas e alterações em datas passadas sem recálculo em cascata distorcem a realidade financeira.",
      solution:
        "Construção de uma aplicação reativa em React e Supabase com motor de cálculo financeiro determinístico, garantido por testes de regressão automatizados e schemas Zod.",
      architecture: {
        overview:
          "O frontend React gerencia o estado com TanStack Query para mutações otimistas. O backend no PostgreSQL/Supabase aplica triggers e RLS para persistência imutável de transações financeiras.",
        flow: [
          {
            step: "01",
            title: "Financial Calculation Engine",
            description: "Módulo puro e desacoplado para soma, amortização, conciliação e projeção temporal com precisão em centavos.",
            tech: "TypeScript / Vitest",
          },
          {
            step: "02",
            title: "Client State & Caching",
            description: "TanStack Query gerenciando cache, revalidações inteligentes e mutações com rollback automático em falhas.",
            tech: "React / TanStack Query",
          },
          {
            step: "03",
            title: "Strict Validation Layer",
            description: "Zod validando todas as entradas de formulários e contratos de API em tempo de execução.",
            tech: "Zod / React Hook Form",
          },
          {
            step: "04",
            title: "Persistent Layer & RLS",
            description: "PostgreSQL com Row Level Security segregando dados de cada organização financeira.",
            tech: "PostgreSQL / Supabase",
          },
        ],
      },
      engineeringDecisions: [
        {
          decision: "Priorização de Quality Engineering com 216 testes",
          rationale:
            "Em sistemas financeiros, um bug em cálculo de saldo destrói a confiança do usuário. Cobriu-se unitariamente todo o motor de regras e E2E os fluxos de caixa.",
        },
        {
          decision: "Armazenamento monetário em inteiros (centavos)",
          rationale:
            "Evita problemas clássicos de imprecisão de ponto flutuante em JavaScript (IEEE 754).",
        },
        {
          decision: "Isolamento temporal de saldos com recálculo determinístico",
          rationale:
            "Garante que inserções ou exclusões com datas passadas reajustem de forma consistente todos os saldos subsequentes.",
        },
      ],
      challengesAndSolutions: [
        {
          challenge: "Dupla contagem em transferências entre contas da mesma empresa",
          solution:
            "Modelagem de transferência como evento atômico de débito e crédito linkados, com validação no motor de regras.",
        },
        {
          challenge: "Lentidão em renderização de extratos longos",
          solution:
            "Virtualização de listas e paginação baseada em cursor com TanStack Query.",
        },
      ],
      security: [
        "Row Level Security (RLS) no PostgreSQL garantindo isolamento total entre tenants",
        "Políticas de acesso estritas para dados sensíveis de faturamento",
        "Proteção contra manipulação de valores no frontend via validação de backend",
      ],
      testing: {
        description:
          "Pirâmide de testes bem estruturada com Vitest para regras unitárias, Testing Library para componentes e Playwright para cenários E2E.",
        metrics: [
          "216 testes automatizados",
          "53 arquivos de teste",
          "Testes E2E de conciliação bancária completa",
        ],
      },
      infrastructure: [
        "Hospedagem no Vercel",
        "Supabase como Backend-as-a-Service com PostgreSQL",
        "CI/CD executando suíte de testes a cada pull request",
      ],
      results: [
        "Precisão financeira de 100% em cenários de lançamentos retroativos",
        "Cobertura de testes preventiva contra quebra de regras de negócio",
        "Interface rápida com carregamento instantâneo de dashboards financeiros",
      ],
    },
  },
  {
    id: "coligacao-2026",
    slug: "coligacao-2026",
    title: "Coligação 2026",
    tagline: "Engenharia de segurança, arquitetura multi-tenant e Row Level Security avançado no PostgreSQL",
    category: "Security Engineering • PostgreSQL • Multi-tenant",
    status: "Case Técnico",
    featured: false,
    isEngineeringCase: true,
    summary:
      "Case técnico focado em engenharia de segurança de banco de dados, isolamento de dados com PostgreSQL Row Level Security (RLS) avançado e resolução de políticas recursivas em arquitetura multi-perfil.",
    technologies: [
      "React",
      "Supabase",
      "PostgreSQL",
      "Supabase Auth",
      "Realtime",
      "Tailwind CSS",
    ],
    primaryTechs: ["PostgreSQL", "RLS", "Supabase Auth", "SECURITY DEFINER", "SQL"],
    metrics: [
      { value: "100%", label: "Isolamento Multi-tenant", description: "Blindagem via RLS" },
      { value: "Zero", label: "Recursões de Policy", description: "Funções SECURITY DEFINER" },
      { value: "Multi-perfil", label: "Controle de Acesso", description: "Hierarquia de permissões" },
    ],
    highlights: [
      "Implementação de políticas avançadas de Row Level Security (RLS) no PostgreSQL",
      "Isolamento completo de dados entre diretórios, comissões e candidatos",
      "Resolução de problemas clássicos de recursividade infinita em policies do PostgreSQL usando funções SECURITY DEFINER",
      "Modelagem multi-perfil (SuperAdmin, Coordenador, Voluntário) com permissões granulares",
      "Testes automatizados de autorização comprovando prevenção de vazamento de dados entre perfis",
    ],
    githubUrl: "",
    demoUrl: "",
    caseStudy: {
      context:
        "Aplicações eleitorais e de campanhas políticas manipulam dados estratégicos de múltiplos comitês que compartilham a mesma base de dados, exigindo garantia matemática de que um comitê não acesse dados de outro.",
      problem:
        "Erros comuns de autorização em nível de aplicação (IDOR) ou vazamentos por falhas em queries podem expor dados confidenciais se a segurança depender exclusivamente de filtros manuais `WHERE tenant_id = ?` no backend.",
      solution:
        "Transferência da responsabilidade de autorização para o motor do PostgreSQL através de Row Level Security (RLS) rígido, complementado por funções auxiliares `SECURITY DEFINER` e triggers de integridade.",
      architecture: {
        overview:
          "Cada requisição ao banco carrega o contexto do usuário autenticado (`auth.uid()`). As policies de RLS avaliam dinamicamente o vínculo do usuário com a organização, bloqueando leituras ou gravações não autorizadas diretamente no nível do storage engine.",
        flow: [
          {
            step: "01",
            title: "Identity Context",
            description: "Autenticação gera JWT contendo UID e claims que são injetados na sessão da transação PostgreSQL.",
            tech: "Supabase Auth / JWT",
          },
          {
            step: "02",
            title: "Security Definer Functions",
            description: "Funções SQL otimizadas com cache de sessão que resolvem hierarquias de papéis sem disparar recursão de policies.",
            tech: "PL/pgSQL / SECURITY DEFINER",
          },
          {
            step: "03",
            title: "Row Level Security (RLS)",
            description: "Políticas FOR SELECT, INSERT, UPDATE, DELETE aplicadas automaticamente a cada consulta do banco.",
            tech: "PostgreSQL RLS",
          },
          {
            step: "04",
            title: "Realtime Subscription Isolation",
            description: "Sincronização em tempo real respeitando estritamente o filtro de segurança de cada tenant.",
            tech: "PostgreSQL Realtime",
          },
        ],
      },
      engineeringDecisions: [
        {
          decision: "Segurança delegada ao PostgreSQL (Defense in Depth)",
          rationale:
            "Mesmo que haja um bug em qualquer camada de frontend ou API, o banco recusa consultas a linhas pertencentes a outro tenant.",
        },
        {
          decision: "Uso de SECURITY DEFINER com search_path fixo",
          rationale:
            "Evita ataques de hijacking de search_path e quebra loops recursivos de consulta de papéis dentro das próprias policies de RLS.",
        },
      ],
      challengesAndSolutions: [
        {
          challenge: "Recursão infinita de políticas RLS ao consultar tabelas de permissão",
          solution:
            "Criação de funções PL/pgSQL com `SECURITY DEFINER` e `SET search_path = public` para verificação de permissões em tempo constante.",
        },
        {
          challenge: "Performance de consultas com RLS sob alto volume",
          solution:
            "Criação de índices compostos alinhados com as colunas avaliadas nas cláusulas `USING` e `WITH CHECK`.",
        },
      ],
      security: [
        "Isolamento multi-tenant garantido nativamente no banco",
        "Políticas granulares para SELECT, INSERT, UPDATE, DELETE",
        "Prevenção contra SQL Injection e privilege escalation",
        "Proteção contra políticas recursivas",
      ],
      testing: {
        description:
          "Testes de segurança executados com múltiplos tokens de diferentes perfis validando se tentativas de consulta a dados alheios retornam zero registros ou erro de permissão.",
        metrics: [
          "100% dos cenários de invasão horizontal e vertical bloqueados",
          "Testes automatizados de regressão em todas as policies",
        ],
      },
      infrastructure: [
        "PostgreSQL com extensão de Realtime e RLS",
        "Backups contínuos com Point-in-Time Recovery",
      ],
      results: [
        "Arquitetura blindada contra ataques IDOR e vazamentos multi-tenant",
        "Modelo de segurança reutilizável para qualquer sistema corporativo complexo",
      ],
    },
  },
  {
    id: "landing-flamengo",
    slug: "landing-flamengo",
    title: "Landing Page Flamengo",
    tagline: "Showcase de creative frontend com renderização 3D, WebGL e animações orquestradas",
    category: "Creative Frontend • 3D • Motion",
    status: "Case Técnico",
    featured: false,
    isEngineeringCase: true,
    summary:
      "Experiência visual de alto impacto explorando renderização 3D em tempo real com Three.js/React Three Fiber, animações de scroll com GSAP e rolagem suave com Lenis.",
    technologies: [
      "Next.js",
      "Three.js",
      "React Three Fiber",
      "GSAP",
      "ScrollTrigger",
      "Lenis",
      "Tailwind CSS",
    ],
    primaryTechs: ["Three.js", "React Three Fiber", "GSAP", "ScrollTrigger", "Lenis", "Next.js"],
    metrics: [
      { value: "60 FPS", label: "Renderização Fluida", description: "Otimização de shaders/geometrias" },
      { value: "100%", label: "Acessibilidade Motion", description: "Respeito a prefers-reduced-motion" },
      { value: "Lazy", label: "Carregamento de Assets", description: "Suspense e progressive load" },
    ],
    highlights: [
      "Integração de cenas 3D interativas utilizando React Three Fiber e Drei",
      "Animações orquestradas sincronizadas com o scroll através de GSAP ScrollTrigger",
      "Rolagem inercial suave com Lenis Scroll",
      "Otimização rigorosa de draw calls, geometrias e texturas para manter 60 FPS",
      "Acessibilidade completa com fallback gracioso e respeito à diretiva `prefers-reduced-motion`",
    ],
    githubUrl: "",
    demoUrl: "",
    caseStudy: {
      context:
        "Demonstração de competência em interfaces de alto impacto visual, além de backend e engenharia corporativa, unindo computação gráfica no browser com design moderno.",
      problem:
        "Cenas 3D na web frequentemente sofrem com quedas bruscas de FPS em dispositivos móveis, travamento de scroll e inacessibilidade para usuários sensíveis a movimento.",
      solution:
        "Construção de uma experiência com canvas isolado, lazy loading de malhas 3D com React Suspense, controle rigoroso de render loop e fallback estático acessível.",
      architecture: {
        overview:
          "A página usa Next.js para renderização de layout, integrando o canvas R3F com prioridade de thread via requestAnimationFrame desacoplado, sincronizado aos keyframes do GSAP ScrollTrigger.",
        flow: [
          {
            step: "01",
            title: "Asset Streaming & Suspense",
            description: "Carregamento progressivo de modelos GLTF/GLB compactados via Draco/KTX2.",
            tech: "React Suspense / GLTFLoader",
          },
          {
            step: "02",
            title: "3D Scene & Lighting",
            description: "Iluminação HDR e materiais PBR otimizados com controle dinâmico de câmera.",
            tech: "Three.js / React Three Fiber",
          },
          {
            step: "03",
            title: "Scroll Orchestration",
            description: "GSAP ScrollTrigger associando o progresso da rolagem à rotação e posição do modelo 3D.",
            tech: "GSAP / ScrollTrigger",
          },
          {
            step: "04",
            title: "Motion Accessibility",
            description: "Detecção de prefers-reduced-motion desativando animações e exibindo render fixo.",
            tech: "CSS / Media Queries",
          },
        ],
      },
      engineeringDecisions: [
        {
          decision: "Uso de React Three Fiber",
          rationale:
            "Permite declarar cenas 3D com a reatividade e ciclo de vida do ecossistema React, facilitando desacoplamento de componentes.",
        },
        {
          decision: "Respeito a prefers-reduced-motion",
          rationale:
            "Garante acessibilidade para usuários com distúrbios vestibulares, desativando rotações contínuas de câmera.",
        },
      ],
      challengesAndSolutions: [
        {
          challenge: "Consumo de GPU e bateria em mobile",
          solution:
            "Pausa automática do render loop quando o canvas não está visível no viewport (IntersectionObserver) e redução de pixel ratio para dispositivos de baixa potência.",
        },
      ],
      security: [
        "Sanitização de assets e carregamento via CDN segura com SRI",
      ],
      testing: {
        description:
          "Testes de performance de renderização no Chrome DevTools / Lighthouse garantindo estabilidade de framerate.",
        metrics: [
          "60 FPS constantes em resoluções padrão",
          "Score de acessibilidade elevado no Lighthouse",
        ],
      },
      infrastructure: [
        "Deploy otimizado na Vercel com compressão Brotli e edge caching de assets 3D",
      ],
      results: [
        "Showcase de capacidade em creative coding e computação gráfica web",
        "Experiência imersiva sem comprometer performance ou acessibilidade",
      ],
    },
  },
];

export interface AcademicProject {
  id: string;
  title: string;
  category: string;
  summary: string;
  technologies: string[];
  highlights: string[];
  githubUrl?: string;
}

export const academicProjects: AcademicProject[] = [
  {
    id: "gynlog-fleet-manager",
    title: "GynLog Fleet Manager",
    category: "Projeto Acadêmico • Java Desktop",
    summary:
      "Sistema desktop acadêmico para gestão de frotas e controle operacional, estruturado no padrão arquitetural MVC com separação em camadas e regras de negócio encapsuladas.",
    technologies: ["Java", "Swing", "MVC", "SQL"],
    highlights: [
      "Arquitetura MVC com separação de controllers, views e models",
      "Módulos de cadastro, consulta e controle de veículos e rotinas",
      "Base prática de modelagem orientada a objetos e manutenção",
    ],
    githubUrl: "https://github.com/lvpcdev/gynlog-fleet-manager.git",
  },
  {
    id: "pdv-posto-combustivel",
    title: "PDV Posto de Combustível",
    category: "Projeto Acadêmico • Java Desktop",
    summary:
      "Sistema desktop acadêmico para ponto de venda e operação de postos de combustível, contemplando módulos de cadastro, fluxo de abastecimento e persistência relacional com JDBC.",
    technologies: ["Java", "Swing", "JDBC", "PostgreSQL"],
    highlights: [
      "Interface gráfica interativa construída em Java Swing",
      "Fluxo operacional de abastecimento e conferência de itens",
      "Persistência e operações de banco de dados via JDBC",
    ],
    githubUrl: "https://github.com/Davi-Fraga/pdv-posto-de-combustivel.git",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}

export function getEngineeringCases(): Project[] {
  return projects.filter((p) => p.isEngineeringCase);
}

export function getAcademicProjects(): AcademicProject[] {
  return academicProjects;
}
