"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X, Github, Linkedin, FileText, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

const navLinks = [
  { label: "Projetos", href: "/#projetos" },
  { label: "Cases Técnicos", href: "/#cases" },
  { label: "Acadêmicos", href: "/#academicos" },
  { label: "Experiência", href: "/#experiencia" },
  { label: "Stack", href: "/#stack" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Contato", href: "/#contato" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const sections = ["projetos", "cases", "academicos", "experiencia", "stack", "sobre", "contato"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      // Clear hash if any
      if (window.location.hash) {
        window.history.pushState(null, "", window.location.pathname);
      }
    }
  };

  return (
    <header
      className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60"
      role="banner"
    >
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6"
        aria-label="Navegação principal"
      >
        {/* Logo / Brand with Scroll-to-Top handler */}
        <Link
          href="/"
          onClick={handleLogoClick}
          className="group flex items-center gap-2 text-base font-semibold text-foreground transition-colors hover:text-primary cursor-pointer"
          aria-label={`${profile.name} - Voltar ao topo`}
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-secondary/60 text-primary transition-colors group-hover:border-primary/50 group-hover:bg-primary/10">
            <Code2 className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
              {profile.name}
            </span>
            <span className="hidden text-[10px] font-mono text-muted-foreground sm:inline leading-none">
              Software Engineer
            </span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex" role="list">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("/#", "");
            const isActive = activeSection === sectionId;

            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:text-foreground",
                    isActive
                      ? "text-foreground font-semibold"
                      : "text-muted-foreground"
                  )}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-primary" />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        {/* Action icons & CTA */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Social Links */}
          {profile.links.github && (
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
              aria-label="Perfil no GitHub"
            >
              <a
                href={profile.links.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
          )}

          {profile.links.linkedin && (
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
              aria-label="Perfil no LinkedIn"
            >
              <a
                href={profile.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          )}

          {/* Theme toggle */}
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Alternar tema claro/escuro"
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          )}

          {/* Resume CTA */}
          <Button
            asChild
            size="sm"
            variant="outline"
            className="hidden sm:inline-flex gap-1.5 border-border hover:border-primary/50 hover:bg-primary/5 text-xs font-medium"
          >
            <a
              href={profile.links.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Curriculo-Davi-Fraga.pdf"
            >
              <FileText className="h-3.5 w-3.5 text-primary" />
              <span>Currículo</span>
            </a>
          </Button>

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden h-9 w-9 text-muted-foreground hover:text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      <div
        className={cn(
          "overflow-hidden border-b border-border/50 bg-background/95 backdrop-blur-lg transition-all duration-200 ease-in-out lg:hidden",
          mobileOpen ? "max-h-96 py-4" : "max-h-0 py-0"
        )}
      >
        <div className="mx-auto max-w-6xl px-4 space-y-3">
          <ul className="flex flex-col gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="pt-2 border-t border-border/50 flex flex-col gap-2">
            <Button
              asChild
              size="sm"
              variant="outline"
              className="w-full justify-center gap-2"
            >
              <a
                href={profile.links.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="Curriculo-Davi-Fraga.pdf"
              >
                <FileText className="h-4 w-4 text-primary" />
                Baixar Currículo (PDF)
              </a>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
