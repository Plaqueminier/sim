import { createFileRoute, Link } from '@tanstack/react-router';
import { SimulationCard, simulations } from '@/components/catalog';

export const Route = createFileRoute('/')({
	component: Home,
});

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
						<SimulationCard key={sim.path} sim={sim} />
					))}
				</div>

				<div className="mt-12">
					<Link
						to="/design"
						className="text-sm text-muted-foreground hover:text-foreground transition-colors"
					>
						Design System →
					</Link>
				</div>
			</div>
		</div>
	);
}
