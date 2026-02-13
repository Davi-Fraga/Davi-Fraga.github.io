"use client";

import { useState } from "react";
import { Mail, Github, Linkedin, Phone, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/section-title";
import { FadeIn } from "@/components/motion-wrapper";
import { ContactForm } from "@/components/contact-form";
import { profile } from "@/data/profile";
import { toast } from "sonner";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(profile.contact.email);
      setCopied(true);
      toast.success("Email copiado!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Nao foi possivel copiar.");
    }
  }

  const socialLinks = [
    {
      label: "GitHub",
      icon: Github,
      href: profile.contact.github,
    },
    {
      label: "LinkedIn",
      icon: Linkedin,
      href: profile.contact.linkedin,
    },
    {
      label: "WhatsApp",
      icon: Phone,
      href: profile.contact.whatsapp,
    },
  ];

  return (
    <section id="contato" className="py-20 md:py-28" aria-label="Contato">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <SectionTitle
          title="Contato"
          subtitle={profile.contact.message}
        />

        <div className="grid gap-8 md:grid-cols-2">
          {/* Left: links */}
          <FadeIn direction="left">
            <div className="space-y-6">
              {/* Email */}
              <div className="rounded-lg border border-border bg-card p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  Email
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <span className="flex-1 truncate text-sm text-muted-foreground font-mono">
                    {profile.contact.email}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyEmail}
                    aria-label="Copiar email"
                    className="h-8 w-8 shrink-0"
                  >
                    {copied ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Social links */}
              <div className="flex flex-col gap-2">
                {socialLinks.map((link) => (
                  <Button
                    key={link.label}
                    asChild
                    variant="outline"
                    className="justify-start gap-3"
                  >
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Abrir ${link.label}`}
                    >
                      <link.icon className="h-4 w-4 text-primary" />
                      {link.label}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Right: form */}
          <FadeIn direction="right">
            <ContactForm />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
