import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export const Route = createFileRoute("/")({
  component: Home,
});

const simulations = [
  {
    path: "/elementary-ca" as const,
    title: "Elementary Cellular Automata",
    description:
      "Explore Wolfram's 256 rules of 1D binary cellular automata. Watch patterns emerge from simple rules, from chaos to fractals to Turing completeness.",
  },
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Simulators</h1>
        <p className="text-muted-foreground mb-8">
          A collection of interactive computational simulations
        </p>

        <div className="grid gap-4">
          {simulations.map((sim) => (
            <Link key={sim.path} to={sim.path} className="block">
              <Card className="hover:bg-accent transition-colors">
                <CardHeader>
                  <CardTitle className="text-2xl">{sim.title}</CardTitle>
                  <CardDescription>{sim.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
