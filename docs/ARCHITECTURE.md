# sim — Architecture

Interactive computational simulations built with SvelteKit 2 + Svelte 5 + Tailwind CSS 4.

## Tech Stack

| Layer     | Tool                     |
| --------- | ------------------------ |
| Framework | SvelteKit 2 (Svelte 5)  |
| Styling   | Tailwind CSS 4 (Vite plugin) |
| Language  | TypeScript               |
| Bundler   | Vite 6                   |
| Runtime   | Bun                      |
| Linting   | ESLint 9 + eslint-plugin-svelte |
| Formatting| Prettier + prettier-plugin-svelte |

## Project Structure

```
src/
├── app.html                          # SvelteKit shell
├── app.css                           # Global styles (Tailwind import + body)
├── routes/
│   ├── +layout.svelte                # Root layout (imports app.css)
│   ├── +page.svelte                  # Home — simulation index
│   └── elementary-ca/
│       └── +page.svelte              # Elementary CA simulation page
└── lib/
    ├── ca-engine.ts                  # Pure computation (no framework deps)
    └── components/
        └── elementary-ca/
            ├── CACanvas.svelte       # Canvas rendering via $effect
            ├── CAControls.svelte     # All inputs (rule, colors, sliders, buttons)
            └── RuleVisualization.svelte  # Visual rule lookup table
```

## Simulations

### Elementary Cellular Automata (`/elementary-ca`)

Implements [Wolfram's elementary cellular automata](https://en.wikipedia.org/wiki/Elementary_cellular_automaton) — 256 possible 1D binary CA rules.

**How it works:**

1. A 1D row of cells (width configurable) starts with either a single center cell or random state.
2. Each generation, every cell's next state is determined by its 3-cell neighborhood (left, self, right) looked up against the rule's 8-bit binary encoding.
3. Wrapping boundary conditions (the grid is a torus).
4. The full grid is rendered on a `<canvas>` with per-pixel drawing.

**Architecture:**

- `ca-engine.ts` — Pure functions (`generateGrid`, `getRuleLookup`). No Svelte imports. Takes rule number, dimensions, and initial state, returns a `number[][]` grid. This is intentionally framework-agnostic so it can be reused or tested independently.

- `+page.svelte` — Page-level state management. Owns all reactive state (`$state` runes): rule, width, generations, colors, animation state. Coordinates grid computation and animation via `$effect`. Animation works by incrementing `visibleRows` on a timer, which reactively triggers canvas redraws.

- `CACanvas.svelte` — Receives `grid` and `visibleRows` as props. A single `$effect` redraws the canvas whenever any prop changes. Uses `$state.raw` for the grid in the parent to avoid deep proxy overhead on large arrays.

- `CAControls.svelte` — Uses `$bindable()` props for two-way binding with the parent. Sliders and color pickers use `bind:value`, buttons use callbacks. Preset rules are defined as a static array.

- `RuleVisualization.svelte` — Stateless. Renders the 8 neighborhood patterns and their outputs for the current rule as colored squares.

**Presets:**

| Rule | Name      | Behavior |
| ---- | --------- | -------- |
| 30   | Chaos     | Pseudorandom / chaotic |
| 90   | Sierpiński| Fractal triangle pattern |
| 110  | Turing    | Proven Turing-complete |
| 184  | Traffic   | Traffic flow modeling |
| 45   | Fractal   | Fractal-like structures |
| 126  | Complex   | Complex class III behavior |

## Adding a New Simulation

1. Create computation logic in `src/lib/<name>-engine.ts` (pure functions, no framework deps).
2. Create components in `src/lib/components/<name>/`.
3. Add a route at `src/routes/<name>/+page.svelte`.
4. Add a link card on the home page (`src/routes/+page.svelte`).
