import { Github, Linkedin, Phone, Terminal } from "lucide-react";
import { profile } from "@/data/profile";

const socialLinks = [
  { label: "GitHub", icon: Github, href: profile.contact.social.github },
  { label: "LinkedIn", icon: Linkedin, href: profile.contact.social.linkedin },
  { label: "WhatsApp", icon: Phone, href: profile.contact.social.whatsapp },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card" role="contentinfo">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 md:flex-row md:justify-between md:px-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Terminal className="h-4 w-4 text-primary" />
          <span>
            {profile.footer.text} &copy; {year} {profile.name}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href!}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground transition-colors hover:text-primary"
              aria-label={link.label}
            >
              <link.icon className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
