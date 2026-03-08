<script lang="ts">
  import type { EffectsConfig } from '$lib/effects/types';
  import { drawBackground } from '$lib/effects/background';
  import { drawCells } from '$lib/effects/cell-renderer';
  import { applyBloom } from '$lib/effects/bloom';

  let {
    width,
    generations,
    cellSize,
    colorAlive,
    colorDead,
    grid,
    visibleRows,
    effectsConfig,
    isAnimating,
  }: {
    width: number;
    generations: number;
    cellSize: number;
    colorAlive: string;
    colorDead: string;
    grid: number[][];
    visibleRows: number;
    effectsConfig: EffectsConfig;
    isAnimating: boolean;
  } = $props();

  let canvas: HTMLCanvasElement;
  let wrapper: HTMLDivElement;

  function draw(): void {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;

    if (effectsConfig.background.enabled) {
      drawBackground(ctx, effectsConfig.background, cw, ch, colorDead);
    } else {
      ctx.fillStyle = colorDead;
      ctx.fillRect(0, 0, cw, ch);
    }

    drawCells(
      ctx, grid, visibleRows, cellSize,
      colorAlive, colorDead,
      effectsConfig.cellShape,
      effectsConfig.gradient,
      effectsConfig.scanline,
      isAnimating
    );

    if (effectsConfig.bloom.enabled) {
      applyBloom(canvas, ctx, effectsConfig.bloom);
    }
  }

  $effect(() => {
    draw();
  });

  $effect(() => {
    const rows = visibleRows;
    const animating = isAnimating;
    if (!wrapper || !canvas || !animating) return;
    if (wrapper !== document.fullscreenElement) return;
    const scale = wrapper.clientWidth / canvas.width;
    const frontierY = rows * cellSize * scale;
    const viewBottom = wrapper.scrollTop + wrapper.clientHeight;
    if (frontierY > viewBottom) {
      wrapper.scrollTop = frontierY - wrapper.clientHeight;
    }
  });

  let usePixelated = $derived(
    !effectsConfig.cellShape.enabled || effectsConfig.cellShape.mode === 'square'
  );
</script>

<div bind:this={wrapper} id="ca-canvas-wrapper" class="ca-wrapper flex justify-center items-center bg-gray-800">
  <canvas
    bind:this={canvas}
    width={width * cellSize}
    height={generations * cellSize}
    class="max-w-full"
    style={usePixelated ? 'image-rendering: pixelated' : ''}
  ></canvas>
</div>

<style>
  .ca-wrapper:fullscreen {
    display: block;
    width: 100vw;
    height: 100vh;
    overflow-y: auto;
    scrollbar-width: none;
    background: black;
  }
  .ca-wrapper:fullscreen::-webkit-scrollbar {
    display: none;
  }
  .ca-wrapper:fullscreen canvas {
    width: 100%;
    height: auto;
  }
</style>
