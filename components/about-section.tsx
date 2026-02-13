"use client";

import { Code2, Monitor, Wrench } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { profile } from "@/data/profile";

const highlightIcons = [Code2, Monitor, Wrench];

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 md:py-28" aria-label="Sobre mim">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <SectionTitle title="Sobre mim" subtitle="Um pouco da minha historia e motivacao" />

        <FadeIn>
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {profile.about.paragraphs.map((p, i) => (
              <p key={i} className="text-pretty">{p}</p>
            ))}
          </div>
        </FadeIn>

        <StaggerContainer className="mt-10 grid gap-4 sm:grid-cols-3">
          {profile.about.highlights.map((h, i) => {
            const Icon = highlightIcons[i];
            return (
              <StaggerItem key={h.label}>
                <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      {h.label}
                    </p>
                    <p className="text-sm text-muted-foreground">{h.value}</p>
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
