# Sim

Simulation playground — cellular automata and future simulations.

## Stack

- SvelteKit 5 (Svelte 5 runes: `$state`, `$effect`, `$derived`, `$props`, `$bindable`)
- Tailwind 4 (utility-first, `@import 'tailwindcss'` in app.css)
- TypeScript, Vite
- Canvas 2D for rendering

## Structure

- `src/lib/ca-engine.ts` — pure CA computation (no DOM)
- `src/lib/effects/` — reusable visual effect modules (bloom, gradients, backgrounds, cell rendering)
- `src/lib/effects/types.ts` — shared effect config types
- `src/lib/components/elementary-ca/` — CA-specific UI components
- `src/routes/elementary-ca/` — elementary CA page (state owner)
- `static/` — static assets served by SvelteKit

## Conventions

- Effects are pure functions: receive canvas ctx + config, draw. No classes, no internal state.
- All effect state owned by page component, passed down as `EffectsConfig` prop.
- Components use `$bindable()` for two-way binding of controls.
- Dark theme (gray-900 base). Tailwind utility classes only, no custom CSS.
- `image-rendering: pixelated` for square cell mode, removed for organic shapes.

## Dev

Uses **bun** (not npm).

```
bun dev         # start dev server
bun run build   # production build
bun run check   # svelte-check
```

## Plan Mode

- Make the plan extremely concise. Sacrifice grammar for the sake of concision.
- At the end of each plan, give me a list of unresolved questions to answer, if any.

## Code Comments

Do not add comments in the code where the comment is self-explained by the code. Only keep comments that have a real impact on comprehension and readability.