<script lang="ts">
  let {
    width,
    generations,
    cellSize,
    colorAlive,
    colorDead,
    grid,
    visibleRows,
  }: {
    width: number;
    generations: number;
    cellSize: number;
    colorAlive: string;
    colorDead: string;
    grid: number[][];
    visibleRows: number;
  } = $props();

  let canvas: HTMLCanvasElement;

  function draw(): void {
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = colorDead;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = colorAlive;

    for (let y = 0; y < Math.min(visibleRows, grid.length); y++) {
      const row = grid[y];
      for (let x = 0; x < row.length; x++) {
        if (row[x] === 1) {
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    }
  }

  $effect(() => {
    draw();
  });
</script>

<div class="bg-gray-800 rounded-lg p-4">
  <canvas
    bind:this={canvas}
    width={width * cellSize}
    height={generations * cellSize}
    class="mx-auto rounded"
    style="image-rendering: pixelated"
  ></canvas>
</div>
