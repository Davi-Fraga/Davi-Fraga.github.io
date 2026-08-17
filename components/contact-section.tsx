"use client";

import { useState } from "react";
import { Mail, Linkedin, Github, MessageSquare, Copy, Check, ArrowUpRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/motion-wrapper";
import { profile } from "@/data/profile";
import { toast } from "sonner";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (profile.contact.channels.email) {
      navigator.clipboard.writeText(profile.contact.channels.email);
      setCopied(true);
      toast.success("E-mail copiado para a área de transferência!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section id="contato" className="py-20 md:py-28" aria-label="Contato profissional">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <FadeIn className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary mb-3 inline-block">
            [ OPORTUNIDADES & CONEXÃO ]
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {profile.contact.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base text-pretty">
            {profile.contact.subtitle}
          </p>
        </FadeIn>

        {/* Balanced 4-Card Grid */}
        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: E-mail */}
          <StaggerItem>
            <div className="flex h-full flex-col justify-between rounded-xl border border-border/80 bg-card p-5 sm:p-6 transition-all hover:border-primary/40 hover:shadow-sm">
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">E-mail</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Propostas e vagas formais
                  </p>
                </div>
                <div className="rounded-md border border-border/70 bg-secondary/40 p-2 text-center">
                  <span className="font-mono text-xs text-foreground font-semibold truncate block select-all">
                    {profile.contact.channels.email}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex flex-col gap-2 pt-3 border-t border-border/40">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopyEmail}
                  className="w-full gap-1.5 text-xs h-8"
                  aria-label="Copiar endereço de e-mail"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-primary" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>Copiar E-mail</span>
                    </>
                  )}
                </Button>
                <Button asChild size="sm" className="w-full gap-1.5 text-xs h-8 font-semibold">
                  <a href={`mailto:${profile.contact.channels.email}`}>
                    <Send className="h-3.5 w-3.5" />
                    <span>Escrever E-mail</span>
                  </a>
                </Button>
              </div>
            </div>
          </StaggerItem>

          {/* Card 2: LinkedIn */}
          <StaggerItem>
            <div className="flex h-full flex-col justify-between rounded-xl border border-border/80 bg-card p-5 sm:p-6 transition-all hover:border-primary/40 hover:shadow-sm">
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Linkedin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">LinkedIn</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Conexões e networking
                  </p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Acompanhe atualizações sobre minha carreira e formação em Engenharia de Software.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/40">
                <Button asChild variant="outline" size="sm" className="w-full gap-1.5 text-xs h-8 border-border hover:border-primary/40">
                  <a
                    href={profile.contact.channels.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Acessar perfil no LinkedIn"
                  >
                    <span>Abrir Perfil</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          </StaggerItem>

          {/* Card 3: GitHub */}
          <StaggerItem>
            <div className="flex h-full flex-col justify-between rounded-xl border border-border/80 bg-card p-5 sm:p-6 transition-all hover:border-primary/40 hover:shadow-sm">
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Github className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">GitHub</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Código e contribuições
                  </p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Explore commits, arquiteturas e projetos com histórico aberto no GitHub.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/40">
                <Button asChild variant="outline" size="sm" className="w-full gap-1.5 text-xs h-8 border-border hover:border-primary/40">
                  <a
                    href={profile.contact.channels.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Acessar perfil no GitHub"
                  >
                    <span>Ver Repositórios</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </Button>
              </div>
            </div>
          </StaggerItem>

          {/* Card 4: WhatsApp */}
          <StaggerItem>
            <div className="flex h-full flex-col justify-between rounded-xl border border-border/80 bg-card p-5 sm:p-6 transition-all hover:border-primary/40 hover:shadow-sm">
              <div className="space-y-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-foreground">WhatsApp</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Contato direto e ágil
                  </p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Canal direto para mensagens rápidas sobre oportunidades e dúvidas.
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-border/40">
                <Button asChild variant="outline" size="sm" className="w-full gap-1.5 text-xs h-8 border-border hover:border-emerald-500/40">
                  <a
                    href={profile.contact.channels.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Enviar mensagem no WhatsApp"
                  >
                    <span>Enviar Mensagem</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
                  </a>
                </Button>
              </div>
            </div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
}
