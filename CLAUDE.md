# Sim

Simulation playground — cellular automata, sorting, and future simulations.

## Stack

- React 19 + TypeScript
- Vite 6
- TanStack Router (file-based routing)
- Tailwind 4 (utility-first, `@import 'tailwindcss'` in app.css)
- shadcn/ui (Radix primitives, copied into `src/components/ui/`)
- Canvas 2D for rendering

## Structure

```
src/
  components/
    ui/               ← shadcn atoms (Button, Slider, Switch, Card, etc.)
    controls/         ← molecules (LabeledSlider, LabeledSwitch, OptionGroup, ColorPicker)
    simulation/       ← generic simulation shell (SimulationPage, CanvasRenderer)
  hooks/              ← shared hooks (use-animation, use-canvas)
  engines/            ← pure computation, no React (elementary-ca.ts, etc.)
  simulations/        ← one folder per simulation, self-contained
    elementary-ca/    ← engine, canvas, controls, effects, index page
  routes/             ← TanStack Router file-based routes
```

## Conventions

- Effects are pure functions: receive canvas ctx + config, draw. No classes, no internal state.
- Engines are pure functions: config in, data out. No React, no DOM.
- Each simulation owns its state in its index.tsx page component.
- Dark theme. Tailwind utility classes only, no custom CSS.
- `image-rendering: pixelated` for square cell mode, removed for organic shapes.

## Dev

Uses **bun** (not npm).

```
bun dev         # start dev server
bun run build   # tsc + vite build
```

## Plan Mode

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if any.

## Code Comments

Do not add comments in the code where the comment is self-explained by the code. Only keep comments that have a real impact on comprehension and readability.
