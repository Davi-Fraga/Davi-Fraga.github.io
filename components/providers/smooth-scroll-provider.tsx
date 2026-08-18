"use client";

import { useEffect, type ReactNode } from "react";
import { useMotionCapabilities } from "@/hooks/use-motion-capabilities";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export function SmoothScrollProvider({
  children,
}: SmoothScrollProviderProps): React.JSX.Element {
  const capabilities = useMotionCapabilities();

  useEffect(() => {
    if (!capabilities.isReady) {
      return;
    }

    const root = document.documentElement;
    const updateCounter = (key: keyof DOMStringMap, change: number) => {
      root.dataset[key] = String(
        Math.max(0, Number(root.dataset[key] ?? "0") + change),
      );
    };
    root.dataset.motion = capabilities.prefersReducedMotion ? "reduced" : "full";
    root.dataset.lenisInstances ??= "0";
    root.dataset.lenisTickerCallbacks ??= "0";
    root.dataset.lenisScrollListeners ??= "0";
    root.dataset.lenisCreated ??= "0";
    root.dataset.lenisDestroyed ??= "0";

    if (capabilities.prefersNativeScroll) {
      delete root.dataset.lenis;
      return () => {
        delete root.dataset.motion;
        delete root.dataset.lenis;
      };
    }

    let disposed = false;
    let cleanup: (() => void) | undefined;

    void Promise.all([
      import("lenis"),
      import("gsap"),
      import("gsap/ScrollTrigger"),
    ]).then(([{ default: Lenis }, { default: gsap }, { ScrollTrigger }]) => {
      if (disposed) {
        return;
      }

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        anchors: true,
        smoothWheel: true,
      });
      const updateScrollTrigger = () => ScrollTrigger.update();
      const updateLenis = (time: number) => lenis.raf(time * 1000);

      lenis.on("scroll", updateScrollTrigger);
      updateCounter("lenisScrollListeners", 1);
      gsap.ticker.add(updateLenis);
      updateCounter("lenisTickerCallbacks", 1);
      root.dataset.lenis = "active";
      updateCounter("lenisInstances", 1);
      updateCounter("lenisCreated", 1);

      cleanup = () => {
        gsap.ticker.remove(updateLenis);
        updateCounter("lenisTickerCallbacks", -1);
        lenis.off("scroll", updateScrollTrigger);
        updateCounter("lenisScrollListeners", -1);
        lenis.destroy();
        updateCounter("lenisInstances", -1);
        updateCounter("lenisDestroyed", 1);
        delete root.dataset.lenis;
      };
    });

    return () => {
      disposed = true;
      cleanup?.();
      delete root.dataset.motion;
      delete root.dataset.lenis;
    };
  }, [capabilities]);

  return <>{children}</>;
}
