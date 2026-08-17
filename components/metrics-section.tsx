"use client";

import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { profile } from "@/data/profile";
import { CheckCircle2, ShieldCheck, Database, Layers } from "lucide-react";

const metricIcons = [CheckCircle2, Database, ShieldCheck, Layers];

export function MetricsSection() {
  return (
    <section
      className="border-b border-border/40 bg-card/30 py-12"
      aria-label="Métricas de engenharia e produção"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <StaggerContainer className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {profile.metrics.map((metric, index) => {
            const Icon = metricIcons[index % metricIcons.length];
            return (
              <StaggerItem key={metric.label}>
                <div className="group relative overflow-hidden rounded-xl border border-border/70 bg-card/60 p-5 transition-all duration-200 hover:border-primary/40 hover:bg-card">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono text-2xl font-bold tracking-tight text-foreground sm:text-3xl text-primary">
                      {metric.value}
                    </span>
                    <Icon className="h-4 w-4 text-muted-foreground/60 group-hover:text-primary transition-colors" />
                  </div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground sm:text-sm">
                    {metric.label}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">
                    {metric.detail}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
