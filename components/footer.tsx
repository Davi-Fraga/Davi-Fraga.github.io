import { Github, Linkedin, Mail, Code2 } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 bg-card py-10" role="contentinfo">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-4 sm:flex-row sm:px-6">
        {/* Brand & Role */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <div className="flex items-center gap-2 text-foreground font-bold">
            <Code2 className="h-4 w-4 text-primary" />
            <span>{profile.name}</span>
            <span className="text-muted-foreground/50 font-normal">|</span>
            <span className="text-xs font-mono text-primary font-medium">
              {profile.footer.role}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            © {currentYear} {profile.name}. Todos os direitos reservados.
          </p>
        </div>

        {/* Links with comfortable 44px min touch target */}
        <div className="flex items-center gap-2">
          {profile.links.github && (
            <a
              href={profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          )}

          {profile.links.linkedin && (
            <a
              href={profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}

          {profile.contact.channels.email && (
            <a
              href={`mailto:${profile.contact.channels.email}`}
              className="flex h-11 w-11 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
