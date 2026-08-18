import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { MetricsSection } from "@/components/metrics-section";
import { ProjectsSection } from "@/components/projects-section";
import { AcademicProjectsSection } from "@/components/academic-projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { SkillsGrid } from "@/components/skills-grid";
import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { SkipLink } from "@/components/navigation/skip-link";

export default async function HomePage() {
  const MotionPrimitivesHarness =
    process.env.NODE_ENV !== "production" && process.env.E2E_HARNESSES === "1"
      ? (await import("@/components/motion/motion-primitives-harness"))
          .MotionPrimitivesHarness
      : null;
  return (
    <>
      <SkipLink />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <MetricsSection />
        <ProjectsSection />
        <AcademicProjectsSection />
        <ExperienceSection />
        <SkillsGrid />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      {MotionPrimitivesHarness ? <MotionPrimitivesHarness /> : null}
    </>
  );
}
