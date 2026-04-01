import { Button } from "@/components/ui/button";
import {
  LabeledSlider,
  LabeledSwitch,
  OptionGroup,
  ColorPicker,
} from "@/components/controls";

interface ControlsProps {
  rule: number;
  onRuleChange: (v: number) => void;
  initialState: "single" | "random";
  onInitialStateChange: (v: "single" | "random") => void;
  colorAlive: string;
  onColorAliveChange: (v: string) => void;
  colorDead: string;
  onColorDeadChange: (v: string) => void;
  width: number;
  onWidthChange: (v: number) => void;
  maxWidth: number;
  generations: number;
  onGenerationsChange: (v: number) => void;
  animationDuration: number;
  onAnimationDurationChange: (v: number) => void;
  isPlaying: boolean;
  onToggleAnimation: () => void;
  fullscreen: boolean;
  onFullscreenChange: (v: boolean) => void;
  onFitWidth: () => void;
}

const initialStateOptions = [
  { value: "single" as const, label: "Single" },
  { value: "random" as const, label: "Random" },
];

export function Controls({
  rule,
  onRuleChange,
  initialState,
  onInitialStateChange,
  colorAlive,
  onColorAliveChange,
  colorDead,
  onColorDeadChange,
  width,
  onWidthChange,
  maxWidth,
  generations,
  onGenerationsChange,
  animationDuration,
  onAnimationDurationChange,
  isPlaying,
  onToggleAnimation,
  fullscreen,
  onFullscreenChange,
  onFitWidth,
}: ControlsProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4 items-end">
        <LabeledSlider
          label="Rule"
          value={rule}
          onChange={onRuleChange}
          min={0}
          max={255}
          step={1}
        />
        <OptionGroup
          options={initialStateOptions}
          value={initialState}
          onChange={onInitialStateChange}
        />
      </div>

      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex items-end gap-2">
          <LabeledSlider
            label="Width"
            value={width}
            onChange={onWidthChange}
            min={11}
            max={maxWidth}
            step={2}
          />
          <Button variant="ghost" size="sm" onClick={onFitWidth} className="text-xs h-7">
            Fit
          </Button>
        </div>
        <LabeledSlider
          label="Generations"
          value={generations}
          onChange={onGenerationsChange}
          min={10}
          max={500}
          step={10}
        />
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <ColorPicker label="Alive" value={colorAlive} onChange={onColorAliveChange} />
        <ColorPicker label="Dead" value={colorDead} onChange={onColorDeadChange} />
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <LabeledSlider
          label="Animation (s)"
          value={animationDuration}
          onChange={onAnimationDurationChange}
          min={1}
          max={30}
          step={1}
        />
        <LabeledSwitch label="Fullscreen" checked={fullscreen} onChange={onFullscreenChange} />
        <Button onClick={onToggleAnimation} size="sm">
          {isPlaying ? "Stop" : "Animate"}
        </Button>
      </div>
    </div>
  );
}
