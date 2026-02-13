"use client";

import { ExternalLink, Github, Sparkles } from "lucide-react";
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
  highlights: string;
  techBadges: readonly string[];
  demoUrl: string;
  repoUrl: string;
}

export function ProjectCard({
  title,
  description,
  highlights,
  techBadges,
  demoUrl,
  repoUrl,
}: ProjectCardProps) {
  return (
    <Card className="group flex h-full flex-col transition-colors hover:border-primary/30">
      <CardHeader>
        <CardTitle className="text-lg leading-snug">{title}</CardTitle>
        <CardDescription className="mt-1 text-sm leading-relaxed">{description}</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
          <span>{highlights}</span>
        </div>

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
            aria-label={`Repositorio de ${title}`}
          >
            <Github className="h-3.5 w-3.5" />
            Repo
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
