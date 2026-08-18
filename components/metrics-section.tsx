import { Counter } from "@/components/motion/counter";
import { profile } from "@/data/profile";
import { CheckCircle2, ShieldCheck, Database, Layers } from "lucide-react";

const metricIcons = [CheckCircle2, Database, ShieldCheck, Layers];

export function MetricsSection() {
  return (
    <section
      className="border-b border-border/40 bg-card/30 py-12"
      aria-label="Métricas de engenharia e produção"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {profile.metrics.map((metric, index) => {
            const Icon = metricIcons[index % metricIcons.length];
            return (
              <div
                className="group relative overflow-hidden rounded-xl border border-border/70 bg-card/60 p-5 transition-all duration-200 hover:border-primary/40 hover:bg-card"
                key={metric.label}
                data-metric
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold tracking-tight text-primary sm:text-3xl">
                    <Counter value={metric.value} />
                  </span>
                  <Icon className="h-4 w-4 text-muted-foreground/60 transition-colors group-hover:text-primary" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground sm:text-sm">
                  {metric.label}
                </p>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                  {metric.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
