import { cn } from "@/lib/utils";

interface CanvasRendererProps {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  width: number;
  height: number;
  pixelated?: boolean;
  className?: string;
}

export function CanvasRenderer({
  canvasRef,
  width,
  height,
  pixelated = false,
  className,
}: CanvasRendererProps) {
  return (
    <div
      className={cn("flex justify-center items-center bg-secondary", className)}
    >
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className="max-w-full"
        style={pixelated ? { imageRendering: "pixelated" } : undefined}
      />
    </div>
  );
}
