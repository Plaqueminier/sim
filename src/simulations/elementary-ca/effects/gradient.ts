import type { Palette } from "./types";

interface ColorStop {
  r: number;
  g: number;
  b: number;
}

const PALETTES: Record<Palette, ColorStop[]> = {
  fire: [
    { r: 0, g: 0, b: 0 },
    { r: 180, g: 30, b: 0 },
    { r: 220, g: 90, b: 0 },
    { r: 255, g: 200, b: 50 },
    { r: 255, g: 255, b: 220 },
  ],
  ocean: [
    { r: 10, g: 10, b: 46 },
    { r: 26, g: 58, b: 92 },
    { r: 46, g: 139, b: 139 },
    { r: 100, g: 200, b: 180 },
    { r: 127, g: 255, b: 212 },
  ],
  neon: [
    { r: 13, g: 2, b: 33 },
    { r: 120, g: 0, b: 200 },
    { r: 255, g: 0, b: 255 },
    { r: 0, g: 255, b: 255 },
    { r: 255, g: 255, b: 255 },
  ],
  pastel: [
    { r: 45, g: 27, b: 105 },
    { r: 130, g: 80, b: 170 },
    { r: 184, g: 169, b: 201 },
    { r: 240, g: 201, b: 207 },
    { r: 255, g: 236, b: 210 },
  ],
};

function lerp(a: ColorStop, b: ColorStop, t: number): string {
  const r = Math.round(a.r + (b.r - a.r) * t);
  const g = Math.round(a.g + (b.g - a.g) * t);
  const bl = Math.round(a.b + (b.b - a.b) * t);
  return `rgb(${r},${g},${bl})`;
}

const lutCache = new Map<Palette, string[]>();

export function buildColorLUT(palette: Palette): string[] {
  const cached = lutCache.get(palette);
  if (cached) return cached;

  const stops = PALETTES[palette];
  const lut: string[] = new Array(256);
  const segments = stops.length - 1;

  for (let i = 0; i < 256; i++) {
    const pos = (i / 255) * segments;
    const segIndex = Math.min(Math.floor(pos), segments - 1);
    const t = pos - segIndex;
    const a = stops[segIndex];
    const b = stops[segIndex + 1];
    if (!a || !b) continue;
    lut[i] = lerp(a, b, t);
  }

  lutCache.set(palette, lut);
  return lut;
}
