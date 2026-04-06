import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Play, Pause, RotateCcw, StepForward } from "lucide-react";
import { cn } from "@/lib/utils";

const SPEEDS = [0.5, 1, 2, 4] as const;

interface PlaybackBarProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
  onStep?: () => void;
  speed: number;
  onSpeedChange: (speed: number) => void;
  accent?: string;
  className?: string;
}

export function PlaybackBar({
  isPlaying,
  onPlay,
  onPause,
  onReset,
  onStep,
  speed,
  onSpeedChange,
  accent,
  className,
}: PlaybackBarProps) {
  return (
    <div
      className={cn("flex items-center gap-1 bg-surface-1 rounded-lg px-2 py-1.5", className)}
      style={accent ? { "--sim-accent": accent } as React.CSSProperties : undefined}
    >
      <Button
        variant="secondary"
        size="icon"
        className="h-8 w-8"
        onClick={isPlaying ? onPause : onPlay}
        style={accent ? { background: `color-mix(in srgb, ${accent} 20%, transparent)`, color: accent } : undefined}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>

      {onStep && (
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={onStep}
          disabled={isPlaying}
        >
          <StepForward className="h-4 w-4" />
        </Button>
      )}

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={onReset}
      >
        <RotateCcw className="h-4 w-4" />
      </Button>

      <Separator orientation="vertical" className="h-5 mx-1" />

      {SPEEDS.map((s) => (
        <Button
          key={s}
          variant="ghost"
          size="sm"
          className={cn(
            "h-7 px-2 font-mono text-xs",
            speed === s && !accent && "bg-secondary text-foreground",
          )}
          style={speed === s && accent ? { background: `color-mix(in srgb, ${accent} 20%, transparent)`, color: accent } : undefined}
          onClick={() => onSpeedChange(s)}
        >
          {s}x
        </Button>
      ))}
    </div>
  );
}
