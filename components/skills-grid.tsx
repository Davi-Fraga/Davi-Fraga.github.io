"use client";

import { SectionTitle } from "@/components/section-title";
import { Badge } from "@/components/ui/badge";
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { profile } from "@/data/profile";
import { Server, Globe, Settings } from "lucide-react";

const categoryIcons: Record<string, React.ElementType> = {
  "Back-end": Server,
  "Front-end": Globe,
  Ferramentas: Settings,
};

export function SkillsGrid() {
  return (
    <section
      id="habilidades"
      className="py-20 md:py-28"
      aria-label="Habilidades"
    >
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <SectionTitle
          title="Habilidades"
          subtitle="Tecnologias e ferramentas que utilizo no dia a dia"
        />

        <StaggerContainer className="grid gap-6 sm:grid-cols-3">
          {profile.skills.map((cat) => {
            const Icon = categoryIcons[cat.category] ?? Settings;
            return (
              <StaggerItem key={cat.category}>
                <div className="rounded-lg border border-border bg-card p-6 transition-colors hover:border-primary/30">
                  <div className="mb-4 flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
                      {cat.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.items.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs font-medium"
                      >
                        {skill}
                      </Badge>
                    ))}
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
