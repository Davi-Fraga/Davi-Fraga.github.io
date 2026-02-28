"use client";

import { SectionTitle } from "@/components/section-title";
import { ProjectCard } from "@/components/project-card";
import { StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { profile } from "@/data/profile";

export function ProjectsSection() {
  return (
    <section id="projetos" className="py-20 md:py-28" aria-label={profile.projects.sectionTitle}>
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <SectionTitle
          title={profile.projects.sectionTitle}
          subtitle={profile.projects.sectionSubtitle}
        />

        <StaggerContainer className="grid gap-6 sm:grid-cols-2">
          {profile.projects.items.map((project) => (
            <StaggerItem key={project.title}>
              <ProjectCard
                title={project.title}
                description={project.description}
                briefExplanation={project.briefExplanation}
                highlights={project.highlights}
                techBadges={project.techBadges}
                demoUrl={project.demoUrl ?? null}
                repoUrl={project.repoUrl ?? null}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
