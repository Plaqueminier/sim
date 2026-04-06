import { Button } from "@/components/ui/button";
import {
  LabeledSlider,
  OptionGroup,
  ColorPicker,
  ControlPanel,
} from "@/components/controls";

interface CAState {
  rule: number;
  initialState: "single" | "random";
  colorAlive: string;
  colorDead: string;
  width: number;
  maxWidth: number;
  generations: number;
}

interface ControlsProps {
  state: CAState;
  update: (patch: Partial<CAState>) => void;
  onFitWidth: () => void;
}

const initialStateOptions = [
  { value: "single" as const, label: "Single" },
  { value: "random" as const, label: "Random" },
];

export function Controls({ state, update, onFitWidth }: ControlsProps) {
  return (
    <ControlPanel title="Parameters" defaultOpen>
      <div className="flex flex-wrap gap-4 items-end">
        <LabeledSlider
          label="Rule"
          value={state.rule}
          onChange={(rule) => update({ rule })}
          min={0}
          max={255}
          step={1}
        />
        <OptionGroup
          options={initialStateOptions}
          value={state.initialState}
          onChange={(initialState) => update({ initialState })}
        />
      </div>

      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex items-end gap-2">
          <LabeledSlider
            label="Width"
            value={state.width}
            onChange={(width) => update({ width })}
            min={11}
            max={state.maxWidth}
            step={2}
          />
          <Button variant="ghost" size="sm" onClick={onFitWidth} className="text-xs h-7">
            Fit
          </Button>
        </div>
        <LabeledSlider
          label="Generations"
          value={state.generations}
          onChange={(generations) => update({ generations })}
          min={10}
          max={500}
          step={10}
        />
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <ColorPicker label="Alive" value={state.colorAlive} onChange={(colorAlive) => update({ colorAlive })} />
        <ColorPicker label="Dead" value={state.colorDead} onChange={(colorDead) => update({ colorDead })} />
      </div>
    </ControlPanel>
  );
}
