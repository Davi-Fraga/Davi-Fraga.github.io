"use client";

import { useEffect, useRef, useState } from "react";
import { Copy, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export type ClipboardFeedback = "idle" | "success" | "error";

interface CopyEmailButtonProps {
  email: string;
  className?: string;
}

export function CopyEmailButton({ email, className }: CopyEmailButtonProps) {
  const [feedback, setFeedback] = useState<ClipboardFeedback>("idle");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const attemptRef = useRef(0);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
      attemptRef.current += 1;
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const scheduleReset = (attempt: number, delay: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (mountedRef.current && attemptRef.current === attempt) {
        setFeedback("idle");
      }
    }, delay);
  };

  const handleCopy = async () => {
    const attempt = ++attemptRef.current;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (!email) {
      if (!mountedRef.current || attemptRef.current !== attempt) return;
      setFeedback("error");
      toast.error("Endereço de e-mail não disponível.");
      scheduleReset(attempt, 3000);
      return;
    }

    try {
      if (typeof navigator === "undefined" || !navigator.clipboard?.writeText) {
        throw new Error("Clipboard API indisponível");
      }
      await navigator.clipboard.writeText(email);
      if (!mountedRef.current || attemptRef.current !== attempt) return;
      setFeedback("success");
      toast.success("E-mail copiado para a área de transferência!");
      scheduleReset(attempt, 2500);
    } catch {
      if (!mountedRef.current || attemptRef.current !== attempt) return;
      setFeedback("error");
      toast.error("Não foi possível copiar o e-mail.");
      scheduleReset(attempt, 3000);
    }
  };

  const announcement =
    feedback === "success"
      ? "E-mail copiado"
      : feedback === "error"
      ? "Não foi possível copiar o e-mail"
      : "";

  return (
    <div className="w-full">
      <span
        data-testid="copy-email-announcer"
        className="sr-only"
        aria-live="polite"
        role="status"
      >
        {announcement}
      </span>
      <Button
        type="button"
        size="sm"
        variant="outline"
        onClick={handleCopy}
        className={className ?? "w-full gap-2 text-xs min-h-[44px] sm:min-h-[36px]"}
        aria-label="Copiar endereço de e-mail"
      >
        {feedback === "success" ? (
          <>
            <Check className="h-4 w-4 text-primary" />
            <span>E-mail copiado</span>
          </>
        ) : feedback === "error" ? (
          <>
            <AlertCircle className="h-4 w-4 text-destructive" />
            <span>Erro ao copiar</span>
          </>
        ) : (
          <>
            <Copy className="h-4 w-4" />
            <span>Copiar E-mail</span>
          </>
        )}
      </Button>
    </div>
  );
}
