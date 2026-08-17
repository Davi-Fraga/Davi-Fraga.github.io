"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, Github, CheckCircle2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  featuredNumber?: number;
}

export function ProjectCard({ project, featuredNumber }: ProjectCardProps) {
  const hasDemo = Boolean(project.demoUrl && project.demoUrl.trim() !== "" && project.demoUrl !== "#");
  const hasRepo = Boolean(project.githubUrl && project.githubUrl.trim() !== "" && project.githubUrl !== "#");

  return (
    <div className="group flex h-full flex-col justify-between rounded-xl border border-border/80 bg-card/70 p-5 sm:p-6 backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:bg-card hover:shadow-md">
      <div className="space-y-3.5">
        {/* Header meta */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-3">
          <div className="flex items-center gap-1.5">
            {featuredNumber && (
              <span className="font-mono text-xs font-bold text-primary">
                0{featuredNumber}.
              </span>
            )}
            <span className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
              {project.category}
            </span>
          </div>

          <span
            className={cn(
              "rounded-full px-2 py-0.5 text-[10px] font-mono font-medium",
              project.status === "Produto em produção"
                ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                : project.status === "Em desenvolvimento"
                ? "border border-amber-500/30 bg-amber-500/10 text-amber-500"
                : "border border-border bg-secondary/80 text-foreground"
            )}
          >
            {project.status}
          </span>
        </div>

        {/* Corporate context badge if present (e.g. GetCoders) */}
        {project.corporateContext && (
          <div className="inline-flex items-center gap-1.5 rounded-md border border-primary/25 bg-primary/5 px-2 py-0.5 text-xs font-medium text-primary">
            <Building2 className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{project.corporateContext}</span>
          </div>
        )}

        {/* Title & summary */}
        <div>
          <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="mt-0.5 text-xs font-medium text-primary/90">
            {project.tagline}
          </p>
          <p className="mt-2 text-xs sm:text-sm leading-relaxed text-muted-foreground line-clamp-3 text-pretty">
            {project.summary}
          </p>
        </div>

        {/* Key Metrics Chips (Compact) */}
        {project.metrics && project.metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-2 pt-0.5">
            {project.metrics.slice(0, 2).map((m) => (
              <div
                key={m.label}
                className="rounded-md border border-border/60 bg-secondary/40 px-2 py-1.5"
              >
                <p className="font-mono text-sm sm:text-base font-bold text-primary leading-none">
                  {m.value}
                </p>
                <p className="text-[10px] font-medium text-muted-foreground truncate mt-0.5">
                  {m.label}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Highlights - 2 punchy items */}
        <ul className="space-y-1 pt-0.5 text-xs text-muted-foreground">
          {project.highlights.slice(0, 2).map((item) => (
            <li key={item} className="flex items-start gap-1.5">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              <span className="line-clamp-2">{item}</span>
            </li>
          ))}
        </ul>

        {/* Primary tech tags (4-5 items max) */}
        <div className="pt-1">
          <div className="flex flex-wrap gap-1">
            {project.primaryTechs.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center rounded-md border border-border/70 bg-secondary/60 px-2 py-0.5 text-[11px] font-mono font-medium text-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card actions */}
      <div className="mt-5 flex items-center justify-between gap-2 border-t border-border/40 pt-3.5">
        <Button
          asChild
          size="sm"
          variant="default"
          className={cn(
            "gap-1.5 text-xs font-medium",
            !hasRepo && !hasDemo ? "w-full" : ""
          )}
        >
          <Link href={`/projects/${project.slug}`}>
            <span>Ver case</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </Button>

        {(hasRepo || hasDemo) && (
          <div className="flex items-center gap-1.5">
            {hasRepo && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                <a
                  href={project.githubUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`GitHub do ${project.title}`}
                >
                  <Github className="h-3.5 w-3.5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            )}

            {hasDemo && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
              >
                <a
                  href={project.demoUrl!}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Demo do ${project.title}`}
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="sr-only">Demo</span>
                </a>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
