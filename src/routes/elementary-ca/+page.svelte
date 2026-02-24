<script lang="ts">
  import { generateGrid } from '$lib/ca-engine';
  import CACanvas from '$lib/components/elementary-ca/CACanvas.svelte';
  import CAControls from '$lib/components/elementary-ca/CAControls.svelte';
  import RuleVisualization from '$lib/components/elementary-ca/RuleVisualization.svelte';

  const CELL_SIZE = 3;

  let rule = $state(30);
  let width = $state(201);
  let generations = $state(150);
  let colorAlive = $state('#ffffff');
  let colorDead = $state('#0a0a0a');
  let initialState: 'single' | 'random' = $state('single');
  let animationSpeed = $state(50);
  let isAnimating = $state(false);
  let grid: number[][] = $state.raw([]);
  let visibleRows = $state(0);
  let animationTimer: ReturnType<typeof setTimeout> | undefined;

  function computeGrid(): void {
    grid = generateGrid(rule, width, generations, initialState);
    visibleRows = generations;
  }

  function stopAnimation(): void {
    if (animationTimer !== undefined) {
      clearTimeout(animationTimer);
      animationTimer = undefined;
    }
    isAnimating = false;
  }

  function runAnimation(): void {
    grid = generateGrid(rule, width, generations, initialState);
    isAnimating = true;
    visibleRows = 0;
    const speed = Math.max(1, 101 - animationSpeed);

    function animate(): void {
      visibleRows += Math.ceil(generations / 100);
      if (visibleRows >= generations) {
        visibleRows = generations;
        isAnimating = false;
        return;
      }
      animationTimer = setTimeout(animate, speed);
    }
    animate();
  }

  function handleToggleAnimation(): void {
    if (isAnimating) {
      stopAnimation();
      visibleRows = generations;
    } else {
      runAnimation();
    }
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

<div class="min-h-screen bg-gray-900 text-white p-6">
  <div class="mx-auto max-w-7xl">
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
      bind:animationSpeed
      {isAnimating}
      onToggleAnimation={handleToggleAnimation}
    />

    <div class="my-6">
      <RuleVisualization {rule} {colorAlive} {colorDead} />
    </div>

    <CACanvas
      {width}
      {generations}
      cellSize={CELL_SIZE}
      {colorAlive}
      {colorDead}
      {grid}
      {visibleRows}
    />
  </div>
</div>
