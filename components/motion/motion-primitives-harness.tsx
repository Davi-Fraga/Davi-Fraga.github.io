"use client";

import { useState, useSyncExternalStore } from "react";

import { CopyEmailButton } from "@/components/contact/copy-email-button";
import { parseCounterValue } from "@/components/motion/counter";
import { Reveal } from "@/components/motion/reveal";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";

const parserFixtures = ["578+", "1.000+", "Em produção"] as const;
const subscribe = () => () => undefined;
const getServerSnapshot = () => false;
const getSnapshot = () =>
  new URLSearchParams(window.location.search).get("motion-primitives-harness") === "1";

export function MotionPrimitivesHarness() {
  const isEnabled = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isProviderMounted, setIsProviderMounted] = useState(true);

  if (!isEnabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none absolute left-0 top-[200vh]">
      {parserFixtures.map((fixture) => (
        <output data-parser-result key={fixture}>
          {JSON.stringify(parseCounterValue(fixture))}
        </output>
      ))}
      <Reveal once={false}>
        <div data-testid="repeatable-reveal">Reveal observability</div>
      </Reveal>
      <div data-testid="strict-mode-copy-harness" className="pointer-events-auto" aria-hidden={undefined}>
        <CopyEmailButton email="strict-mode@example.com" />
      </div>
      {isProviderMounted ? <SmoothScrollProvider>{null}</SmoothScrollProvider> : null}
      <button
        type="button"
        className="pointer-events-auto"
        aria-label={
          isProviderMounted ? "Desmontar smooth scroll" : "Remontar smooth scroll"
        }
        onClick={() => setIsProviderMounted((mounted) => !mounted)}
      />
    </div>
  );
}
