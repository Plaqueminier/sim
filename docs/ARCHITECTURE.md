# sim — Architecture

Interactive computational simulations built with React 19 + TypeScript + Tailwind CSS 4.

## Tech Stack

| Layer      | Tool                          |
| ---------- | ----------------------------- |
| Framework  | React 19                      |
| Routing    | TanStack Router (file-based)  |
| Styling    | Tailwind CSS 4 (Vite plugin)  |
| Components | shadcn/ui (Radix primitives)  |
| Language   | TypeScript                    |
| Bundler    | Vite 8                        |
| Runtime    | Bun                           |
| Linting    | ESLint 10 + typescript-eslint |
| Formatting | Prettier                      |

## Project Structure

```
src/
├── components/
│   ├── ui/                    # shadcn atoms (Button, Slider, Toggle, Card, …)
│   ├── controls/              # reusable molecules (LabeledSlider, PlaybackBar, ControlPanel, …)
│   ├── simulation/            # generic simulation shell (SimulationPage, CanvasRenderer)
│   └── catalog/               # home page cards + simulation registry
├── hooks/                     # shared hooks (use-animation, use-canvas, use-simulation-state)
├── engines/                   # pure computation, no React (elementary-ca.ts, …)
├── simulations/               # one folder per simulation, self-contained
│   └── elementary-ca/         # canvas, controls, effects, index page
├── pages/
│   └── design/                # design system showcase (tokens, components)
└── routes/                    # TanStack Router file-based routes
```

## Design System

### Theme

Dark-only. No light mode. All surfaces, borders, and colors are defined as CSS custom properties in `app.css`.

### Typography

- **UI text**: Raleway (sans-serif)
- **Numbers / stats / code**: JetBrains Mono (monospace)

### Color Tokens

**Surfaces** (layered, lightest → darkest):

| Token          | Value   | Usage             |
| -------------- | ------- | ----------------- |
| `--background` | #0d0a04 | Page background   |
| `--surface-1`  | #1a1308 | Cards, panels     |
| `--surface-2`  | #231b0e | Elevated panels   |
| `--surface-3`  | #2e2314 | Highest elevation |

**Text hierarchy**:

| Token                 | Value   | Usage                |
| --------------------- | ------- | -------------------- |
| `--foreground`        | #e2e8f0 | Primary text         |
| `--muted-foreground`  | #94a3b8 | Labels, descriptions |
| `--subtle-foreground` | #64748b | Hints                |
| `--faint-foreground`  | #334155 | Disabled / very dim  |

**Semantic**: `--primary` (#f59e0b amber), `--destructive` (#ef4444), `--border`, `--input`, `--ring`.

### Accent Color System

Each simulation has a unique accent color, defined globally:

| Variable            | Color   | Simulation  |
| ------------------- | ------- | ----------- |
| `--sim-ca`          | #a78bfa | CA (violet) |
| `--sim-sorting`     | #2dd4bf | Sorting     |
| `--sim-life`        | #4ade80 | Life        |
| `--sim-particles`   | #fb923c | Particles   |
| `--sim-pathfinding` | #f472b6 | Pathfinding |
| `--sim-physics`     | #38bdf8 | Physics     |

Components accept an optional `accent` prop. The simulation page sets `--sim-accent` as an inline CSS variable, and controls use `color-mix(in srgb, <accent> 20%, transparent)` for tinted backgrounds. No accent → default secondary styling.

### Component Layers

**Atoms** (`components/ui/`) — shadcn/ui primitives copied into the project: Button, Slider, Toggle, Card, Tabs, Collapsible, Tooltip, Badge, Separator, Label, Input.

**Molecules** (`components/controls/`) — reusable across all simulations: LabeledSlider, LabeledSwitch, LabeledInput, OptionGroup, ColorPicker, ControlPanel, PlaybackBar, StatDisplay. All accent-aware.

**Layout** (`components/simulation/`) — generic simulation shell:

- `SimulationPage` — standard page layout (header, playback, controls, stats, canvas)
- `CanvasRenderer` — canvas element with optional `image-rendering: pixelated`

### Design Showcase

`/design` route renders a live playground of all tokens and components with switchable accent colors.

## Simulation Architecture

### Layering

```
SimulationPage (layout)
 └── hooks: useSimulationState (reducer), useAnimation (rAF)
      └── engine (pure functions, no React)
           └── effects (pure canvas draw functions)
                └── useCanvas hook → CanvasRenderer
```

### Conventions

- **Engines** are pure functions: config in → data out. No React, no DOM.
- **Effects** are pure canvas draw functions: receive `ctx` + config, draw. No classes, no internal state.
- **Each simulation** owns its state in its `index.tsx` page component via `useSimulationState`.
- **Shared hooks**: `useSimulationState` (reducer with patch/reset), `useAnimation` (rAF-based playback), `useCanvas` (canvas sync).
- **Component placement rule**: "would another simulation use this?" — yes → `controls/` or `simulation/`. No → stays in the simulation's own folder.

### Elementary Cellular Automata (`/elementary-ca`)

Implements [Wolfram's elementary CA](https://en.wikipedia.org/wiki/Elementary_cellular_automaton) — 256 possible 1D binary rules.

1. A 1D row of cells starts with single center cell or random state.
2. Each generation: 3-cell neighborhood → rule lookup → next state. Wrapping boundaries.
3. Full grid rendered on `<canvas>` with configurable visual effects (bloom, gradients, cell shapes, scanline).

**Files**:

- `engines/elementary-ca.ts` — `generateGrid()`, pure computation
- `simulations/elementary-ca/index.tsx` — page state + wiring
- `simulations/elementary-ca/ca-canvas.tsx` — canvas rendering via `useCanvas`
- `simulations/elementary-ca/controls.tsx` — CA-specific parameter controls
- `simulations/elementary-ca/effects-panel.tsx` — visual effects toggles
- `simulations/elementary-ca/effects/` — pure draw functions (bloom, gradient, cell-renderer, background)

## Adding a New Simulation

1. Create engine in `src/engines/<name>.ts` (pure functions, no React).
2. Create folder `src/simulations/<name>/` with index, canvas, controls, and any effects.
3. Add route at `src/routes/<name>/index.tsx`.
4. Register in `src/components/catalog/simulation-registry.ts` for the home page.
