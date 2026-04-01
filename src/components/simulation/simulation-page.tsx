import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

interface SimulationPageProps {
  title: string;
  description: string;
  controls: ReactNode;
  canvas: ReactNode;
}

export function SimulationPage({
  title,
  description,
  controls,
  canvas,
}: SimulationPageProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-7xl p-6 pb-0">
        <div className="mb-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground text-sm">
            ← Back to home
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-muted-foreground mb-8">{description}</p>

        {controls}
      </div>

      {canvas}
    </div>
  );
}
