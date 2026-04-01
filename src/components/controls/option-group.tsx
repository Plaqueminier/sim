import { Button } from "@/components/ui/button";

interface Option<T extends string> {
  value: T;
  label: string;
}

interface OptionGroupProps<T extends string> {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
}

export function OptionGroup<T extends string>({
  options,
  value,
  onChange,
}: OptionGroupProps<T>) {
  return (
    <div className="flex gap-1">
      {options.map((opt) => (
        <Button
          key={opt.value}
          variant={value === opt.value ? "secondary" : "ghost"}
          size="sm"
          onClick={() => onChange(opt.value)}
          className="text-xs h-7 px-2"
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );
}
