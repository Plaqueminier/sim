import { Label } from '@/components/ui/label';

interface ColorPickerProps {
	label: string;
	value: string;
	onChange: (value: string) => void;
	accent?: string;
}

export function ColorPicker({
	label,
	value,
	onChange,
	accent,
}: ColorPickerProps) {
	return (
		<div className="flex items-center gap-2">
			<input
				type="color"
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className="h-7 w-7 rounded border border-input cursor-pointer bg-transparent"
				style={accent ? { outlineColor: accent } : undefined}
			/>
			<Label className="text-xs text-muted-foreground">{label}</Label>
		</div>
	);
}
