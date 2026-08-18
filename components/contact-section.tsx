import { Mail, Linkedin, Github, MessageSquare, ArrowUpRight, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CopyEmailButton } from "@/components/contact/copy-email-button";
import { MagneticContactCard } from "@/components/contact/magnetic-contact-card";
import { profile } from "@/data/profile";

export function ContactSection() {

  return (
    <section id="contato" className="py-20 md:py-28" aria-label="Contato profissional">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-primary mb-3 inline-block">
            [ OPORTUNIDADES & CONEXÃO ]
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {profile.contact.title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base text-pretty">
            {profile.contact.subtitle}
          </p>
        </div>

        {/* Balanced 4-Card Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: E-mail */}
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
              <div className="rounded-md border border-border/70 bg-secondary/40 p-2.5 text-center">
                <span className="font-mono text-xs text-foreground font-semibold truncate block select-all">
                  {profile.contact.channels.email}
                </span>
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-2.5 pt-3 border-t border-border/40">
              <CopyEmailButton email={profile.contact.channels.email} />

              <MagneticContactCard>
                <Button
                  asChild
                  size="sm"
                  className="w-full gap-2 text-xs min-h-[44px] sm:min-h-[36px] font-semibold"
                >
                  <a
                    href={`mailto:${profile.contact.channels.email}`}
                    aria-label="Escrever e-mail para Davi Fraga"
                  >
                    <Send className="h-4 w-4" />
                    <span>Escrever E-mail</span>
                  </a>
                </Button>
              </MagneticContactCard>
            </div>
          </div>

          {/* Card 2: LinkedIn */}
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
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full gap-2 text-xs min-h-[44px] sm:min-h-[36px] border-border hover:border-primary/40"
              >
                <a
                  href={profile.contact.channels.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Acessar perfil no LinkedIn"
                >
                  <span>Abrir Perfil</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Card 3: GitHub */}
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
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full gap-2 text-xs min-h-[44px] sm:min-h-[36px] border-border hover:border-primary/40"
              >
                <a
                  href={profile.contact.channels.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Acessar perfil no GitHub"
                >
                  <span>Ver Repositórios</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Card 4: WhatsApp */}
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
              <Button
                asChild
                variant="outline"
                size="sm"
                className="w-full gap-2 text-xs min-h-[44px] sm:min-h-[36px] border-border hover:border-emerald-500/40"
              >
                <a
                  href={profile.contact.channels.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Enviar mensagem no WhatsApp"
                >
                  <span>Enviar Mensagem</span>
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
