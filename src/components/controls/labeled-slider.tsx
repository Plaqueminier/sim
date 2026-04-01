import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface LabeledSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step: number;
}

export function LabeledSlider({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: LabeledSliderProps) {
  return (
    <div className="flex-1 space-y-1">
      <div className="flex items-center justify-between gap-2">
        <Label className="text-xs text-muted-foreground">{label}</Label>
        <span className="text-xs tabular-nums text-muted-foreground">
          {value}
        </span>
      </div>
      <Slider
        value={[value]}
        onValueChange={([v]) => onChange(v!)}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
}
