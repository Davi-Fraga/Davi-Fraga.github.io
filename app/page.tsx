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

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content">
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
    </>
  );
}
