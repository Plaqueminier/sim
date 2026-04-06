import { Link } from "@tanstack/react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { SimulationMeta } from "./simulation-registry";

interface SimulationCardProps {
  sim: SimulationMeta;
}

export function SimulationCard({ sim }: SimulationCardProps) {
  return (
    <Link to={sim.path} className="block">
      <Card
        className="hover:bg-surface-2 transition-colors border-l-4"
        style={{ borderLeftColor: sim.accent }}
      >
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle className="text-xl">{sim.title}</CardTitle>
              <CardDescription className="mt-1">
                {sim.description}
              </CardDescription>
            </div>
          </div>
          <Badge
            variant="secondary"
            className="w-fit mt-3 text-xs"
            style={{
              background: `color-mix(in srgb, ${sim.accent} 15%, transparent)`,
              color: sim.accent,
            }}
          >
            {sim.category}
          </Badge>
        </CardHeader>
      </Card>
    </Link>
  );
}
