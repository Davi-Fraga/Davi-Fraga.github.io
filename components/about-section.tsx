"use client";

import { SectionTitle } from "@/components/section-title";
import { FadeIn } from "@/components/motion-wrapper";
import { profile } from "@/data/profile";

export function AboutSection() {
  return (
    <section id="sobre" className="py-20 md:py-28" aria-label={profile.about.sectionTitle}>
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <SectionTitle title={profile.about.sectionTitle} subtitle={profile.about.sectionSubtitle} />

        <FadeIn>
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground md:text-lg">
            {profile.about.paragraphs.map((p, i) => (
              <p key={i} className="text-pretty">{p}</p>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
