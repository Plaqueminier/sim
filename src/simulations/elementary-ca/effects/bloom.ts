import type { BloomConfig } from "./types";

let offscreen: HTMLCanvasElement | null = null;
let offscreenCtx: CanvasRenderingContext2D | null = null;

function ensureOffscreen(w: number, h: number): CanvasRenderingContext2D {
  if (!offscreen || offscreen.width !== w || offscreen.height !== h) {
    offscreen = document.createElement("canvas");
    offscreen.width = w;
    offscreen.height = h;
    offscreenCtx = offscreen.getContext("2d");
  }
  return offscreenCtx!;
}

export function applyBloom(
  sourceCanvas: HTMLCanvasElement,
  targetCtx: CanvasRenderingContext2D,
  config: BloomConfig,
): void {
  const w = sourceCanvas.width;
  const h = sourceCanvas.height;
  const ctx = ensureOffscreen(w, h);

  ctx.clearRect(0, 0, w, h);
  ctx.filter = `blur(${config.radius}px)`;
  ctx.drawImage(sourceCanvas, 0, 0);
  ctx.filter = "none";

  targetCtx.save();
  targetCtx.globalCompositeOperation = "screen";
  targetCtx.globalAlpha = config.intensity;
  targetCtx.drawImage(offscreen!, 0, 0);
  targetCtx.restore();
}
