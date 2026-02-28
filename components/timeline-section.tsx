"use client";

import { GraduationCap, Briefcase } from "lucide-react";
import { SectionTitle } from "@/components/section-title";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { profile } from "@/data/profile";

interface TimelineItemProps {
  title: string;
  institution: string;
  period: string;
}

function TimelineItem({ title, institution, period }: TimelineItemProps) {
  return (
    <StaggerItem>
      <div className="relative flex gap-4 pb-8 last:pb-0">
        {/* Line */}
        <div className="absolute left-[11px] top-6 h-full w-px bg-border last:hidden" />
        {/* Dot */}
        <div className="relative mt-1.5 h-6 w-6 shrink-0">
          <div className="absolute inset-0 rounded-full border-2 border-primary bg-background" />
          <div className="absolute inset-[5px] rounded-full bg-primary" />
        </div>
        {/* Content */}
        <div>
          <p className="font-semibold text-foreground leading-snug">{title}</p>
          <p className="mt-0.5 text-sm text-muted-foreground">{institution}</p>
          <p className="mt-1 text-xs font-medium uppercase tracking-wider text-primary">
            {period}
          </p>
        </div>
      </div>
    </StaggerItem>
  );
}

export function TimelineSection() {
  return (
    <section
      id="experiencia"
      className="py-20 md:py-28"
      aria-label={profile.timeline.sectionTitle}
    >
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <SectionTitle
          title={profile.timeline.sectionTitle}
          subtitle={profile.timeline.sectionSubtitle}
        />

        <div className="grid gap-12 md:grid-cols-2">
          {/* Education */}
          <FadeIn>
            <div>
              <div className="mb-6 flex items-center gap-2 text-foreground">
                <GraduationCap className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">{profile.timeline.educationLabel}</h3>
              </div>
              <StaggerContainer>
                {profile.timeline.education.map((item) => (
                  <TimelineItem
                    key={item.title}
                    title={item.title}
                    institution={item.institution}
                    period={item.period}
                  />
                ))}
              </StaggerContainer>
            </div>
          </FadeIn>

          {/* Experience */}
          <FadeIn delay={0.15}>
            <div>
              <div className="mb-6 flex items-center gap-2 text-foreground">
                <Briefcase className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-semibold">{profile.timeline.experienceLabel}</h3>
              </div>
              <StaggerContainer>
                {profile.timeline.experience.map((item) => (
                  <TimelineItem
                    key={item.title}
                    title={item.title}
                    institution={item.institution}
                    period={item.period}
                  />
                ))}
              </StaggerContainer>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
