import { useCanvas } from "@/hooks/use-canvas";
import { CanvasRenderer } from "@/components/simulation";
import type { EffectsConfig } from "./effects/types";
import { drawBackground } from "./effects/background";
import { drawCells } from "./effects/cell-renderer";
import { applyBloom } from "./effects/bloom";

interface CACanvasProps {
  width: number;
  generations: number;
  cellSize: number;
  colorAlive: string;
  colorDead: string;
  grid: number[][];
  visibleRows: number;
  effectsConfig: EffectsConfig;
  isAnimating: boolean;
}

export function CACanvas({
  width,
  generations,
  cellSize,
  colorAlive,
  colorDead,
  grid,
  visibleRows,
  effectsConfig,
  isAnimating,
}: CACanvasProps) {
  const canvasRef = useCanvas(
    (ctx, cw, ch) => {
      if (effectsConfig.background.enabled) {
        drawBackground(ctx, effectsConfig.background, cw, ch, colorDead);
      } else {
        ctx.fillStyle = colorDead;
        ctx.fillRect(0, 0, cw, ch);
      }

      drawCells(
        ctx,
        grid,
        visibleRows,
        cellSize,
        colorAlive,
        colorDead,
        effectsConfig.cellShape,
        effectsConfig.gradient,
        effectsConfig.scanline,
        isAnimating,
      );

      if (effectsConfig.bloom.enabled) {
        const canvas = ctx.canvas;
        applyBloom(canvas, ctx, effectsConfig.bloom);
      }
    },
    [grid, visibleRows, cellSize, colorAlive, colorDead, effectsConfig, isAnimating],
  );

  const usePixelated =
    !effectsConfig.cellShape.enabled || effectsConfig.cellShape.mode === "square";

  return (
    <CanvasRenderer
      canvasRef={canvasRef}
      width={width * cellSize}
      height={generations * cellSize}
      pixelated={usePixelated}
    />
  );
}
