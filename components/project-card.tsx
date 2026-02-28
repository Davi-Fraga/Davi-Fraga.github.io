"use client";

import { ExternalLink, Github, Sparkles, ChevronRight } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  title: string;
  description: string;
  briefExplanation: string;
  highlights: readonly string[];
  techBadges: readonly string[];
  demoUrl: string;
  repoUrl: string;
}

export function ProjectCard({
  title,
  description,
  briefExplanation,
  highlights,
  techBadges,
  demoUrl,
  repoUrl,
}: ProjectCardProps) {
  return (
    <Card className="group flex h-full flex-col transition-colors hover:border-primary/30">
      <CardHeader>
        <CardTitle className="text-lg leading-snug">{title}</CardTitle>
        <CardDescription className="mt-1 text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        {/* Brief explanation */}
        <p className="text-sm leading-relaxed text-muted-foreground">
          {briefExplanation}
        </p>

        {/* Highlights as bullet list */}
        <ul className="space-y-1.5" aria-label={`Destaques de ${title}`}>
          {highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 text-sm text-muted-foreground"
            >
              <ChevronRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        {/* Tech badges */}
        <div className="flex flex-wrap gap-1.5">
          {techBadges.map((tech) => (
            <Badge key={tech} variant="outline" className="text-xs">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="gap-2">
        <Button asChild variant="outline" size="sm" className="flex-1">
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Demo de ${title}`}
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Demo
          </a>
        </Button>
        <Button asChild variant="ghost" size="sm" className="flex-1">
          <a
            href={repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Repositório de ${title}`}
          >
            <Github className="h-3.5 w-3.5" />
            Repo
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
