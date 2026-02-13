import { FadeIn } from "@/components/motion-wrapper";

interface SectionTitleProps {
  title: string;
  subtitle?: string;
}

export function SectionTitle({ title, subtitle }: SectionTitleProps) {
  return (
    <FadeIn className="mb-12 text-center">
      <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground text-base md:text-lg text-pretty">
          {subtitle}
        </p>
      )}
    </FadeIn>
  );
}
