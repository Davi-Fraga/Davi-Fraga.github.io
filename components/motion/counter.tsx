"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useState } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { motionConfig } from "@/lib/motion/config";

export interface ParsedCounterValue {
  numericValue: number | null;
  prefix: string;
  suffix: string;
  locale: "pt-BR";
  finalValue: string;
}

export interface CounterProps {
  value: string;
  duration?: number;
  ariaLabel?: string;
}

export function parseCounterValue(value: string): ParsedCounterValue {
  const match = value.match(/^(\D*)(\d{1,3}(?:\.\d{3})*|\d+)(\D*)$/u);
  if (!match) {
    return { numericValue: null, prefix: "", suffix: "", locale: "pt-BR", finalValue: value };
  }

  return {
    numericValue: Number.parseInt(match[2].replaceAll(".", ""), 10),
    prefix: match[1],
    suffix: match[3],
    locale: "pt-BR",
    finalValue: value,
  };
}

export function Counter({ value, duration = motionConfig.durations.visual, ariaLabel }: CounterProps) {
  const element = useRef<HTMLSpanElement>(null);
  const parsed = parseCounterValue(value);
  const { prefersReducedMotion, isReady } = useReducedMotion();
  const [state, setState] = useState<"idle" | "active" | "complete" | "reduced" | "static">(
    parsed.numericValue === null ? "static" : "idle",
  );

  useGSAP(
    () => {
      if (!isReady || parsed.numericValue === null) return;
      const target = element.current;
      if (!target) return;

      if (prefersReducedMotion) {
        target.textContent = parsed.finalValue;
        setState("reduced");
        return;
      }

      gsap.registerPlugin(ScrollTrigger);
      const counter = { value: 0 };
      setState("active");
      gsap.to(counter, {
        value: parsed.numericValue,
        duration: gsap.utils.clamp(
          motionConfig.durations.counters.min,
          motionConfig.durations.counters.max,
          duration,
        ),
        ease: motionConfig.easings.ui,
        snap: { value: 1 },
        onUpdate: () => {
          target.textContent = `${parsed.prefix}${Math.round(counter.value).toLocaleString(parsed.locale)}${parsed.suffix}`;
        },
        onComplete: () => {
          target.textContent = parsed.finalValue;
          setState("complete");
        },
        scrollTrigger: {
          trigger: target,
          start: "top 90%",
          once: true,
        },
      });
    },
    {
      scope: element,
      dependencies: [duration, isReady, parsed.finalValue, parsed.numericValue, parsed.prefix, parsed.suffix, prefersReducedMotion],
      revertOnUpdate: true,
    },
  );

  return (
    <span ref={element} aria-label={ariaLabel ?? parsed.finalValue} data-counter-state={state}>
      {parsed.finalValue}
    </span>
  );
}
