"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, Github, Layers, ShieldCheck, CheckCircle, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface FeaturedProjectCardProps {
  project: Project;
}

export function FeaturedProjectCard({ project }: FeaturedProjectCardProps) {
  const hasDemo = Boolean(project.demoUrl && project.demoUrl.trim() !== "" && project.demoUrl !== "#");
  const hasRepo = Boolean(project.githubUrl && project.githubUrl.trim() !== "" && project.githubUrl !== "#");

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/[0.03] p-6 sm:p-8 md:p-10 shadow-lg shadow-primary/[0.02]">
      {/* Background glow accent */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />

      <div className="relative z-10 flex flex-col gap-6">
        {/* Top bar: Category + Status Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/50 pb-5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary">
              [ PROJETO DESTAQUE Nº 1 ]
            </span>
            <span className="text-muted-foreground/60">•</span>
            <span className="text-xs font-medium text-muted-foreground">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-xs font-semibold text-emerald-500">
              {project.status}
            </span>
          </div>
        </div>

        {/* Content & Main Info */}
        <div className="grid gap-6 lg:grid-cols-12 lg:items-center">
          <div className="space-y-4 lg:col-span-7">
            <h3 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl md:text-4xl">
              {project.title}
            </h3>
            <p className="text-sm font-medium text-primary sm:text-base">
              {project.tagline}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base text-pretty">
              {project.summary}
            </p>

            {/* Highlights bullet list */}
            <div className="pt-2">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-foreground mb-2">
                Destaques de Engenharia
              </p>
              <ul className="grid gap-2 sm:grid-cols-2 text-xs sm:text-sm text-muted-foreground">
                {project.highlights.slice(0, 4).map((highlight) => (
                  <li key={highlight} className="flex items-start gap-2">
                    <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Metrics Grid Showcase */}
          <div className="rounded-xl border border-border/70 bg-secondary/30 p-5 backdrop-blur-sm lg:col-span-5">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="rounded-lg border border-border/60 bg-card/80 p-3 sm:p-4 text-center transition-colors hover:border-primary/40"
                >
                  <p className="font-mono text-2xl sm:text-3xl font-extrabold text-foreground text-primary">
                    {m.value}
                  </p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-foreground">
                    {m.label}
                  </p>
                  {m.description && (
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {m.description}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {/* Tech badges */}
            <div className="mt-4 pt-4 border-t border-border/50">
              <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Stack Principal
              </p>
              <div className="flex flex-wrap gap-1.5">
                {project.primaryTechs.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center rounded-md border border-border/80 bg-card px-2.5 py-1 text-xs font-mono font-medium text-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/50">
          <Button asChild size="default" className="gap-2 font-semibold">
            <Link href={`/projects/${project.slug}`}>
              <span>Ver case completo</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>

          {hasRepo && (
            <Button asChild variant="outline" size="default" className="gap-2">
              <a
                href={project.githubUrl!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Repositório do ${project.title}`}
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
              </a>
            </Button>
          )}

          {hasDemo && (
            <Button asChild variant="outline" size="default" className="gap-2">
              <a
                href={project.demoUrl!}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Demo online do ${project.title}`}
              >
                <ExternalLink className="h-4 w-4" />
                <span>Demo</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
