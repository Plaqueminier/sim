import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LabeledSlider,
  LabeledSwitch,
  LabeledInput,
  OptionGroup,
  ColorPicker,
  ControlPanel,
  PlaybackBar,
  StatDisplay,
} from "@/components/controls";
import { Section, Showcase } from "./shared";

const ACCENT_OPTIONS = [
  { value: "var(--sim-ca)", label: "CA", color: "#a78bfa" },
  { value: "var(--sim-sorting)", label: "Sorting", color: "#2dd4bf" },
  { value: "var(--sim-life)", label: "Life", color: "#4ade80" },
  { value: "var(--sim-particles)", label: "Particles", color: "#fb923c" },
  { value: "var(--sim-pathfinding)", label: "Pathfinding", color: "#f472b6" },
  { value: "var(--sim-physics)", label: "Physics", color: "#38bdf8" },
];

export function ComponentsControls() {
  const [accent, setAccent] = useState("var(--sim-ca)");
  const [inputVal, setInputVal] = useState("");
  const [sliderVal, setSliderVal] = useState(30);
  const [switchVal, setSwitchVal] = useState(false);
  const [optionVal, setOptionVal] = useState("single");
  const [colorVal, setColorVal] = useState("#a78bfa");
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [panelSlider1, setPanelSlider1] = useState(60);
  const [panelSlider2, setPanelSlider2] = useState(8);
  const [panelSwitch, setPanelSwitch] = useState(true);
  const [statGen, setStatGen] = useState(150);

  const currentColor = ACCENT_OPTIONS.find((a) => a.value === accent)?.color;

  return (
    <div className="space-y-12">
      {/* ACCENT SELECTOR */}
      <div className="bg-surface-1 rounded-lg p-4 border border-border">
        <p className="text-sm font-medium text-muted-foreground mb-3">
          Simulation Accent — all controls below use this color
        </p>
        <div className="flex gap-2">
          {ACCENT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setAccent(opt.value)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors"
              style={{
                background:
                  accent === opt.value
                    ? `color-mix(in srgb, ${opt.color} 20%, transparent)`
                    : "transparent",
                color:
                  accent === opt.value ? opt.color : "var(--muted-foreground)",
                border: `1px solid ${accent === opt.value ? opt.color : "transparent"}`,
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: opt.color }}
              />
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* MOLECULES */}
      <Section title="Molecules">
        <div className="space-y-6">
          <Showcase
            title="LabeledInput"
            description="label, value, onChange, placeholder?, type?, accent?"
          >
            <div className="max-w-sm">
              <LabeledInput
                label="Name"
                value={inputVal}
                onChange={setInputVal}
                placeholder="Enter a name..."
                accent={accent}
              />
              {inputVal && (
                <p className="text-xs text-muted-foreground mt-2 font-mono">
                  value: "{inputVal}"
                </p>
              )}
            </div>
          </Showcase>

          <Showcase
            title="LabeledSlider"
            description="label, value, onChange, min, max, step, accent?"
          >
            <div className="max-w-sm">
              <LabeledSlider
                label="Rule"
                value={sliderVal}
                onChange={setSliderVal}
                min={0}
                max={255}
                step={1}
                accent={accent}
              />
            </div>
          </Showcase>

          <Showcase
            title="LabeledSwitch"
            description="label, checked, onChange, accent?"
          >
            <LabeledSwitch
              label="Enable bloom"
              checked={switchVal}
              onChange={setSwitchVal}
              accent={accent}
            />
          </Showcase>

          <Showcase
            title="OptionGroup"
            description="options, value, onChange, accent?"
          >
            <OptionGroup
              options={[
                { value: "single", label: "Single" },
                { value: "random", label: "Random" },
                { value: "custom", label: "Custom" },
              ]}
              value={optionVal}
              onChange={setOptionVal}
              accent={currentColor}
            />
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              value: "{optionVal}"
            </p>
          </Showcase>

          <Showcase
            title="ColorPicker"
            description="label, value, onChange, accent?"
          >
            <ColorPicker
              label="Alive color"
              value={colorVal}
              onChange={setColorVal}
              accent={currentColor}
            />
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              value: "{colorVal}"
            </p>
          </Showcase>
        </div>
      </Section>

      {/* ORGANISMS */}
      <Section title="Organisms">
        <div className="space-y-6">
          <Showcase
            title="PlaybackBar"
            description="isPlaying, onPlay, onPause, onReset, onStep?, speed, onSpeedChange, accent?"
          >
            <PlaybackBar
              isPlaying={isPlaying}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              onReset={() => setIsPlaying(false)}
              onStep={() => {}}
              speed={playbackSpeed}
              onSpeedChange={setPlaybackSpeed}
              accent={currentColor}
            />
            <p className="text-xs text-muted-foreground mt-2 font-mono">
              isPlaying: {String(isPlaying)} | speed: {playbackSpeed}x
            </p>
          </Showcase>

          <Showcase
            title="StatDisplay"
            description="stats: { label, value }[], accent?"
          >
            <div className="space-y-2">
              <StatDisplay
                stats={[
                  { label: "Generation", value: statGen },
                  { label: "Width", value: 503 },
                  { label: "Rule", value: sliderVal },
                  { label: "Alive", value: "48.2%" },
                ]}
                accent={currentColor}
              />
              <div className="flex items-center gap-2 mt-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setStatGen((g) => g + 1)}
                >
                  Increment Generation
                </Button>
                <span className="text-xs text-muted-foreground font-mono">
                  {statGen}
                </span>
              </div>
            </div>
          </Showcase>

          <Showcase
            title="ControlPanel"
            description="title, defaultOpen?, accent?, children"
          >
            <div className="space-y-2">
              <ControlPanel title="Visual Effects" defaultOpen accent={accent}>
                <LabeledSwitch
                  label="Bloom"
                  checked={panelSwitch}
                  onChange={setPanelSwitch}
                  accent={accent}
                />
                {panelSwitch && (
                  <div className="flex gap-4 ml-5">
                    <LabeledSlider
                      label="Intensity"
                      value={panelSlider1}
                      onChange={setPanelSlider1}
                      min={0}
                      max={100}
                      step={1}
                      accent={accent}
                    />
                    <LabeledSlider
                      label="Radius"
                      value={panelSlider2}
                      onChange={setPanelSlider2}
                      min={2}
                      max={20}
                      step={1}
                      accent={accent}
                    />
                  </div>
                )}
              </ControlPanel>
              <ControlPanel title="Grid Settings" accent={accent}>
                <LabeledSlider
                  label="Width"
                  value={503}
                  onChange={() => {}}
                  min={11}
                  max={1001}
                  step={2}
                  accent={accent}
                />
                <LabeledSlider
                  label="Generations"
                  value={150}
                  onChange={() => {}}
                  min={10}
                  max={500}
                  step={10}
                  accent={accent}
                />
              </ControlPanel>
            </div>
          </Showcase>
        </div>
      </Section>
    </div>
  );
}
