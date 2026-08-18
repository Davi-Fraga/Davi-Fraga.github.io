"use client";

import { useEffect, useRef, useState } from "react";

interface CaseReadingProgressProps {
  targetId: string;
  label?: string;
}

export function CaseReadingProgress({
  targetId,
  label = "Progresso de leitura do case",
}: CaseReadingProgressProps) {
  const [progress, setProgress] = useState(0);
  const frameRef = useRef<number | null>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateProgress = () => {
      frameRef.current = null;
      const target = document.getElementById(targetId);

      if (!target) {
        return;
      }

      const rect = target.getBoundingClientRect();
      const targetTop = rect.top + window.scrollY;
      const targetHeight = target.offsetHeight;
      const viewportHeight = window.innerHeight;
      const readableDistance = targetHeight - viewportHeight;
      const rawProgress =
        readableDistance <= 0
          ? window.scrollY < targetTop
            ? 0
            : 100
          : ((window.scrollY - targetTop) / readableDistance) * 100;
      const nextProgress = Math.min(100, Math.max(0, rawProgress));
      const integerProgress = Math.round(nextProgress);

      setProgress(integerProgress);
      barRef.current?.style.setProperty(
        "transform",
        `scaleX(${nextProgress / 100})`,
      );
    };

    const requestUpdate = () => {
      if (frameRef.current === null) {
        frameRef.current = window.requestAnimationFrame(updateProgress);
      }
    };

    requestUpdate();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [targetId]);

  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent"
    >
      <div
        ref={barRef}
        aria-hidden="true"
        className="h-full w-full origin-left scale-x-0 bg-primary"
      />
    </div>
  );
}
