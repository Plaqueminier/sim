import { cn } from "@/lib/utils";

interface Stat {
  label: string;
  value: string | number;
}

interface StatDisplayProps {
  stats: Stat[];
  accent?: string;
  className?: string;
}

export function StatDisplay({ stats, accent, className }: StatDisplayProps) {
  return (
    <div className={cn("flex gap-6 bg-surface-1 rounded-lg px-4 py-2.5", className)}>
      {stats.map((stat) => (
        <div key={stat.label} className="flex items-center gap-1.5 text-xs">
          <span className="text-muted-foreground">{stat.label}</span>
          <span
            className="font-mono font-medium"
            style={accent ? { color: accent } : undefined}
          >
            {stat.value}
          </span>
        </div>
      ))}
    </div>
  );
}
