import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { AboutSection } from "@/components/about-section";
import { SkillsGrid } from "@/components/skills-grid";
import { ProjectsSection } from "@/components/projects-section";
import { TimelineSection } from "@/components/timeline-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <SkillsGrid />
        <ProjectsSection />
        <TimelineSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
