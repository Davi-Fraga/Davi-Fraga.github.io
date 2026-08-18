"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, Github, CheckCircle2, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageReveal, type ProjectVisual } from "@/components/motion/image-reveal";
import type { Project } from "@/data/projects";
import { cn } from "@/lib/utils";
import { useMotionCapabilities } from "@/hooks/use-motion-capabilities";
import { motionConfig } from "@/lib/motion/config";
import { useRef, type MouseEvent, type ReactNode } from "react";

interface ProjectCardProps {
  project: Project;
  featuredNumber?: number;
  variant?: "default" | "featured" | "signature" | "engineering-case";
  allowTilt?: boolean;
  customVisual?: ReactNode;
}

const placeholderVisual: ProjectVisual = { kind: "placeholder" };

export function ProjectCard({
  project,
  featuredNumber,
  variant = "default",
  allowTilt = false,
  customVisual,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const capabilities = useMotionCapabilities();
  const hasDemo = Boolean(project.demoUrl && project.demoUrl.trim() !== "" && project.demoUrl !== "#");
  const hasRepo = Boolean(project.githubUrl && project.githubUrl.trim() !== "" && project.githubUrl !== "#");
  const isFeatured = variant === "featured" || variant === "signature";
  const isSignature = variant === "signature";
  const isEngineeringCase = variant === "engineering-case";

  const canTilt =
    allowTilt &&
    project.slug === "landing-flamengo" &&
    capabilities.isReady &&
    !capabilities.prefersReducedMotion &&
    capabilities.isDesktop &&
    capabilities.hasFinePointer &&
    !capabilities.hasTouch;

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!canTilt || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * motionConfig.flamengoTilt;
    const rotateY = ((x - centerX) / centerX) * motionConfig.flamengoTilt;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-${motionConfig.cardShift}px)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "";
  };

  return (
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "group flex h-full min-w-0 flex-col rounded-[var(--radius-surface)] border border-border/80 bg-card/80 p-4 backdrop-blur-sm transition-[border-color,background-color,box-shadow,transform] duration-200 hover:border-primary/40 hover:bg-card sm:p-6",
        isFeatured && "md:min-h-[70vh] md:justify-center md:p-8 lg:p-10",
        isSignature && "border-primary/50 bg-surface-elevated shadow-lg shadow-primary/5 md:min-h-[86vh] lg:p-12",
        isEngineeringCase && "hover:-translate-y-1 transition-all duration-200",
      )}
      data-project-slug={project.slug}
      data-signature={isSignature ? "true" : undefined}
      data-variant={variant}
      data-tilt={canTilt ? "enabled" : "disabled"}
    >
      <div className={cn("grid min-w-0 gap-6", isFeatured && "md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:items-center lg:gap-10")}>
        {customVisual ? (
          customVisual
        ) : (
          <ImageReveal visual={placeholderVisual} testId={`project-visual-${project.slug}`} />
        )}

        <div className="flex min-w-0 flex-col justify-between">
          <div className="space-y-4">
            <div className="flex min-w-0 flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-3">
              <div className="flex min-w-0 items-center gap-2">
                {featuredNumber && (
                  <span className="shrink-0 font-mono text-xs font-bold text-primary">
                    PROJETO DESTAQUE Nº {featuredNumber}
                  </span>
                )}
                <span className="break-words font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  {project.category}
                </span>
              </div>
              <span className="rounded-full border border-border bg-secondary/80 px-2 py-1 font-mono text-[10px] font-medium text-foreground">
                {project.status}
              </span>
            </div>

            {project.corporateContext && (
              <div className="inline-flex max-w-full items-center gap-1.5 rounded-md border border-primary/25 bg-primary/5 px-2 py-1 text-xs font-medium text-primary">
                <Building2 className="h-3.5 w-3.5 shrink-0" />
                <span className="break-words">{project.corporateContext}</span>
              </div>
            )}

            <div data-project-context>
              <h3 className={cn("text-xl font-bold tracking-tight text-foreground", isFeatured && "sm:text-2xl lg:text-3xl")}>
                {project.title}
              </h3>
              <p className="mt-1 text-sm font-medium text-primary">{project.tagline}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{project.summary}</p>
            </div>

            {!customVisual && project.metrics.length > 0 && (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {project.metrics.map((metric) => (
                  <div key={metric.label} className="min-w-0 rounded-lg border border-border/60 bg-secondary/40 p-3">
                    <p className="break-words font-mono text-base font-bold text-primary">{metric.value}</p>
                    <p className="mt-1 break-words text-xs font-medium text-muted-foreground">{metric.label}</p>
                    {metric.description && (
                      <p className="mt-1 break-words text-[11px] leading-relaxed text-muted-foreground">
                        {metric.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}

            <ul className="space-y-2 text-sm text-muted-foreground">
              {project.highlights.slice(0, isFeatured ? 4 : 2).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-1.5">
              {project.primaryTechs.map((tech) => (
                <span key={tech} className="rounded-md border border-border/70 bg-secondary/60 px-2 py-1 font-mono text-[11px] font-medium text-foreground">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border/40 pt-4">
            <Button asChild size="sm" className="gap-1.5 text-xs font-medium">
              <Link href={`/projects/${project.slug}`}>
                <span>{isFeatured ? "Ver case completo" : "Ver case"}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
            {hasRepo && (
              <Button asChild variant="outline" size="sm">
                <a href={project.githubUrl!} target="_blank" rel="noopener noreferrer" aria-label={`GitHub do ${project.title}`}>
                  <Github className="h-3.5 w-3.5" />
                  <span className="sr-only">GitHub</span>
                </a>
              </Button>
            )}
            {hasDemo && (
              <Button asChild variant="outline" size="sm">
                <a href={project.demoUrl!} target="_blank" rel="noopener noreferrer" aria-label={`Demo do ${project.title}`}>
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span className="sr-only">Demo</span>
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
