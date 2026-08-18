"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMotionCapabilities } from "@/hooks/use-motion-capabilities";
import { motionConfig } from "@/lib/motion/config";
import type { ArchitectureNode, ProjectMetric } from "@/data/projects";
import { ImageReveal, type ProjectVisual } from "@/components/motion/image-reveal";
import { cn } from "@/lib/utils";

export interface ArchitectureDiagramProps {
  title: string;
  nodes: ArchitectureNode[];
  metrics: ProjectMetric[];
  visual?: ProjectVisual;
  className?: string;
}

const defaultPlaceholderVisual: ProjectVisual = { kind: "placeholder" };

export function ArchitectureDiagram({
  title,
  nodes,
  metrics,
  visual = defaultPlaceholderVisual,
  className,
}: ArchitectureDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const capabilities = useMotionCapabilities();
  const [animationState, setAnimationState] = useState<"static" | "animating" | "complete" | "reduced">("static");

  const isReduced = capabilities.isReady && capabilities.prefersReducedMotion;
  const isCapable = capabilities.isReady && capabilities.canUseStickyProjects && !isReduced;

  useGSAP(
    () => {
      if (!capabilities.isReady) {
        return;
      }

      if (isReduced) {
        setAnimationState("reduced");
        return;
      }

      if (!isCapable || !containerRef.current) {
        setAnimationState("static");
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const root = containerRef.current;
      const nodeElements = gsap.utils.toArray<HTMLElement>("[data-architecture-node]", root);
      const lines = gsap.utils.toArray<SVGPathElement | SVGLineElement>("svg [data-connector-line]", root);
      const statusIndicators = gsap.utils.toArray<HTMLElement>("[data-status-indicator]", root);
      const metricElements = gsap.utils.toArray<HTMLElement>("[data-diagram-metric]", root);
      const visualElement = root.querySelector<HTMLElement>("[data-diagram-visual]");

      // Prepare initial values
      lines.forEach((line) => {
        const length = line.getTotalLength ? line.getTotalLength() : 100;
        gsap.set(line, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });
      });

      if (nodeElements.length > 0) {
        gsap.set(nodeElements.slice(1), { opacity: 0, y: 12 });
        gsap.set(nodeElements[0], { opacity: 0, y: 8 });
      }

      if (statusIndicators.length > 0) {
        gsap.set(statusIndicators, { scale: 0, opacity: 0 });
      }

      if (metricElements.length > 0) {
        gsap.set(metricElements, { opacity: 0, y: 10 });
      }

      if (visualElement) {
        gsap.set(visualElement, { opacity: 0 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 80%",
          once: true,
          onEnter: () => setAnimationState("animating"),
        },
        onComplete: () => {
          setAnimationState("complete");
        },
      });

      // Sequence:
      // 1. Container entry / first node
      if (nodeElements[0]) {
        tl.to(nodeElements[0], {
          opacity: 1,
          y: 0,
          duration: motionConfig.durations.base,
          ease: motionConfig.easings.ui,
        });
      }

      // 2. Line strokes
      if (lines.length > 0) {
        tl.to(
          lines,
          {
            strokeDashoffset: 0,
            duration: motionConfig.durations.base,
            stagger: 0.06,
            ease: "power2.inOut",
          },
          "-=0.1",
        );
      }

      // 3. Remaining nodes
      if (nodeElements.length > 1) {
        tl.to(
          nodeElements.slice(1),
          {
            opacity: 1,
            y: 0,
            duration: motionConfig.durations.base,
            stagger: 0.08,
            ease: motionConfig.easings.reveal,
          },
          "-=0.2",
        );
      }

      // 4. Status indicators
      if (statusIndicators.length > 0) {
        tl.to(
          statusIndicators,
          {
            scale: 1,
            opacity: 1,
            duration: motionConfig.durations.fast,
            stagger: 0.04,
            ease: "back.out(2)",
          },
          "-=0.1",
        );
      }

      // 5. Metrics
      if (metricElements.length > 0) {
        tl.to(
          metricElements,
          {
            opacity: 1,
            y: 0,
            duration: motionConfig.durations.base,
            stagger: 0.06,
            ease: motionConfig.easings.ui,
          },
          "-=0.1",
        );
      }

      // 6. Visual
      if (visualElement) {
        tl.to(
          visualElement,
          {
            opacity: 1,
            duration: motionConfig.durations.visual,
            ease: motionConfig.easings.visual,
          },
          "-=0.2",
        );
      }
    },
    {
      scope: containerRef,
      dependencies: [capabilities.isReady, isReduced, isCapable],
      revertOnUpdate: true,
    },
  );

  const effectiveState = isReduced ? "reduced" : !isCapable ? "static" : animationState;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex flex-col gap-6 rounded-[var(--radius-surface)] border border-primary/30 bg-surface-elevated/90 p-4 backdrop-blur-sm sm:p-6 lg:p-8",
        className,
      )}
      data-architecture-diagram
      data-architecture-state={effectiveState}
      aria-label={`Diagrama de arquitetura — ${title}`}
    >
      <div className="flex items-center justify-between border-b border-border/50 pb-3">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-primary" />
          <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-foreground">
            Fluxo de arquitetura
          </h4>
        </div>
        <span className="font-mono text-[10px] font-medium text-muted-foreground">
          {nodes.length} etapas
        </span>
      </div>

      {/* Visual architecture diagram & SVG connections */}
      <div className="relative min-w-0">
        {/* SVG connection lines - Decorative */}
        <svg
          className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          viewBox="0 0 600 300"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M 50 150 L 550 150"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 4"
            className="opacity-40"
            data-connector-line
          />
        </svg>

        <ol className="grid min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {nodes.map((node) => (
            <li
              key={node.step}
              className="relative flex flex-col justify-between rounded-lg border border-border/70 bg-card/90 p-3.5 shadow-sm"
              data-architecture-node
            >
              <div>
                <div className="flex items-center justify-between gap-1 pb-2">
                  <span className="font-mono text-[11px] font-bold text-primary">
                    ETAPA {node.step}
                  </span>
                  <span
                    className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500"
                    data-status-indicator
                    title="Operacional em produção"
                  />
                </div>
                <h5 className="text-xs font-semibold tracking-tight text-foreground">
                  {node.title}
                </h5>
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                  {node.description}
                </p>
              </div>

              <div className="mt-3 border-t border-border/40 pt-2">
                <span className="font-mono text-[10px] font-medium text-primary/90">
                  {node.tech}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </div>

      {/* Metrics breakdown */}
      {metrics && metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-2 border-t border-border/40 pt-4 sm:grid-cols-4">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-md border border-border/50 bg-secondary/30 p-2.5"
              data-diagram-metric
            >
              <p className="break-words font-mono text-sm font-bold text-primary">
                {metric.value}
              </p>
              <p className="mt-0.5 text-[10px] font-medium text-foreground">{metric.label}</p>
              {metric.description && (
                <p className="mt-0.5 break-words text-[9px] text-muted-foreground">{metric.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Project visual slot */}
      <div data-diagram-visual>
        <ImageReveal visual={visual} testId={`diagram-visual-${title.toLowerCase().replace(/\s+/g, "-")}`} />
      </div>
    </div>
  );
}
