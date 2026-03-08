import type { CellShapeConfig, GradientConfig, ScanlineConfig } from './types';
import { buildColorLUT } from './gradient';

const TAU = Math.PI * 2;

function posHash(x: number, y: number): number {
  return ((x * 2654435761) ^ (y * 2246822519)) & 0xffff;
}

function countNeighbors(grid: number[][], x: number, y: number, w: number): number {
  let count = 0;
  const row = grid[y];
  if (x > 0 && row[x - 1]) count++;
  if (x < w - 1 && row[x + 1]) count++;
  if (y > 0) {
    const prev = grid[y - 1];
    if (prev[x]) count++;
    if (x > 0 && prev[x - 1]) count++;
    if (x < w - 1 && prev[x + 1]) count++;
  }
  return count;
}

export function drawCells(
  ctx: CanvasRenderingContext2D,
  grid: number[][],
  visibleRows: number,
  cellSize: number,
  colorAlive: string,
  colorDead: string,
  shapeConfig: CellShapeConfig,
  gradientConfig: GradientConfig,
  scanlineConfig: ScanlineConfig,
  isAnimating: boolean
): void {
  const rows = Math.min(visibleRows, grid.length);
  if (rows === 0) return;
  const w = grid[0].length;
  const useGradient = gradientConfig.enabled;
  const useShape = shapeConfig.enabled;
  const useScanline = scanlineConfig.enabled && isAnimating;
  const half = cellSize / 2;

  let lut: string[] | null = null;
  if (useGradient) {
    lut = buildColorLUT(gradientConfig.palette);
  }

  // Fast path: no effects at all
  if (!useGradient && !useShape && !useScanline) {
    ctx.fillStyle = colorAlive;
    for (let y = 0; y < rows; y++) {
      const row = grid[y];
      for (let x = 0; x < w; x++) {
        if (row[x] === 1) {
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    }
    return;
  }

  for (let y = 0; y < rows; y++) {
    const row = grid[y];

    // Scanline: adjust alpha per row
    if (useScanline) {
      const dist = rows - 1 - y;
      if (dist < scanlineConfig.fadeDepth) {
        const t = 1.0 - (dist / scanlineConfig.fadeDepth) * 0.6;
        ctx.globalAlpha = t;
        if (dist === 0) {
          ctx.shadowColor = colorAlive;
          ctx.shadowBlur = 6 * scanlineConfig.glowIntensity;
        } else {
          ctx.shadowBlur = 0;
        }
      } else {
        ctx.globalAlpha = 0.4;
        ctx.shadowBlur = 0;
      }
    }

    for (let x = 0; x < w; x++) {
      if (row[x] !== 1) continue;

      // Color
      if (useGradient && lut) {
        let index: number;
        if (gradientConfig.mode === 'y-position') {
          index = rows > 1 ? Math.floor((y / (rows - 1)) * 255) : 0;
        } else {
          const n = countNeighbors(grid, x, y, w);
          index = Math.min(n * 51, 255);
        }
        ctx.fillStyle = lut[index];
      } else {
        ctx.fillStyle = colorAlive;
      }

      const px = x * cellSize;
      const py = y * cellSize;

      // Shape
      if (!useShape || shapeConfig.mode === 'square') {
        ctx.fillRect(px, py, cellSize, cellSize);
      } else if (shapeConfig.mode === 'circle') {
        ctx.beginPath();
        ctx.arc(px + half, py + half, half * 0.85, 0, TAU);
        ctx.fill();
      } else {
        // Blob: jittered circles + bridging between adjacent alive cells
        const h = posHash(x, y);
        const radiusJitter = 0.7 + ((h & 0xff) / 255) * 0.3;
        const r = half * radiusJitter;

        ctx.beginPath();
        ctx.arc(px + half, py + half, r, 0, TAU);
        ctx.fill();

        // Bridge to right neighbor
        if (x < w - 1 && row[x + 1] === 1) {
          ctx.fillRect(px + half, py + half - r * 0.5, cellSize, r);
        }
        // Bridge to below neighbor
        if (y < rows - 1 && grid[y + 1][x] === 1) {
          ctx.fillRect(px + half - r * 0.5, py + half, r, cellSize);
        }
      }
    }
  }

  // Reset state
  if (useScanline) {
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
  }
}
