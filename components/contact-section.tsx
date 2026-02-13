"use client";

import { Github, Linkedin, Instagram, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/motion-wrapper";
import { profile } from "@/data/profile";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const socialItems = [
  {
    label: "GitHub",
    icon: Github,
    href: profile.contact.social.github,
  },
  {
    label: "LinkedIn",
    icon: Linkedin,
    href: profile.contact.social.linkedin,
  },
  {
    label: "Instagram",
    icon: Instagram,
    href: profile.contact.social.instagram,
  },
];

export function ContactSection() {
  return (
    <section id="contato" className="py-20 md:py-28" aria-label="Contato">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        {/* Custom title with highlighted word */}
        <FadeIn className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            Fale <span className="text-primary">Comigo</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-base md:text-lg text-pretty">
            {profile.contact.message}
          </p>
        </FadeIn>

        <div className="grid gap-6 md:grid-cols-2">
          {/* LEFT CARD -- Vamos Trabalhar Juntos */}
          <FadeIn direction="left">
            <div className="flex h-full flex-col justify-between rounded-xl border border-border bg-card p-6 md:p-8">
              <div>
                <h3 className="text-xl font-bold text-foreground md:text-2xl">
                  Vamos Trabalhar Juntos
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
                  Estou sempre aberto a novos projetos e oportunidades de
                  colaboracao. Minha prioridade e criar solucoes que realmente
                  fazem a diferenca.
                </p>

                {/* WhatsApp info block */}
                <div className="mt-6 flex items-center gap-3 rounded-lg border border-border bg-secondary/50 px-4 py-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">
                      WhatsApp
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Resposta rapida garantida
                    </p>
                  </div>
                </div>
              </div>

              {/* Social icons row */}
              <div className="mt-8">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Me siga nas redes sociais
                </p>
                <TooltipProvider delayDuration={200}>
                  <div className="flex items-center gap-3">
                    {socialItems.map((item) => {
                      const isDisabled = item.href === null;

                      if (isDisabled) {
                        return (
                          <Tooltip key={item.label}>
                            <TooltipTrigger asChild>
                              <span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  disabled
                                  className="h-10 w-10 cursor-not-allowed opacity-40"
                                  aria-label={`${item.label} (em breve)`}
                                >
                                  <item.icon className="h-5 w-5" />
                                </Button>
                              </span>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Em breve</p>
                            </TooltipContent>
                          </Tooltip>
                        );
                      }

                      return (
                        <Tooltip key={item.label}>
                          <TooltipTrigger asChild>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-10 w-10 transition-colors hover:border-primary hover:text-primary"
                              asChild
                            >
                              <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Abrir ${item.label}`}
                              >
                                <item.icon className="h-5 w-5" />
                              </a>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{item.label}</p>
                          </TooltipContent>
                        </Tooltip>
                      );
                    })}
                  </div>
                </TooltipProvider>
              </div>
            </div>
          </FadeIn>

          {/* RIGHT CARD -- Contato Direto */}
          <FadeIn direction="right">
            <div className="flex h-full flex-col items-center justify-center rounded-xl border border-border bg-card p-6 text-center md:p-8">
              {/* Large paper-plane icon */}
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Send className="h-8 w-8 text-primary" />
              </div>

              <h3 className="text-xl font-bold text-foreground md:text-2xl">
                Contato Direto
              </h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground md:text-base">
                Clique no botao abaixo para iniciar uma conversa no WhatsApp e
                discutir seu projeto.
              </p>

              <Button
                asChild
                size="lg"
                className="mt-8 w-full max-w-xs gap-2"
              >
                <a
                  href={profile.contact.social.whatsapp!}
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Iniciar conversa no WhatsApp"
                >
                  <Phone className="h-4 w-4" />
                  Iniciar Conversa no WhatsApp
                </a>
              </Button>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
