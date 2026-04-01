import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface LabeledSwitchProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function LabeledSwitch({
  label,
  checked,
  onChange,
}: LabeledSwitchProps) {
  return (
    <div className="flex items-center gap-2">
      <Switch checked={checked} onCheckedChange={onChange} />
      <Label className="text-sm">{label}</Label>
    </div>
  );
}
