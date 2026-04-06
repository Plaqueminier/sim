import { Section, ColorSwatch } from "./shared";

export function TokensTab() {
  return (
    <div className="space-y-12">
      <Section title="Colors — Surfaces">
        <div className="flex gap-4 flex-wrap">
          <ColorSwatch name="Background" value="#0d0a04" cssVar="--background" />
          <ColorSwatch name="Surface 1" value="#1a1308" cssVar="--surface-1" />
          <ColorSwatch name="Surface 2" value="#231b0e" cssVar="--surface-2" />
          <ColorSwatch name="Surface 3" value="#2e2314" cssVar="--surface-3" />
          <ColorSwatch name="Card" value="#151008" cssVar="--card" />
        </div>
      </Section>

      <Section title="Colors — Text">
        <div className="flex gap-4 flex-wrap">
          <ColorSwatch name="Foreground" value="#e2e8f0" cssVar="--foreground" />
          <ColorSwatch name="Muted" value="#94a3b8" cssVar="--muted-foreground" />
          <ColorSwatch name="Subtle" value="#64748b" cssVar="--subtle-foreground" />
          <ColorSwatch name="Faint" value="#334155" cssVar="--faint-foreground" />
        </div>
      </Section>

      <Section title="Colors — Simulation Accents">
        <div className="flex gap-4 flex-wrap">
          <ColorSwatch name="CA" value="#a78bfa" cssVar="--sim-ca" />
          <ColorSwatch name="Sorting" value="#2dd4bf" cssVar="--sim-sorting" />
          <ColorSwatch name="Life" value="#4ade80" cssVar="--sim-life" />
          <ColorSwatch name="Particles" value="#fb923c" cssVar="--sim-particles" />
          <ColorSwatch name="Pathfinding" value="#f472b6" cssVar="--sim-pathfinding" />
          <ColorSwatch name="Physics" value="#38bdf8" cssVar="--sim-physics" />
        </div>
      </Section>

      <Section title="Colors — UI">
        <div className="flex gap-4 flex-wrap">
          <ColorSwatch name="Primary" value="#f59e0b" cssVar="--primary" />
          <ColorSwatch name="Secondary" value="rgba(255,255,255,0.08)" cssVar="--secondary" />
          <ColorSwatch name="Border" value="rgba(255,255,255,0.06)" cssVar="--border" />
          <ColorSwatch name="Input" value="rgba(255,255,255,0.1)" cssVar="--input" />
          <ColorSwatch name="Destructive" value="#ef4444" cssVar="--destructive" />
        </div>
      </Section>

      <Section title="Typography">
        <div className="space-y-6">
          <div>
            <p className="text-4xl font-bold">Raleway Bold — Display</p>
            <p className="text-xs text-muted-foreground mt-1">font-sans / 700 / text-4xl</p>
          </div>
          <div>
            <p className="text-3xl font-bold">Raleway Bold — Page Titles</p>
            <p className="text-xs text-muted-foreground mt-1">font-sans / 700 / text-3xl</p>
          </div>
          <div>
            <p className="text-xl font-semibold">Raleway Semibold — Section Headings</p>
            <p className="text-xs text-muted-foreground mt-1">font-sans / 600 / text-xl</p>
          </div>
          <div>
            <p className="text-base font-medium">Raleway Medium — Body text</p>
            <p className="text-xs text-muted-foreground mt-1">font-sans / 500 / text-base</p>
          </div>
          <div>
            <p className="text-sm">Raleway Regular — Secondary text, descriptions</p>
            <p className="text-xs text-muted-foreground mt-1">font-sans / 400 / text-sm</p>
          </div>
          <div>
            <p className="font-mono text-base">JetBrains Mono — Rule 30 | Gen 150 | 503px | 0.85</p>
            <p className="text-xs text-muted-foreground mt-1">font-mono / 400 / text-base</p>
          </div>
          <div>
            <p className="font-mono text-xs">JetBrains Mono Small — stat readouts, CSS vars</p>
            <p className="text-xs text-muted-foreground mt-1">font-mono / 400 / text-xs</p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Section Label</p>
            <p className="text-xs text-muted-foreground mt-1">font-sans / 500 / text-xs / uppercase tracking-wider</p>
          </div>
        </div>
      </Section>
    </div>
  );
}
