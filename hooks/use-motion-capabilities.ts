"use client";

import { useEffect, useState } from "react";
import { motionConfig } from "@/lib/motion/config";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface MotionCapabilities {
  isReady: boolean;
  prefersReducedMotion: boolean;
  isDesktop: boolean;
  hasHover: boolean;
  hasFinePointer: boolean;
  hasCoarsePointer: boolean;
  hasTouch: boolean;
  prefersNativeScroll: boolean;
  canUseStickyProjects: boolean;
}

const initialCapabilities: MotionCapabilities = {
  isReady: false,
  prefersReducedMotion: false,
  isDesktop: false,
  hasHover: false,
  hasFinePointer: false,
  hasCoarsePointer: false,
  hasTouch: false,
  prefersNativeScroll: true,
  canUseStickyProjects: false,
};

export function useMotionCapabilities(): MotionCapabilities {
  const { prefersReducedMotion, isReady: isReducedMotionReady } = useReducedMotion();
  const [mediaCapabilities, setMediaCapabilities] =
    useState<MotionCapabilities>(initialCapabilities);

  useEffect(() => {
    if (!isReducedMotionReady) {
      return;
    }

    const queries = {
      desktop: window.matchMedia(
        `(min-width: ${motionConfig.breakpoints.desktopMin}px)`,
      ),
      hover: window.matchMedia("(hover: hover)"),
      finePointer: window.matchMedia("(pointer: fine)"),
      coarsePointer: window.matchMedia("(pointer: coarse)"),
    };

    const updateCapabilities = () => {
      const hasTouch = navigator.maxTouchPoints > 0;
      const prefersNativeScroll =
        prefersReducedMotion ||
        !queries.desktop.matches ||
        queries.coarsePointer.matches ||
        hasTouch;

      setMediaCapabilities({
        isReady: true,
        prefersReducedMotion,
        isDesktop: queries.desktop.matches,
        hasHover: queries.hover.matches,
        hasFinePointer: queries.finePointer.matches,
        hasCoarsePointer: queries.coarsePointer.matches,
        hasTouch,
        prefersNativeScroll,
        canUseStickyProjects:
          !prefersNativeScroll &&
          queries.desktop.matches &&
          queries.hover.matches &&
          queries.finePointer.matches,
      });
    };

    updateCapabilities();

    Object.values(queries).forEach((query) =>
      query.addEventListener("change", updateCapabilities),
    );

    return () => {
      Object.values(queries).forEach((query) =>
        query.removeEventListener("change", updateCapabilities),
      );
    };
  }, [isReducedMotionReady, prefersReducedMotion]);

  return mediaCapabilities;
}
