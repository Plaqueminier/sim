import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LabeledInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  accent?: string;
}

export function LabeledInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  accent,
}: LabeledInputProps) {
  return (
    <div
      className="flex-1 space-y-1"
      style={
        accent ? ({ "--sim-accent": accent } as React.CSSProperties) : undefined
      }
    >
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-8 text-sm"
        style={
          accent
            ? {
                borderColor:
                  "color-mix(in srgb, var(--sim-accent) 30%, transparent)",
              }
            : undefined
        }
      />
    </div>
  );
}
