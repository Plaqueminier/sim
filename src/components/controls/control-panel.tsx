import { useState, type ReactNode } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ControlPanelProps {
  title: string;
  defaultOpen?: boolean;
  children: ReactNode;
  accent?: string;
  className?: string;
}

export function ControlPanel({
  title,
  defaultOpen = false,
  children,
  accent,
  className,
}: ControlPanelProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <Collapsible
      open={open}
      onOpenChange={setOpen}
      className={cn("bg-surface-1 rounded-lg overflow-hidden", className)}
      style={
        accent ? ({ "--sim-accent": accent } as React.CSSProperties) : undefined
      }
    >
      <CollapsibleTrigger className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
        <span>{title}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 transition-transform duration-200",
            open && "rotate-180",
          )}
          style={open && accent ? { color: accent } : undefined}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 pb-4 space-y-4">{children}</div>
      </CollapsibleContent>
    </Collapsible>
  );
}
