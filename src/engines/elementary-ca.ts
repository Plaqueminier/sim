function getRuleLookup(ruleNum: number): Record<string, number> {
	const lookup: Record<string, number> = {};
	for (let i = 0; i < 8; i++) {
		const pattern = i.toString(2).padStart(3, '0');
		lookup[pattern] = (ruleNum >> i) & 1;
	}
	return lookup;
}

export function generateGrid(
	rule: number,
	width: number,
	generations: number,
	initialState: 'single' | 'random',
): number[][] {
	const ruleLookup = getRuleLookup(rule);
	const firstRow = new Array(width).fill(0) as number[];

	if (initialState === 'single') {
		firstRow[Math.floor(width / 2)] = 1;
	} else {
		for (let i = 0; i < width; i++) {
			firstRow[i] = Math.random() < 0.5 ? 1 : 0;
		}
	}

	const grid: number[][] = [firstRow];
	for (let g = 1; g < generations; g++) {
		const prevRow = grid[g - 1];
		if (!prevRow) break;
		const newRow = new Array(width).fill(0) as number[];
		for (let i = 0; i < width; i++) {
			const left = prevRow[(i - 1 + width) % width] ?? 0;
			const center = prevRow[i] ?? 0;
			const right = prevRow[(i + 1) % width] ?? 0;
			const pattern = `${left}${center}${right}`;
			newRow[i] = ruleLookup[pattern] ?? 0;
		}
		grid.push(newRow);
	}

	return grid;
}
