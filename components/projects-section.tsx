"use client";

import { SectionTitle } from "@/components/section-title";
import { FeaturedProjectCard } from "@/components/featured-project-card";
import { ProjectCard } from "@/components/project-card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { getFeaturedProjects, getEngineeringCases } from "@/data/projects";

export function ProjectsSection() {
  const featuredProjects = getFeaturedProjects();
  const engineeringCases = getEngineeringCases();

  const heroProject = featuredProjects[0]; // Gestão LGND
  const otherFeatured = featuredProjects.slice(1); // Redmine, OAB, FluxoCorreto

  return (
    <section id="projetos" className="py-20 md:py-28" aria-label="Projetos em destaque">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Header */}
        <SectionTitle
          eyebrow="Projetos em Destaque"
          title="Sistemas em Produção & Engenharia Real"
          subtitle="Aplicações completas desenvolvidas com foco em arquitetura, tolerância a falhas, testes automatizados e segurança."
        />

        {/* Highlighted Case #1 (Gestão LGND) */}
        {heroProject && (
          <FadeIn className="mb-12">
            <FeaturedProjectCard project={heroProject} />
          </FadeIn>
        )}

        {/* Other Featured Projects (Redmine Consolidador, Gestão Jurídica, FluxoCorreto) */}
        <div className="mt-8">
          <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {otherFeatured.map((project, idx) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} featuredNumber={idx + 2} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>

        {/* Engineering Cases Section */}
        <div id="cases" className="mt-24 pt-12 border-t border-border/40">
          <SectionTitle
            eyebrow="Engineering Cases"
            title="Cases Especializados & Deep Dives Técnicos"
            subtitle="Demonstrações pontuais focadas em segurança de banco de dados (PostgreSQL RLS) e computação visual / 3D no browser."
          />

          <StaggerContainer className="grid gap-6 md:grid-cols-2">
            {engineeringCases.map((project) => (
              <StaggerItem key={project.id}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
