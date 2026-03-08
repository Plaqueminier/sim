export interface BloomConfig {
  enabled: boolean;
  intensity: number;
  radius: number;
}

export interface CellShapeConfig {
  enabled: boolean;
  mode: 'square' | 'circle' | 'blob';
}

export type Palette = 'fire' | 'ocean' | 'neon' | 'pastel';

export interface GradientConfig {
  enabled: boolean;
  mode: 'density' | 'y-position';
  palette: Palette;
}

export type BackgroundPattern = 'none' | 'noise' | 'dots' | 'grid' | 'stripes';

export interface BackgroundConfig {
  enabled: boolean;
  pattern: BackgroundPattern;
  opacity: number;
}

export interface ScanlineConfig {
  enabled: boolean;
  fadeDepth: number;
  glowIntensity: number;
}

export interface EffectsConfig {
  bloom: BloomConfig;
  cellShape: CellShapeConfig;
  gradient: GradientConfig;
  background: BackgroundConfig;
  scanline: ScanlineConfig;
}

export function defaultEffectsConfig(): EffectsConfig {
  return {
    bloom: { enabled: false, intensity: 0.6, radius: 8 },
    cellShape: { enabled: false, mode: 'circle' },
    gradient: { enabled: false, mode: 'y-position', palette: 'neon' },
    background: { enabled: false, pattern: 'noise', opacity: 0.15 },
    scanline: { enabled: false, fadeDepth: 80, glowIntensity: 0.7 },
  };
}
