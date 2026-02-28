import { Github, Linkedin, Phone, Instagram, Terminal } from "lucide-react";
import { profile } from "@/data/profile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const socialLinks = [
  { label: "GitHub", icon: Github, href: profile.contact.social.github },
  { label: "LinkedIn", icon: Linkedin, href: profile.contact.social.linkedin },
  { label: "WhatsApp", icon: Phone, href: profile.contact.social.whatsapp },
  { label: "Instagram", icon: Instagram, href: profile.contact.social.instagram },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card" role="contentinfo">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 md:flex-row md:justify-between md:px-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Terminal className="h-4 w-4 text-primary" />
          <span>{profile.footer.text}</span>
        </div>

        <TooltipProvider delayDuration={200}>
          <div className="flex items-center gap-3">
            {socialLinks.map((link) => {
              const isDisabled = link.href === null;

              if (isDisabled) {
                return (
                  <Tooltip key={link.label}>
                    <TooltipTrigger asChild>
                      <span
                        className="inline-flex cursor-not-allowed text-muted-foreground/40"
                        aria-disabled="true"
                        aria-label={`${link.label} (em breve)`}
                      >
                        <link.icon className="h-5 w-5" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Em breve</p>
                    </TooltipContent>
                  </Tooltip>
                );
              }

              return (
                <a
                  key={link.label}
                  href={link.href!}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted-foreground transition-colors hover:text-primary"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              );
            })}
          </div>
        </TooltipProvider>
      </div>
    </footer>
  );
}
