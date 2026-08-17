"use client";

import { SectionTitle } from "@/components/section-title";
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { skillCategories } from "@/data/skills";
import { Server, Layout, Database, Terminal, ShieldCheck, CheckCircle } from "lucide-react";

const domainIcons: Record<string, React.ElementType> = {
  backend: Server,
  frontend: Layout,
  database: Database,
  devops: Terminal,
  quality: CheckCircle,
  security: ShieldCheck,
};

export function SkillsGrid() {
  return (
    <section id="stack" className="py-20 md:py-28 bg-card/20" aria-label="Stack e Tecnologias">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="Stack & Competências"
          title="Tecnologias Agrupadas por Domínio"
          subtitle="Ferramentas e frameworks aplicados no desenvolvimento de arquiteturas modernas, APIs e sistemas escaláveis."
        />

        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category) => {
            const Icon = domainIcons[category.id] ?? Server;

            return (
              <StaggerItem key={category.id}>
                <div className="group flex h-full flex-col justify-between rounded-xl border border-border/80 bg-card p-6 transition-all duration-200 hover:border-primary/40 hover:shadow-sm">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary/80 text-primary transition-colors group-hover:border-primary/40 group-hover:bg-primary/10">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold tracking-tight text-foreground">
                          {category.name}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {category.description}
                    </p>

                    {/* Skill Pills */}
                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="inline-flex items-center rounded-md border border-border/70 bg-secondary/60 px-2.5 py-1 text-xs font-mono font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-secondary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
