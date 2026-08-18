"use client";

import Image from "next/image";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motionConfig } from "@/lib/motion/config";
import { cn } from "@/lib/utils";

export interface RealProjectImage {
  kind: "image";
  src: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
}

export interface TechnicalPlaceholder {
  kind: "placeholder";
  label?: string;
}

export type ProjectVisual = RealProjectImage | TechnicalPlaceholder;

interface ImageRevealProps {
  visual: ProjectVisual;
  className?: string;
  testId?: string;
}

export function ImageReveal({ visual, className, testId }: ImageRevealProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const { prefersReducedMotion, isReady } = useReducedMotion();
  const state = isReady && prefersReducedMotion ? "reduced" : "complete";

  useGSAP(
    () => {
      if (!isReady || prefersReducedMotion || !rootRef.current) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      gsap.fromTo(
        rootRef.current,
        { clipPath: "inset(0 0 100% 0)", opacity: 0, scale: motionConfig.imageScale },
        {
          clipPath: "inset(0 0 0% 0)",
          opacity: 1,
          scale: 1,
          duration: motionConfig.durations.visual,
          ease: motionConfig.easings.visual,
          scrollTrigger: {
            trigger: rootRef.current,
            start: "top 88%",
            once: true,
          },
        },
      );
    },
    { scope: rootRef, dependencies: [isReady, prefersReducedMotion], revertOnUpdate: true },
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface-elevated",
        className,
      )}
      data-image-reveal-state={state}
      data-project-visual={visual.kind}
      data-testid={testId}
    >
      {visual.kind === "image" ? (
        <Image
          src={visual.src}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          sizes={visual.sizes}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[linear-gradient(135deg,hsl(var(--surface-elevated)),hsl(var(--surface)))] p-5">
          <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(hsl(var(--border))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border))_1px,transparent_1px)] [background-size:32px_32px]" />
          <span className="relative max-w-[24ch] text-center font-mono text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
            {visual.label ?? "Visual técnico — screenshot não disponível"}
          </span>
        </div>
      )}
    </div>
  );
}
