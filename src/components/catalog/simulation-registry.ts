export interface SimulationMeta {
	path: string;
	title: string;
	description: string;
	category: string;
	accent: string;
}

export const simulations: SimulationMeta[] = [
	{
		path: '/elementary-ca',
		title: 'Elementary Cellular Automata',
		description:
			"Explore Wolfram's 256 rules of 1D binary cellular automata. Watch patterns emerge from simple rules, from chaos to fractals to Turing completeness.",
		category: 'Automata',
		accent: 'var(--sim-ca)',
	},
];
