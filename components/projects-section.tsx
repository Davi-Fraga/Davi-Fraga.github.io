"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FeaturedProjectCard } from "@/components/featured-project-card";
import { ProjectCard } from "@/components/project-card";
import { SectionTitle } from "@/components/section-title";
import { getEngineeringCases, getFeaturedProjects } from "@/data/projects";
import { useMotionCapabilities } from "@/hooks/use-motion-capabilities";

export function ProjectsSection() {
  const featuredProjects = getFeaturedProjects();
  const engineeringCases = getEngineeringCases();
  const featuredRef = useRef<HTMLDivElement>(null);
  const capabilities = useMotionCapabilities();
  const usesStickyMotion = capabilities.isReady && capabilities.canUseStickyProjects;

  useGSAP(
    () => {
      if (!usesStickyMotion || !featuredRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      const cards = gsap.utils.toArray<HTMLElement>("[data-project-slug]", featuredRef.current);

      cards.slice(0, -1).forEach((card, index) => {
        gsap.to(card, {
          scale: 0.975,
          opacity: 0.72,
          ease: "none",
          scrollTrigger: {
            trigger: cards[index + 1],
            start: "top 78%",
            end: "top 28%",
            scrub: 0.35,
          },
        });
      });
    },
    {
      scope: featuredRef,
      dependencies: [usesStickyMotion],
      revertOnUpdate: true,
    },
  );

  return (
    <section id="projetos" className="overflow-clip py-20 md:py-28" aria-label="Projetos em destaque">
      <div className="mx-auto max-w-[var(--container-wide)] px-4 sm:px-6">
        <SectionTitle
          eyebrow="Projetos em Destaque"
          title="Sistemas em Produção & Engenharia Real"
          subtitle="Aplicações completas desenvolvidas com foco em arquitetura, tolerância a falhas, testes automatizados e segurança."
        />

        <div
          ref={featuredRef}
          className="mt-10 grid gap-8 md:gap-12"
          data-featured-projects
          data-project-motion={usesStickyMotion ? "sticky" : "static"}
        >
          {featuredProjects.map((project, index) => (
            <div
              key={project.id}
              className={usesStickyMotion ? "md:sticky md:top-24" : undefined}
            >
              <FeaturedProjectCard
                project={project}
                index={index}
                isSignature={index === 0}
              />
            </div>
          ))}
        </div>

        <div id="cases" className="mt-24 border-t border-border/40 pt-12">
          <SectionTitle
            eyebrow="Engineering Cases"
            title="Cases Especializados & Deep Dives Técnicos"
            subtitle="Demonstrações pontuais focadas em segurança de banco de dados (PostgreSQL RLS) e computação visual / 3D no browser."
          />

          <div className="grid gap-6 md:grid-cols-2">
            {engineeringCases.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                variant="engineering-case"
                allowTilt={project.slug === "landing-flamengo"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
