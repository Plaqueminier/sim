import { Separator } from "@/components/ui/separator";
import type { ReactNode } from "react";

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <Separator />
      {children}
    </div>
  );
}

export function Showcase({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
      {description && (
        <p className="text-xs text-muted-foreground/70 mb-3">{description}</p>
      )}
      <div className="bg-surface-1 rounded-lg p-4 border border-border">
        {children}
      </div>
    </div>
  );
}

export function ColorSwatch({ name, value, cssVar }: { name: string; value: string; cssVar: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-16 h-16 rounded-lg border border-border" style={{ background: value }} />
      <span className="text-xs font-medium">{name}</span>
      <span className="text-xs font-mono text-muted-foreground">{cssVar}</span>
    </div>
  );
}
