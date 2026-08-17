"use client";

import Link from "next/link";
import { Building2, Calendar, CheckCircle2, ArrowRight, Briefcase, GraduationCap } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { experiences, educations } from "@/data/experience";
import { Button } from "@/components/ui/button";

export function ExperienceSection() {
  return (
    <section id="experiencia" className="py-20 md:py-28" aria-label="Experiência Profissional e Formação">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="Trajetória Técnica"
          title="Experiência Profissional & Formação"
          subtitle="Atuação corporativa no desenvolvimento de sistemas web, APIs RESTful e consolidação de dados em ambiente real."
        />

        <div className="grid gap-12 lg:grid-cols-12">
          {/* Main Column: Professional Experience (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-primary font-mono text-sm font-semibold uppercase tracking-wider">
              <Briefcase className="h-4 w-4" />
              <span>Experiência Corporativa</span>
            </div>

            <div className="space-y-6">
              {experiences.map((exp) => (
                <FadeIn key={exp.id}>
                  <div className="rounded-xl border border-primary/30 bg-card p-6 sm:p-8 space-y-5 shadow-sm">
                    {/* Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border/50 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-xl font-bold text-foreground">
                            {exp.role}
                          </h3>
                        </div>
                        <p className="font-semibold text-primary mt-0.5">
                          {exp.company}
                        </p>
                      </div>

                      <div className="flex flex-col items-end">
                        <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary/80 px-2.5 py-0.5 font-mono text-xs font-medium text-foreground">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          {exp.period}
                        </span>
                        {exp.location && (
                          <span className="text-[11px] text-muted-foreground mt-1">
                            {exp.location}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-sm leading-relaxed text-muted-foreground text-pretty">
                      {exp.summary}
                    </p>

                    {/* Activities bullet list */}
                    <div className="space-y-2">
                      <p className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground">
                        Responsabilidades & Entregas
                      </p>
                      <ul className="space-y-2 text-xs sm:text-sm text-muted-foreground">
                        {exp.activities.map((act) => (
                          <li key={act} className="flex items-start gap-2.5">
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Featured Project Callout */}
                    {exp.featuredProjectSlug && (
                      <div className="rounded-lg border border-primary/20 bg-primary/[0.04] p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div>
                          <p className="font-mono text-[11px] uppercase tracking-wider text-primary font-semibold">
                            Projeto em Destaque no Estágio
                          </p>
                          <p className="text-sm font-bold text-foreground">
                            {exp.featuredProjectTitle}
                          </p>
                        </div>
                        <Button asChild size="sm" variant="outline" className="text-xs gap-1.5 shrink-0">
                          <Link href={`/projects/${exp.featuredProjectSlug}`}>
                            <span>Ver case corporativo</span>
                            <ArrowRight className="h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    )}

                    {/* Technologies */}
                    <div className="pt-2">
                      <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Tecnologias Utilizadas
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-border/80 bg-secondary/60 px-2.5 py-0.5 font-mono text-xs font-medium text-foreground"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>

          {/* Secondary Column: Education & Academic Track (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-primary font-mono text-sm font-semibold uppercase tracking-wider">
              <GraduationCap className="h-4 w-4" />
              <span>Formação Acadêmica</span>
            </div>

            <div className="space-y-4">
              {educations.map((edu) => (
                <FadeIn key={edu.id}>
                  <div className="rounded-xl border border-border/80 bg-card p-5 sm:p-6 space-y-2.5 transition-colors hover:border-primary/40">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="text-base font-bold text-foreground">
                          {edu.course}
                        </h4>
                        <p className="text-sm font-medium text-primary">
                          {edu.institution}
                        </p>
                      </div>
                      <span className="rounded-full border border-border bg-secondary/80 px-2 py-0.5 font-mono text-[11px] text-muted-foreground whitespace-nowrap">
                        {edu.period}
                      </span>
                    </div>

                    <div className="inline-block">
                      <span className="rounded bg-secondary/80 px-2 py-0.5 font-mono text-xs text-foreground">
                        {edu.status}
                      </span>
                    </div>

                    {edu.description && (
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {edu.description}
                      </p>
                    )}
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
