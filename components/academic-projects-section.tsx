"use client";

import { Github, BookOpen, CheckCircle2 } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { getAcademicProjects } from "@/data/projects";
import { Button } from "@/components/ui/button";

export function AcademicProjectsSection() {
  const academicProjects = getAcademicProjects();

  return (
    <section
      id="academicos"
      className="py-16 md:py-20 border-t border-border/40 bg-card/20"
      aria-label="Projetos Acadêmicos e Formativos"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="Base Acadêmica & Formativa"
          title="Projetos de Graduação & Prática Inicial"
          subtitle="Aplicações desktop desenvolvidas durante a formação em Engenharia de Software no SENAI FATESG para consolidação de padrões arquiteturais (MVC), Java e persistência com bancos de dados."
        />

        <StaggerContainer className="grid gap-6 md:grid-cols-2">
          {academicProjects.map((project) => {
            const hasRepo = Boolean(project.githubUrl && project.githubUrl.trim() !== "");

            return (
              <StaggerItem key={project.id}>
                <div className="flex h-full flex-col justify-between rounded-xl border border-border/70 bg-card/60 p-5 sm:p-6 transition-all hover:border-primary/30 hover:bg-card">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between border-b border-border/40 pb-2.5">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-primary" />
                        <span className="font-mono text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                          {project.category}
                        </span>
                      </div>
                      <span className="rounded bg-secondary/80 px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
                        SENAI FATESG
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-foreground">
                      {project.title}
                    </h3>

                    <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground text-pretty">
                      {project.summary}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-1 pt-1 text-xs text-muted-foreground">
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="flex items-start gap-2">
                          <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/70" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Technologies */}
                    <div className="pt-2">
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-border/70 bg-secondary/50 px-2 py-0.5 font-mono text-[11px] text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  {hasRepo && (
                    <div className="mt-5 border-t border-border/40 pt-3">
                      <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="w-full gap-2 text-xs font-medium border-border hover:border-primary/40 hover:bg-secondary/60"
                      >
                        <a
                          href={project.githubUrl!}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ver repositório de ${project.title} no GitHub`}
                        >
                          <Github className="h-3.5 w-3.5" />
                          <span>Ver Código no GitHub</span>
                        </a>
                      </Button>
                    </div>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
