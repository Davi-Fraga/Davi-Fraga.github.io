import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  Shield,
  CheckCircle2,
  Cpu,
  Layers,
  Server,
  Terminal,
  Activity,
  GitBranch,
  Home,
} from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { SkipLink } from "@/components/navigation/skip-link";
import { CaseReadingProgress } from "@/components/cases/case-reading-progress";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Projeto não encontrado | Davi Fraga",
    };
  }

  return {
    title: `${project.title} — Case de Engenharia | Davi Fraga`,
    description: project.summary,
    openGraph: {
      title: `${project.title} — Case Study | Davi Fraga`,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  // Find next project in list for navigation (or return to home if last)
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const isLastProject = currentIndex === projects.length - 1;
  const nextProject = !isLastProject ? projects[currentIndex + 1] : null;

  const hasDemo = Boolean(project.demoUrl && project.demoUrl.trim() !== "" && project.demoUrl !== "#");
  const hasRepo = Boolean(project.githubUrl && project.githubUrl.trim() !== "" && project.githubUrl !== "#");

  return (
    <>
      <SkipLink />
      <CaseReadingProgress targetId="case-content" />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="min-h-screen pb-24">
        {/* Top Breadcrumbs & Back Bar */}
        <div className="border-b border-border/50 bg-secondary/30 py-4">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 sm:px-6">
            <Link
              href="/#projetos"
              className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Voltar aos Projetos</span>
            </Link>

            <nav aria-label="Breadcrumb" className="hidden sm:block">
              <ol className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                <li>
                  <Link href="/" className="hover:text-foreground">
                    Início
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/#projetos" className="hover:text-foreground">
                    Projetos
                  </Link>
                </li>
                <li>/</li>
                <li className="text-primary font-medium truncate max-w-[200px]">
                  {project.slug}
                </li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <section className="border-b border-border/40 bg-gradient-to-b from-background via-card/50 to-background py-12 sm:py-16 md:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                  {project.category}
                </span>
                <span className="text-muted-foreground/40">•</span>
                <span className="rounded-full border border-border bg-secondary/80 px-2.5 py-0.5 font-mono text-xs font-medium text-foreground">
                  {project.status}
                </span>
                {project.corporateContext && (
                  <>
                    <span className="text-muted-foreground/40">•</span>
                    <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 font-mono text-xs font-medium text-primary">
                      {project.corporateContext}
                    </span>
                  </>
                )}
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl text-balance">
                {project.title}
              </h1>

              <p className="text-lg font-medium text-primary sm:text-xl">
                {project.tagline}
              </p>

              <p className="max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
                {project.summary}
              </p>
            </div>

            {/* Metrics Chips */}
            {project.metrics && project.metrics.length > 0 && (
              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                {project.metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-xl border border-border/80 bg-card p-4 text-center shadow-sm"
                  >
                    <p className="font-mono text-2xl sm:text-3xl font-extrabold text-primary">
                      {metric.value}
                    </p>
                    <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-foreground">
                      {metric.label}
                    </p>
                    {metric.description && (
                      <p className="mt-0.5 text-[11px] text-muted-foreground">
                        {metric.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Actions & Links */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {hasRepo && (
                <Button asChild size="default" variant="outline" className="gap-2">
                  <a
                    href={project.githubUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                    <span>Ver Repositório no GitHub</span>
                  </a>
                </Button>
              )}

              {hasDemo && (
                <Button asChild size="default" className="gap-2 font-semibold">
                  <a
                    href={project.demoUrl!}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Acessar Demonstração</span>
                  </a>
                </Button>
              )}
            </div>
          </div>
        </section>

        {/* Case Study Detailed Content */}
        <section
          id="case-content"
          className="motion-content mx-auto max-w-5xl space-y-16 px-4 py-12 opacity-0 translate-y-2 animate-[case-entry_400ms_ease-out_forwards] sm:px-6"
        >
          {/* 1. Contexto & Problema */}
          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-xl border border-border/80 bg-card p-6 md:p-8 space-y-3">
              <div className="flex items-center gap-2 text-primary">
                <Layers className="h-5 w-5" />
                <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
                  Contexto de Negócio
                </h2>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground text-pretty">
                {project.caseStudy.context}
              </p>
            </div>

            <div className="rounded-xl border border-destructive/20 bg-destructive/[0.02] p-6 md:p-8 space-y-3">
              <div className="flex items-center gap-2 text-destructive">
                <Terminal className="h-5 w-5" />
                <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
                  Problema & Gargalos
                </h2>
              </div>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground text-pretty">
                {project.caseStudy.problem}
              </p>
            </div>
          </div>

          {/* 2. Solução Implementada */}
          <div className="rounded-xl border border-primary/30 bg-primary/[0.02] p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle2 className="h-5 w-5" />
              <h2 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
                Solução de Engenharia
              </h2>
            </div>
            <p className="text-base sm:text-lg leading-relaxed text-foreground text-pretty">
              {project.caseStudy.solution}
            </p>
          </div>

          {/* 3. Arquitetura & Fluxo Técnico */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                [ ARQUITETURA DO SISTEMA ]
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Visão Geral & Fluxo de Execução
              </h2>
              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                {project.caseStudy.architecture.overview}
              </p>
            </div>

            {/* Architecture Node Diagram Component */}
            <div className="rounded-xl border border-border/80 bg-card p-6 md:p-8">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {project.caseStudy.architecture.flow.map((node, index) => (
                  <div
                    key={node.step}
                    className="relative flex flex-col justify-between rounded-lg border border-border/70 bg-secondary/30 p-4 transition-all hover:border-primary/40 hover:bg-secondary/50"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-xs font-bold text-primary">
                          PASSO {node.step}
                        </span>
                        <span className="rounded bg-card px-2 py-0.5 font-mono text-[10px] font-medium text-muted-foreground">
                          {node.tech}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-foreground">
                        {node.title}
                      </h3>
                      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                        {node.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 4. Decisões de Engenharia */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                [ TRADE-OFFS & DECISÕES ]
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Por que estas escolhas foram tomadas?
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {project.caseStudy.engineeringDecisions.map((item) => (
                <div
                  key={item.decision}
                  className="rounded-xl border border-border/80 bg-card p-5 space-y-2"
                >
                  <div className="flex items-center gap-2 text-primary">
                    <GitBranch className="h-4 w-4 shrink-0" />
                    <h3 className="text-sm font-bold text-foreground">
                      {item.decision}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                    {item.rationale}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 5. Desafios & Soluções */}
          <div className="space-y-6">
            <div className="space-y-2">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
                [ PROBLEMAS REAIS ]
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Desafios Técnicos Enfrentados & Soluções
              </h2>
            </div>

            <div className="space-y-4">
              {project.caseStudy.challengesAndSolutions.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border/80 bg-card p-5 sm:p-6"
                >
                  <div className="grid gap-4 md:grid-cols-12 md:items-center">
                    <div className="md:col-span-5 space-y-1">
                      <span className="font-mono text-xs font-semibold uppercase text-destructive">
                        Desafio {idx + 1}
                      </span>
                      <p className="text-sm font-bold text-foreground">
                        {item.challenge}
                      </p>
                    </div>
                    <div className="hidden md:flex md:col-span-1 justify-center text-primary">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                    <div className="md:col-span-6 space-y-1">
                      <span className="font-mono text-xs font-semibold uppercase text-primary">
                        Solução Implementada
                      </span>
                      <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground">
                        {item.solution}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 6. Segurança, Testes e Infraestrutura (Grid 3 Colunas) */}
          <div className="grid gap-6 md:grid-cols-3">
            {/* Segurança */}
            <div className="rounded-xl border border-border/80 bg-card p-6 space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Shield className="h-5 w-5" />
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
                  Segurança
                </h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                {project.caseStudy.security.map((sec) => (
                  <li key={sec} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <span>{sec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Testes */}
            <div className="rounded-xl border border-border/80 bg-card p-6 space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Activity className="h-5 w-5" />
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
                  Testes & Qualidade
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {project.caseStudy.testing.description}
              </p>
              {project.caseStudy.testing.metrics && (
                <ul className="space-y-1.5 pt-2 border-t border-border/50 text-xs text-foreground font-mono">
                  {project.caseStudy.testing.metrics.map((tm) => (
                    <li key={tm} className="flex items-center gap-1.5 text-primary">
                      <span>✓</span>
                      <span>{tm}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Infraestrutura */}
            <div className="rounded-xl border border-border/80 bg-card p-6 space-y-4">
              <div className="flex items-center gap-2 text-primary">
                <Server className="h-5 w-5" />
                <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
                  Infraestrutura
                </h3>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                {project.caseStudy.infrastructure.map((infra) => (
                  <li key={infra} className="flex items-start gap-2">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                    <span>{infra}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 7. Tecnologias Completas */}
          <div className="rounded-xl border border-border/80 bg-card p-6 md:p-8 space-y-4">
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-foreground">
              Stack & Tecnologias Utilizadas
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-border/80 bg-secondary/80 px-3 py-1 font-mono text-xs font-medium text-foreground"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* 8. Resultados */}
          <div className="rounded-xl border border-primary/30 bg-primary/[0.02] p-6 md:p-8 space-y-4">
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-primary">
              Resultados & Impacto
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {project.caseStudy.results.map((res) => (
                <div key={res} className="flex items-start gap-2.5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span className="text-sm sm:text-base text-foreground font-medium">
                    {res}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Project Navigation Footer Bar */}
          {isLastProject ? (
            <div className="mt-16 flex flex-col items-center justify-between gap-4 rounded-xl border border-primary/30 bg-primary/[0.03] p-6 sm:flex-row sm:p-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-primary font-semibold">
                  Fim da sequência de cases
                </p>
                <h4 className="text-lg font-bold text-foreground sm:text-xl">
                  Explorar todo o ecossistema do portfólio
                </h4>
                <p className="text-xs text-muted-foreground">
                  Retorne à página inicial para conferir a stack completa, trajetória e contatos.
                </p>
              </div>

              <Button asChild size="default" className="gap-2 font-semibold">
                <Link href="/#projetos">
                  <Home className="h-4 w-4" />
                  <span>Voltar para a Página Inicial</span>
                </Link>
              </Button>
            </div>
          ) : nextProject ? (
            <div className="mt-16 flex flex-col items-center justify-between gap-4 rounded-xl border border-border/80 bg-secondary/30 p-6 sm:flex-row sm:p-8">
              <div>
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  Continuar explorando
                </p>
                <h4 className="text-lg font-bold text-foreground sm:text-xl">
                  {nextProject.title}
                </h4>
                <p className="text-xs text-primary">{nextProject.category}</p>
              </div>

              <Button asChild size="default" className="gap-2 font-semibold">
                <Link href={`/projects/${nextProject.slug}`}>
                  <span>Próximo Projeto</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          ) : null}
        </section>
      </main>
      <Footer />
    </>
  );
}
