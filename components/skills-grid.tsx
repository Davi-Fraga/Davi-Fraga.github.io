"use client";

import { profile } from "@/data/profile";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { Badge } from "@/components/ui/badge";
import {
  Code2,
  Globe,
  Server,
  Database,
  Cloud,
  Sparkles,
  Cpu,
  Star,
} from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  Linguagens: Code2,
  "Front-end": Globe,
  "Back-end & APIs": Server,
  "Banco de Dados": Database,
  "Infra & DevOps": Cloud,
  "IA & Ferramentas": Sparkles,
  Especializado: Cpu,
};

export function SkillsGrid() {
  const totalTechs = profile.skills.categories.reduce(
    (acc, cat) => acc + cat.items.length,
    0
  );

  return (
    <section
      id="habilidades"
      className="relative py-20 md:py-28 overflow-hidden"
      aria-label={profile.skills.sectionTitle}
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/[0.03] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        {/* Premium Header */}
        <FadeIn className="mb-14 text-center">
          {/* Top badge */}
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
            <Sparkles className="h-3 w-3" />
            {profile.skills.sectionBadge}
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl text-balance">
            {profile.skills.sectionTitle}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted-foreground md:text-lg text-pretty">
            {profile.skills.sectionSubtitle}
          </p>
          {/* Tech count */}
          <p className="mt-3 text-sm text-muted-foreground/70">
            <span className="font-semibold text-primary">{totalTechs}</span>{" "}
            tecnologias &middot;{" "}
            <span className="font-semibold text-primary">
              {profile.skills.categories.length}
            </span>{" "}
            categorias
          </p>
        </FadeIn>

        {/* Category Cards Grid */}
        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {profile.skills.categories.map((cat) => {
            const Icon = categoryIcons[cat.category] ?? Code2;
            const primaryCount = cat.items.filter((i) => i.primary).length;

            return (
              <StaggerItem key={cat.category}>
                <div className="group relative h-full rounded-xl border border-border bg-card/50 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/40 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5">
                  {/* Category header */}
                  <div className="mb-5 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                          {cat.category}
                        </h3>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {cat.items.length} techs
                          {primaryCount > 0 && (
                            <span className="ml-1 text-primary">
                              &middot; {primaryCount} principal
                              {primaryCount > 1 ? "is" : ""}
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Category description */}
                  <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>

                  {/* Tech pills */}
                  <div className="flex flex-wrap gap-2">
                    {cat.items.length > 0 ? (
                      cat.items.map((skill) => (
                        <Badge
                          key={skill.name}
                          variant={skill.primary ? "default" : "secondary"}
                          className={`
                            cursor-default text-xs font-medium transition-all duration-200
                            ${
                              skill.primary
                                ? "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20 hover:border-primary/50"
                                : "border-border bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground hover:border-muted-foreground/30"
                            }
                          `}
                        >
                          {skill.primary && (
                            <Star className="mr-1 h-3 w-3 fill-primary/50" />
                          )}
                          {skill.name}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-xs italic text-muted-foreground/60">
                        Em breve...
                      </span>
                    )}
                  </div>

                  {/* Hover glow effect */}
                  <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="absolute inset-px rounded-[11px] bg-gradient-to-b from-primary/[0.03] to-transparent" />
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
