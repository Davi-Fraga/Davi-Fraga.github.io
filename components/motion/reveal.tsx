"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ElementType, ReactNode } from "react";
import { useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motionConfig } from "@/lib/motion/config";
import { cn } from "@/lib/utils";

export interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "none";
  once?: boolean;
  as?: "div" | "li";
}

export function Reveal({
  children,
  className,
  delay = 0,
  direction = "up",
  once = true,
  as = "div",
}: RevealProps) {
  const scope = useRef<HTMLElement>(null);
  const { prefersReducedMotion, isReady } = useReducedMotion();
  const [state, setState] = useState<
    "idle" | "active" | "complete" | "reversing" | "reversed" | "reduced"
  >("idle");
  const Component = as as ElementType;

  useGSAP(
    () => {
      if (!isReady) return;
      if (prefersReducedMotion) {
        setState("reduced");
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      const element = scope.current;
      if (!element) return;

      setState("active");
      gsap.fromTo(
        element,
        {
          autoAlpha: 0,
          y: direction === "up" ? motionConfig.offsets.reveal : 0,
        },
        {
          autoAlpha: 1,
          y: 0,
          immediateRender: false,
          delay,
          duration: motionConfig.durations.reveal,
          ease: motionConfig.easings.reveal,
          onStart: () => setState("active"),
          onComplete: () => setState("complete"),
          onReverseComplete: () => setState("reversed"),
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            once,
            toggleActions: once ? "play none none none" : "play reverse play reverse",
            onLeaveBack: () => {
              if (!once) setState("reversing");
            },
          },
        },
      );
    },
    { scope, dependencies: [delay, direction, isReady, once, prefersReducedMotion], revertOnUpdate: true },
  );

  return (
    <Component ref={scope} className={cn(className)} data-reveal-state={state}>
      {children}
    </Component>
  );
}
