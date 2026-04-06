import { Toggle } from "@/components/ui/toggle";

interface LabeledSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  accent?: string;
}

export function LabeledSwitch({
  label,
  checked,
  onChange,
  accent,
}: LabeledSwitchProps) {
  return (
    <Toggle
      variant="outline"
      size="sm"
      pressed={checked}
      onPressedChange={onChange}
      style={accent ? { "--sim-accent": accent } as React.CSSProperties : undefined}
    >
      {label}
    </Toggle>
  );
}
