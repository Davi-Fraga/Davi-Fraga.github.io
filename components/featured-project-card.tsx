"use client";

import type { Project } from "@/data/projects";
import { ProjectCard } from "@/components/project-card";
import { ArchitectureDiagram } from "@/components/projects/architecture-diagram";

interface FeaturedProjectCardProps {
  project: Project;
  index: number;
  isSignature?: boolean;
}

export function FeaturedProjectCard({
  project,
  index,
  isSignature = false,
}: FeaturedProjectCardProps) {
  if (isSignature && project.caseStudy?.architecture?.flow) {
    return (
      <ProjectCard
        project={project}
        featuredNumber={index + 1}
        variant="signature"
        customVisual={
          <ArchitectureDiagram
            title={project.title}
            nodes={project.caseStudy.architecture.flow}
            metrics={project.metrics}
          />
        }
      />
    );
  }

  return (
    <ProjectCard
      project={project}
      featuredNumber={index + 1}
      variant={isSignature ? "signature" : "featured"}
    />
  );
}
