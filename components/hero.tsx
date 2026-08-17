"use client";

import { ArrowDown, Github, FileText, Linkedin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion-wrapper";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[calc(88vh-4rem)] flex-col justify-center overflow-hidden border-b border-border/40 py-16 sm:py-20 md:py-24"
      aria-label="Apresentação do desenvolvedor"
    >
      {/* High-tech subtle background mesh */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.12),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(16,185,129,0.15),rgba(0,0,0,0))]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        {/* Availability Badge */}
        <FadeIn delay={0.1} className="flex justify-start">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 text-xs font-mono font-medium text-primary shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span>{profile.statusBadge}</span>
          </div>
        </FadeIn>

        {/* Main Headings */}
        <div className="mt-6 space-y-2 sm:space-y-3">
          {/* Name with elevated visual presence */}
          <FadeIn delay={0.2}>
            <div className="flex items-center gap-3">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-tight text-foreground">
                {profile.name}
              </h2>
              <span className="h-px w-10 sm:w-16 bg-primary/50" />
            </div>
          </FadeIn>

          <FadeIn delay={0.25}>
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance leading-[1.15]">
              Desenvolvedor Full Stack
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-emerald-400 to-teal-300">
                Engenharia de Software
              </span>
            </h1>
          </FadeIn>
        </div>

        {/* Concise Technical Subheadline */}
        <FadeIn delay={0.35}>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl text-pretty">
            {profile.subheadline}
          </p>
        </FadeIn>

        {/* Strategic Tech Badges */}
        <FadeIn delay={0.45}>
          <div className="mt-8">
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground/80 mb-3 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Stack Estratégica
            </p>
            <div className="flex flex-wrap gap-2">
              {profile.strategicTechs.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center rounded-md border border-border/80 bg-secondary/70 px-3 py-1 text-xs font-mono font-medium text-foreground transition-all hover:border-primary/50 hover:bg-card"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Clear Action CTAs with visual hierarchy */}
        <FadeIn delay={0.55}>
          <div className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Primary CTA: Ver Projetos */}
            <Button
              asChild
              size="lg"
              className="h-11 px-6 text-sm font-semibold shadow-sm transition-all hover:shadow-md gap-2"
            >
              <a href="#projetos">
                <span>Ver projetos</span>
                <ArrowDown className="h-4 w-4" />
              </a>
            </Button>

            {/* Secondary CTA: GitHub */}
            {profile.links.github && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-11 px-5 text-sm font-medium gap-2 border-border hover:border-primary/40 hover:bg-secondary/60"
              >
                <a
                  href={profile.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir perfil no GitHub"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub</span>
                </a>
              </Button>
            )}

            {/* Secondary CTA: Currículo */}
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-11 px-5 text-sm font-medium gap-2 border-border hover:border-primary/40 hover:bg-secondary/60"
            >
              <a
                href={profile.links.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="Curriculo-Davi-Fraga.pdf"
                aria-label="Baixar currículo de Davi Fraga em PDF"
              >
                <FileText className="h-4 w-4 text-primary" />
                <span>Currículo</span>
              </a>
            </Button>

            {/* Secondary CTA: LinkedIn */}
            {profile.links.linkedin && (
              <Button
                asChild
                variant="ghost"
                size="lg"
                className="h-11 px-4 text-sm font-medium gap-2 text-muted-foreground hover:text-foreground"
              >
                <a
                  href={profile.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abrir perfil no LinkedIn"
                >
                  <Linkedin className="h-4 w-4" />
                  <span>LinkedIn</span>
                </a>
              </Button>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
