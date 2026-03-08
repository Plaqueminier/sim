<script lang="ts">
  import { generateGrid } from '$lib/ca-engine';
  import { defaultEffectsConfig } from '$lib/effects/types';
  import CACanvas from '$lib/components/elementary-ca/CACanvas.svelte';
  import CAControls from '$lib/components/elementary-ca/CAControls.svelte';
  import EffectsPanel from '$lib/components/elementary-ca/EffectsPanel.svelte';
  import RuleVisualization from '$lib/components/elementary-ca/RuleVisualization.svelte';

  const CELL_SIZE = 3;

  function computeMaxWidth(): number {
    if (typeof window === 'undefined') return 201;
    const w = Math.floor(window.innerWidth / CELL_SIZE);
    return w % 2 === 0 ? w - 1 : w;
  }

  let maxWidth = $state(computeMaxWidth());
  let rule = $state(30);
  let width = $state(maxWidth);
  let generations = $state(150);
  let colorAlive = $state('#ffffff');
  let colorDead = $state('#0a0a0a');
  let initialState: 'single' | 'random' = $state('single');
  let animationDuration = $state(5);
  let isAnimating = $state(false);
  let effectsConfig = $state(defaultEffectsConfig());
  let fullscreen = $state(false);
  let grid: number[][] = $state.raw([]);
  let visibleRows = $state(0);
  let animationRafId: number | undefined;

  function computeGrid(): void {
    grid = generateGrid(rule, width, generations, initialState);
    visibleRows = generations;
  }

  function stopAnimation(): void {
    if (animationRafId !== undefined) {
      cancelAnimationFrame(animationRafId);
      animationRafId = undefined;
    }
    isAnimating = false;
  }

  function runAnimation(): void {
    grid = generateGrid(rule, width, generations, initialState);
    isAnimating = true;
    visibleRows = 0;
    const durationMs = animationDuration * 1000;
    const startTime = performance.now();

    function animate(now: number): void {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / durationMs);
      visibleRows = Math.round(progress * generations);
      if (progress >= 1) {
        visibleRows = generations;
        isAnimating = false;
        animationRafId = undefined;
        return;
      }
      animationRafId = requestAnimationFrame(animate);
    }
    animationRafId = requestAnimationFrame(animate);
  }

  function handleToggleAnimation(): void {
    if (isAnimating) {
      stopAnimation();
      visibleRows = generations;
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    } else {
      if (fullscreen) {
        document.getElementById('ca-canvas-wrapper')?.requestFullscreen().catch(() => {});
      }
      runAnimation();
    }
  }

  function handleFitWidth(): void {
    maxWidth = computeMaxWidth();
    width = maxWidth;
  }

  $effect(() => {
    rule;
    width;
    generations;
    initialState;
    stopAnimation();
    computeGrid();
  });

  $effect(() => {
    return () => stopAnimation();
  });
</script>

<div class="min-h-screen bg-gray-900 text-white">
  <div class="mx-auto max-w-7xl p-6 pb-0">
    <div class="mb-6">
      <a href="/" class="text-gray-400 hover:text-white text-sm">← Back to home</a>
    </div>

    <h1 class="text-3xl font-bold mb-2">Elementary Cellular Automata</h1>
    <p class="text-gray-400 mb-8">Explore Wolfram's 256 rules of 1D binary cellular automata</p>

    <CAControls
      bind:rule
      bind:initialState
      bind:colorAlive
      bind:colorDead
      bind:width
      bind:generations
      bind:animationDuration
      {maxWidth}
      {isAnimating}
      onToggleAnimation={handleToggleAnimation}
      bind:fullscreen
      onFitWidth={handleFitWidth}
    />

    <div class="my-4">
      <EffectsPanel bind:effectsConfig />
    </div>

    <div class="my-6">
      <RuleVisualization {rule} {colorAlive} {colorDead} />
    </div>
  </div>

  <CACanvas
    {width}
    {generations}
    cellSize={CELL_SIZE}
    {colorAlive}
    {colorDead}
    {grid}
    {visibleRows}
    {effectsConfig}
    {isAnimating}
  />
</div>
