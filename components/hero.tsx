"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ArrowDown, Github, FileText, Linkedin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { useMotionCapabilities } from "@/hooks/use-motion-capabilities";
import { motionConfig } from "@/lib/motion/config";

export function Hero() {
  const scope = useRef<HTMLElement>(null);
  const capabilities = useMotionCapabilities();
  const [motionState, setMotionState] = useState<"idle" | "complete" | "reduced">("idle");

  useGSAP(
    () => {
      if (!capabilities.isReady) {
        return;
      }

      if (capabilities.prefersReducedMotion) {
        setMotionState("reduced");
        return;
      }

      if (!capabilities.isDesktop || capabilities.hasTouch) {
        setMotionState("complete");
        return;
      }

      const elements = gsap.utils.toArray<HTMLElement>("[data-hero-step]");
      const timeline = gsap.timeline({
        defaults: {
          duration: motionConfig.durations.reveal,
          ease: motionConfig.easings.reveal,
        },
        onComplete: () => setMotionState("complete"),
      });

      timeline.from(elements, {
        autoAlpha: 0,
        y: motionConfig.offsets.reveal,
        stagger: 0.08,
        clearProps: "opacity,transform,visibility",
      });
    },
    { scope, dependencies: [capabilities] },
  );

  return (
    <section
      ref={scope}
      id="inicio"
      data-hero-motion={motionState}
      className="relative flex min-h-[calc(88vh-4rem)] flex-col justify-center overflow-hidden border-b border-border/40 py-16 sm:py-20 md:min-h-[calc(92vh-4rem)] md:py-24"
      aria-label="Apresentação do desenvolvedor"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,hsl(var(--border)/0.24)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.24)_1px,transparent_1px)] [background-size:3.5rem_3.5rem] [mask-image:linear-gradient(to_bottom,black,transparent_88%)]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-32 top-[-12rem] h-[32rem] w-[32rem] rounded-full bg-primary/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-5xl px-4 sm:px-6">
        <div data-hero-step className="flex justify-start">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3.5 py-1.5 font-mono text-xs font-medium text-primary shadow-sm backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span>{profile.statusBadge}</span>
          </div>
        </div>

        <div data-hero-step className="mt-6 space-y-2 sm:space-y-3">
          <div className="flex items-center gap-3">
            <p className="text-xl font-extrabold uppercase tracking-tight text-foreground sm:text-2xl md:text-3xl">
              {profile.name}
            </p>
            <span className="h-px w-10 bg-primary/50 sm:w-16" />
          </div>
          <h1 className="text-balance text-3xl font-extrabold leading-[1.15] tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Desenvolvedor Full Stack
            <span className="block text-primary">Engenharia de Software</span>
          </h1>
        </div>

        <p data-hero-step className="mt-6 max-w-3xl text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl">
          {profile.subheadline}
        </p>

        <div data-hero-step className="mt-8">
          <p className="mb-3 flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-muted-foreground/80">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Stack Estratégica
          </p>
          <div className="flex flex-wrap gap-2">
            {profile.strategicTechs.map((tech) => (
              <span key={tech} className="inline-flex items-center rounded-md border border-border/80 bg-secondary/70 px-3 py-1 font-mono text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-card">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div data-hero-step className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4">
          <Button asChild size="lg" className="h-11 gap-2 px-6 text-sm font-semibold shadow-sm transition-shadow hover:shadow-md">
            <a href="#projetos"><span>Ver projetos</span><ArrowDown className="h-4 w-4" /></a>
          </Button>
          {profile.links.github && (
            <Button asChild variant="outline" size="lg" className="h-11 gap-2 border-border px-5 text-sm font-medium hover:border-primary/40 hover:bg-secondary/60">
              <a href={profile.links.github} target="_blank" rel="noopener noreferrer" aria-label="Abrir perfil no GitHub"><Github className="h-4 w-4" /><span>GitHub</span></a>
            </Button>
          )}
          <Button asChild variant="outline" size="lg" className="h-11 gap-2 border-border px-5 text-sm font-medium hover:border-primary/40 hover:bg-secondary/60">
            <a href={profile.links.resumeUrl} target="_blank" rel="noopener noreferrer" download="Curriculo-Davi-Fraga.pdf" aria-label="Baixar currículo de Davi Fraga em PDF"><FileText className="h-4 w-4 text-primary" /><span>Currículo</span></a>
          </Button>
          {profile.links.linkedin && (
            <Button asChild variant="ghost" size="lg" className="h-11 gap-2 px-4 text-sm font-medium text-muted-foreground hover:text-foreground">
              <a href={profile.links.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Abrir perfil no LinkedIn"><Linkedin className="h-4 w-4" /><span>LinkedIn</span></a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
