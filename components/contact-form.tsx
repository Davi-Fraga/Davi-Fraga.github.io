"use client";

import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Send } from "lucide-react";

export function ContactForm() {
  const [sending, setSending] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const message = data.get("message") as string;

    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error("Preencha todos os campos.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Insira um email valido.");
      return;
    }

    setSending(true);
    setTimeout(() => {
      setSending(false);
      toast.success("Mensagem enviada! (Conecte um provider depois)");
      form.reset();
    }, 1200);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-lg border border-border bg-card p-6"
      aria-label="Formulario de contato"
    >
      <div className="space-y-2">
        <Label htmlFor="contact-name">Nome</Label>
        <Input
          id="contact-name"
          name="name"
          placeholder="Seu nome"
          required
          autoComplete="name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-email">Email</Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          placeholder="seu@email.com"
          required
          autoComplete="email"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">Mensagem</Label>
        <Textarea
          id="contact-message"
          name="message"
          placeholder="Conte sobre o projeto ou oportunidade..."
          rows={4}
          required
        />
      </div>

      <Button type="submit" className="w-full" disabled={sending}>
        <Send className="h-4 w-4" />
        {sending ? "Enviando..." : "Enviar mensagem"}
      </Button>
    </form>
  );
}
