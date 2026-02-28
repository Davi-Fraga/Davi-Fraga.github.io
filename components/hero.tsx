"use client";

import { ArrowDown, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion-wrapper";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden"
      aria-label="Apresentação"
    >
      {/* Subtle background grid */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      {/* Radial glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center md:px-6">
        <FadeIn delay={0.2}>
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance">
            {profile.name}
          </h1>
        </FadeIn>

        <FadeIn delay={0.3}>
          <p className="mt-4 text-lg font-medium text-primary md:text-xl">
            {profile.headline}
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg text-pretty">
            {profile.subheadline}
          </p>
        </FadeIn>

        <FadeIn delay={0.5}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <a href="#projetos">
                <ArrowDown className="h-4 w-4" />
                {profile.hero.ctaProjects}
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <a href="#contato">
                <MessageSquare className="h-4 w-4" />
                {profile.hero.ctaContact}
              </a>
            </Button>

          </div>
        </FadeIn>
      </div>
    </section>
  );
}
