import { useState } from "react";
import type {
  EffectsConfig,
  Palette,
  BackgroundPattern,
} from "./effects/types";
import { LabeledSwitch, LabeledSlider, OptionGroup } from "@/components/controls";

interface EffectsPanelProps {
  config: EffectsConfig;
  onChange: (config: EffectsConfig) => void;
}

const shapeModes = [
  { value: "square" as const, label: "Square" },
  { value: "circle" as const, label: "Circle" },
  { value: "blob" as const, label: "Blob" },
];

const gradientModes = [
  { value: "y-position" as const, label: "Vertical" },
  { value: "density" as const, label: "Density" },
];

const palettes: { value: Palette; label: string; colors: string[] }[] = [
  { value: "fire", label: "Fire", colors: ["#000", "#b41e00", "#dc5a00", "#ffc832", "#ffffdc"] },
  { value: "ocean", label: "Ocean", colors: ["#0a0a2e", "#1a3a5c", "#2e8b8b", "#64c8b4", "#7fffd4"] },
  { value: "neon", label: "Neon", colors: ["#0d0221", "#7800c8", "#ff00ff", "#00ffff", "#fff"] },
  { value: "pastel", label: "Pastel", colors: ["#2d1b69", "#8250aa", "#b8a9c9", "#f0c9cf", "#ffecd2"] },
];

const bgPatterns: { value: BackgroundPattern; label: string }[] = [
  { value: "noise", label: "Noise" },
  { value: "dots", label: "Dots" },
  { value: "grid", label: "Grid" },
  { value: "stripes", label: "Stripes" },
];

function update(config: EffectsConfig, patch: Partial<EffectsConfig>): EffectsConfig {
  return { ...config, ...patch };
}

export function EffectsPanel({ config, onChange }: EffectsPanelProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-card/50 rounded-lg overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <span>Effects</span>
        <span className="text-xs">{expanded ? "▲" : "▼"}</span>
      </button>

      {expanded && (
        <div className="px-4 pb-4 space-y-5">
          {/* Bloom */}
          <div className="space-y-2">
            <LabeledSwitch
              label="Bloom"
              checked={config.bloom.enabled}
              onChange={(v) => onChange(update(config, { bloom: { ...config.bloom, enabled: v } }))}
            />
            {config.bloom.enabled && (
              <div className="flex gap-4 ml-5">
                <LabeledSlider
                  label="Intensity"
                  value={config.bloom.intensity}
                  onChange={(v) => onChange(update(config, { bloom: { ...config.bloom, intensity: v } }))}
                  min={0.1} max={1} step={0.05}
                />
                <LabeledSlider
                  label="Radius"
                  value={config.bloom.radius}
                  onChange={(v) => onChange(update(config, { bloom: { ...config.bloom, radius: v } }))}
                  min={2} max={20} step={1}
                />
              </div>
            )}
          </div>

          {/* Cell Shape */}
          <div className="space-y-2">
            <LabeledSwitch
              label="Cell Shape"
              checked={config.cellShape.enabled}
              onChange={(v) => onChange(update(config, { cellShape: { ...config.cellShape, enabled: v } }))}
            />
            {config.cellShape.enabled && (
              <div className="ml-5">
                <OptionGroup
                  options={shapeModes}
                  value={config.cellShape.mode}
                  onChange={(v) => onChange(update(config, { cellShape: { ...config.cellShape, mode: v } }))}
                />
              </div>
            )}
          </div>

          {/* Gradient */}
          <div className="space-y-2">
            <LabeledSwitch
              label="Gradient"
              checked={config.gradient.enabled}
              onChange={(v) => onChange(update(config, { gradient: { ...config.gradient, enabled: v } }))}
            />
            {config.gradient.enabled && (
              <div className="ml-5 space-y-2">
                <OptionGroup
                  options={gradientModes}
                  value={config.gradient.mode}
                  onChange={(v) => onChange(update(config, { gradient: { ...config.gradient, mode: v } }))}
                />
                <div className="flex gap-2">
                  {palettes.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => onChange(update(config, { gradient: { ...config.gradient, palette: p.value } }))}
                      className={`flex h-5 w-12 rounded overflow-hidden border-2 ${
                        config.gradient.palette === p.value ? "border-primary" : "border-transparent"
                      }`}
                    >
                      {p.colors.map((color, i) => (
                        <div key={i} className="flex-1" style={{ backgroundColor: color }} />
                      ))}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Background */}
          <div className="space-y-2">
            <LabeledSwitch
              label="Background"
              checked={config.background.enabled}
              onChange={(v) => onChange(update(config, { background: { ...config.background, enabled: v } }))}
            />
            {config.background.enabled && (
              <div className="ml-5 space-y-2">
                <OptionGroup
                  options={bgPatterns}
                  value={config.background.pattern}
                  onChange={(v) => onChange(update(config, { background: { ...config.background, pattern: v } }))}
                />
                <LabeledSlider
                  label="Opacity"
                  value={config.background.opacity}
                  onChange={(v) => onChange(update(config, { background: { ...config.background, opacity: v } }))}
                  min={0.02} max={0.5} step={0.02}
                />
              </div>
            )}
          </div>

          {/* Scanline */}
          <div className="space-y-2">
            <LabeledSwitch
              label="Scanline"
              checked={config.scanline.enabled}
              onChange={(v) => onChange(update(config, { scanline: { ...config.scanline, enabled: v } }))}
            />
            {config.scanline.enabled && (
              <div className="flex gap-4 ml-5">
                <LabeledSlider
                  label="Fade depth"
                  value={config.scanline.fadeDepth}
                  onChange={(v) => onChange(update(config, { scanline: { ...config.scanline, fadeDepth: v } }))}
                  min={10} max={200} step={5}
                />
                <LabeledSlider
                  label="Glow"
                  value={config.scanline.glowIntensity}
                  onChange={(v) => onChange(update(config, { scanline: { ...config.scanline, glowIntensity: v } }))}
                  min={0.1} max={1} step={0.05}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
