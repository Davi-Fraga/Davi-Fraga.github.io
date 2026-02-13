"use client";

import { SectionTitle } from "@/components/section-title";
import { ProjectCard } from "@/components/project-card";
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { profile } from "@/data/profile";

export function ProjectsSection() {
  return (
    <section id="projetos" className="py-20 md:py-28" aria-label="Projetos">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle
          title="Projetos"
          subtitle="Alguns dos projetos que desenvolvi recentemente"
        />

        <StaggerContainer className="grid gap-6 sm:grid-cols-2">
          {profile.projects.map((project) => (
            <StaggerItem key={project.title}>
              <ProjectCard
                title={project.title}
                description={project.description}
                briefExplanation={project.briefExplanation}
                highlights={project.highlights}
                techBadges={project.techBadges}
                demoUrl={project.demoUrl}
                repoUrl={project.repoUrl}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
