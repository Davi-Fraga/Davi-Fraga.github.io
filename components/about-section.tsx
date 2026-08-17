"use client";

import { Cpu, ShieldCheck, CheckCircle2, Terminal } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { profile } from "@/data/profile";

const principleIcons = [Cpu, ShieldCheck, CheckCircle2];

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 md:py-28" aria-label="Sobre o desenvolvedor">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionTitle
          eyebrow="Perfil Profissional"
          title={profile.about.sectionTitle}
          subtitle={profile.about.sectionSubtitle}
        />

        {/* Narrative Paragraphs */}
        <FadeIn className="space-y-4 rounded-2xl border border-border/80 bg-card p-6 sm:p-8 md:p-10 shadow-sm">
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {profile.about.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
        </FadeIn>

        {/* Engineering Principles */}
        <div className="mt-10">
          <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4 text-center">
            Princípios & Foco de Engenharia
          </p>

          <StaggerContainer className="grid gap-4 sm:grid-cols-3">
            {profile.about.principles.map((principle, index) => {
              const Icon = principleIcons[index % principleIcons.length];

              return (
                <StaggerItem key={principle.title}>
                  <div className="h-full rounded-xl border border-border/80 bg-card/70 p-5 transition-colors hover:border-primary/40">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary mb-3">
                      <Icon className="h-4 w-4" />
                    </div>
                    <h3 className="text-sm font-bold text-foreground">
                      {principle.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                      {principle.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
