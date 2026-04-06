import { Button } from "@/components/ui/button";

interface Option<T extends string> {
  value: T;
  label: string;
}

interface OptionGroupProps<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  accent?: string;
}

export function OptionGroup<T extends string>({
  options,
  value,
  onChange,
  accent,
}: OptionGroupProps<T>) {
  return (
    <div
      className="flex gap-1"
      style={
        accent ? ({ "--sim-accent": accent } as React.CSSProperties) : undefined
      }
    >
      {options.map((opt) => {
        const isActive = value === opt.value;
        return (
          <Button
            key={opt.value}
            variant={isActive ? "secondary" : "ghost"}
            size="sm"
            onClick={() => onChange(opt.value)}
            className="text-xs h-7 px-2"
            style={
              isActive && accent
                ? {
                    background: `color-mix(in srgb, ${accent} 20%, transparent)`,
                    color: accent,
                  }
                : undefined
            }
          >
            {opt.label}
          </Button>
        );
      })}
    </div>
  );
}
