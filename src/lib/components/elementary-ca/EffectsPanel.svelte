<script lang="ts">
  import type { EffectsConfig, Palette, BackgroundPattern } from '$lib/effects/types';

  let {
    effectsConfig = $bindable(),
  }: {
    effectsConfig: EffectsConfig;
  } = $props();

  let expanded = $state(false);

  const palettes: Palette[] = ['fire', 'ocean', 'neon', 'pastel'];
  const bgPatterns: BackgroundPattern[] = ['noise', 'dots', 'grid', 'stripes'];
  const shapeModes = ['square', 'circle', 'blob'] as const;

  const paletteColors: Record<Palette, string[]> = {
    fire: ['#000', '#b41e00', '#dc5a00', '#ffc832', '#ffffdc'],
    ocean: ['#0a0a2e', '#1a3a5c', '#2e8b8b', '#64c8b4', '#7fffd4'],
    neon: ['#0d0221', '#7800c8', '#ff00ff', '#00ffff', '#fff'],
    pastel: ['#2d1b69', '#8250aa', '#b8a9c9', '#f0c9cf', '#ffecd2'],
  };
</script>

<div class="bg-gray-800/50 rounded-lg overflow-hidden">
  <button
    onclick={() => (expanded = !expanded)}
    class="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-300 hover:text-white transition-colors"
  >
    <span>Effects</span>
    <span class="text-xs text-gray-500">{expanded ? '▲' : '▼'}</span>
  </button>

  {#if expanded}
    <div class="px-4 pb-4 space-y-5">

      <!-- Bloom -->
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" bind:checked={effectsConfig.bloom.enabled} class="accent-blue-500" />
          <span class="text-gray-400">Bloom</span>
        </label>
        {#if effectsConfig.bloom.enabled}
          <div class="flex gap-4 ml-5">
            <label class="flex flex-col gap-1">
              <span class="text-xs text-gray-500">Intensity</span>
              <input type="range" min="0.1" max="1" step="0.05" bind:value={effectsConfig.bloom.intensity} class="w-20 accent-blue-500" />
            </label>
            <label class="flex flex-col gap-1">
              <span class="text-xs text-gray-500">Radius</span>
              <input type="range" min="2" max="20" step="1" bind:value={effectsConfig.bloom.radius} class="w-20 accent-blue-500" />
            </label>
          </div>
        {/if}
      </div>

      <!-- Cell Shape -->
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" bind:checked={effectsConfig.cellShape.enabled} class="accent-blue-500" />
          <span class="text-gray-400">Cell Shape</span>
        </label>
        {#if effectsConfig.cellShape.enabled}
          <div class="flex gap-2 ml-5">
            {#each shapeModes as mode (mode)}
              <button
                onclick={() => (effectsConfig.cellShape.mode = mode)}
                class="px-2 py-1 rounded text-xs {effectsConfig.cellShape.mode === mode
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}"
              >
                {mode}
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Gradient -->
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" bind:checked={effectsConfig.gradient.enabled} class="accent-blue-500" />
          <span class="text-gray-400">Gradient</span>
        </label>
        {#if effectsConfig.gradient.enabled}
          <div class="ml-5 space-y-2">
            <div class="flex gap-2">
              <button
                onclick={() => (effectsConfig.gradient.mode = 'y-position')}
                class="px-2 py-1 rounded text-xs {effectsConfig.gradient.mode === 'y-position'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}"
              >
                vertical
              </button>
              <button
                onclick={() => (effectsConfig.gradient.mode = 'density')}
                class="px-2 py-1 rounded text-xs {effectsConfig.gradient.mode === 'density'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}"
              >
                density
              </button>
            </div>
            <div class="flex gap-2">
              {#each palettes as p (p)}
                <button
                  onclick={() => (effectsConfig.gradient.palette = p)}
                  class="flex h-5 w-12 rounded overflow-hidden border-2 {effectsConfig.gradient.palette === p
                    ? 'border-blue-500'
                    : 'border-transparent'}"
                >
                  {#each paletteColors[p] as color, i (i)}
                    <div class="flex-1" style="background-color: {color}"></div>
                  {/each}
                </button>
              {/each}
            </div>
          </div>
        {/if}
      </div>

      <!-- Background -->
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" bind:checked={effectsConfig.background.enabled} class="accent-blue-500" />
          <span class="text-gray-400">Background</span>
        </label>
        {#if effectsConfig.background.enabled}
          <div class="ml-5 space-y-2">
            <div class="flex gap-2">
              {#each bgPatterns as pat (pat)}
                <button
                  onclick={() => (effectsConfig.background.pattern = pat)}
                  class="px-2 py-1 rounded text-xs {effectsConfig.background.pattern === pat
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}"
                >
                  {pat}
                </button>
              {/each}
            </div>
            <label class="flex items-center gap-2">
              <span class="text-xs text-gray-500">Opacity</span>
              <input type="range" min="0.02" max="0.5" step="0.02" bind:value={effectsConfig.background.opacity} class="w-20 accent-blue-500" />
            </label>
          </div>
        {/if}
      </div>

      <!-- Scanline -->
      <div class="space-y-2">
        <label class="flex items-center gap-2 text-sm">
          <input type="checkbox" bind:checked={effectsConfig.scanline.enabled} class="accent-blue-500" />
          <span class="text-gray-400">Scanline</span>
        </label>
        {#if effectsConfig.scanline.enabled}
          <div class="flex gap-4 ml-5">
            <label class="flex flex-col gap-1">
              <span class="text-xs text-gray-500">Fade depth</span>
              <input type="range" min="10" max="200" step="5" bind:value={effectsConfig.scanline.fadeDepth} class="w-20 accent-blue-500" />
            </label>
            <label class="flex flex-col gap-1">
              <span class="text-xs text-gray-500">Glow</span>
              <input type="range" min="0.1" max="1" step="0.05" bind:value={effectsConfig.scanline.glowIntensity} class="w-20 accent-blue-500" />
            </label>
          </div>
        {/if}
      </div>

    </div>
  {/if}
</div>
