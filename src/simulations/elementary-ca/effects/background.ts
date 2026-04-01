import type { BackgroundConfig } from "./types";

const noiseCache = new Map<string, ImageData>();

function getNoiseImageData(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
): ImageData {
  const key = `${w}x${h}`;
  const cached = noiseCache.get(key);
  if (cached) return cached;

  const imageData = ctx.createImageData(w, h);
  const data = imageData.data;
  let seed = 12345;
  for (let i = 0; i < data.length; i += 4) {
    seed = (seed * 1103515245 + 12345) & 0x7fffffff;
    const v = (seed >> 16) & 0xff;
    data[i] = v;
    data[i + 1] = v;
    data[i + 2] = v;
    data[i + 3] = 40;
  }

  noiseCache.set(key, imageData);
  return imageData;
}

export function drawBackground(
  ctx: CanvasRenderingContext2D,
  config: BackgroundConfig,
  width: number,
  height: number,
  baseColor: string,
): void {
  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, width, height);

  if (!config.enabled || config.pattern === "none") return;

  ctx.save();
  ctx.globalAlpha = config.opacity;

  switch (config.pattern) {
    case "noise": {
      const noise = getNoiseImageData(ctx, width, height);
      ctx.putImageData(noise, 0, 0);
      break;
    }
    case "dots": {
      const spacing = 12;
      ctx.fillStyle = "#ffffff";
      for (let y = spacing; y < height; y += spacing) {
        for (let x = spacing; x < width; x += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 0.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      break;
    }
    case "grid": {
      const spacing = 12;
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 0.3;
      ctx.beginPath();
      for (let x = spacing; x < width; x += spacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = spacing; y < height; y += spacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
      break;
    }
    case "stripes": {
      const spacing = 6;
      ctx.fillStyle = "#ffffff";
      for (let y = 0; y < height; y += spacing * 2) {
        ctx.fillRect(0, y, width, 1);
      }
      break;
    }
  }

  ctx.restore();
}
