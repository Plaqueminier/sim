import { SimulationCard } from '@/components/catalog';
import type { SimulationMeta } from '@/components/catalog';
import { Section, Showcase } from './shared';

const demoCards: SimulationMeta[] = [
	{
		path: '/elementary-ca',
		title: 'Elementary Cellular Automata',
		description:
			"Explore Wolfram's 256 rules of 1D binary cellular automata. Watch patterns emerge from simple rules.",
		category: 'Automata',
		accent: 'var(--sim-ca)',
	},
	{
		path: '/sorting',
		title: 'Sorting Algorithms',
		description: 'Visualize bubble, merge, quick sort and more',
		category: 'Sorting',
		accent: 'var(--sim-sorting)',
	},
	{
		path: '/game-of-life',
		title: 'Game of Life',
		description: "Conway's classic 2D cellular automaton",
		category: 'Automata',
		accent: 'var(--sim-life)',
	},
	{
		path: '/particles',
		title: 'Particle System',
		description: 'Gravity, collisions, and emergent behavior',
		category: 'Particles',
		accent: 'var(--sim-particles)',
	},
];

export function ComponentsCatalog() {
	return (
		<div className="space-y-12">
			<Section title="Simulation Cards">
				<Showcase
					title="SimulationCard"
					description="sim: { path, title, description, category, accent }"
				>
					<div className="grid gap-4">
						{demoCards.map((sim) => (
							<SimulationCard key={sim.path} sim={sim} />
						))}
					</div>
				</Showcase>
			</Section>
		</div>
	);
}
