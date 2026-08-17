import { FadeIn } from "@/components/motion-wrapper";
import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionTitleProps) {
  return (
    <FadeIn
      className={cn(
        "mb-12 md:mb-16",
        align === "center" ? "text-center mx-auto max-w-3xl" : "text-left max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <span className="mb-3 inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-primary">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
          {eyebrow}
        </span>
      )}
      <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg text-pretty">
          {subtitle}
        </p>
      )}
    </FadeIn>
  );
}
