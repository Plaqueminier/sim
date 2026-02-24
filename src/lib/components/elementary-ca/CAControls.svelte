<script lang="ts">
  const PRESET_RULES = [
    { num: 30, name: 'Chaos' },
    { num: 90, name: 'Sierpiński' },
    { num: 110, name: 'Turing' },
    { num: 184, name: 'Traffic' },
    { num: 45, name: 'Fractal' },
    { num: 126, name: 'Complex' },
  ];

  let {
    rule = $bindable(),
    initialState = $bindable(),
    colorAlive = $bindable(),
    colorDead = $bindable(),
    width = $bindable(),
    generations = $bindable(),
    animationSpeed = $bindable(),
    isAnimating,
    onToggleAnimation,
  }: {
    rule: number;
    initialState: 'single' | 'random';
    colorAlive: string;
    colorDead: string;
    width: number;
    generations: number;
    animationSpeed: number;
    isAnimating: boolean;
    onToggleAnimation: () => void;
  } = $props();

  function clampRule(value: string): void {
    rule = Math.max(0, Math.min(255, parseInt(value) || 0));
  }
</script>

<div class="space-y-6">
  <div class="flex flex-wrap gap-6">
    <label class="flex flex-col gap-2">
      <span class="text-sm text-gray-400">Rule (0-255)</span>
      <input
        type="number"
        min="0"
        max="255"
        value={rule}
        oninput={(e) => clampRule(e.currentTarget.value)}
        class="w-24 px-3 py-2 bg-gray-800 rounded border border-gray-700 focus:border-blue-500 outline-none"
      />
    </label>

    <div class="flex flex-col gap-2">
      <span class="text-sm text-gray-400">Presets</span>
      <div class="flex gap-2 flex-wrap">
        {#each PRESET_RULES as preset (preset.num)}
          <button
            onclick={() => (rule = preset.num)}
            class="px-3 py-1.5 rounded text-sm transition-colors {rule === preset.num
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 hover:bg-gray-700'}"
          >
            {preset.num}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <div class="flex flex-wrap gap-6 items-end">
    <div class="flex flex-col gap-2">
      <span class="text-sm text-gray-400">Initial</span>
      <div class="flex gap-2">
        <button
          onclick={() => (initialState = 'single')}
          class="px-3 py-1.5 rounded text-sm {initialState === 'single'
            ? 'bg-blue-600'
            : 'bg-gray-800 hover:bg-gray-700'}"
        >
          Single
        </button>
        <button
          onclick={() => (initialState = 'random')}
          class="px-3 py-1.5 rounded text-sm {initialState === 'random'
            ? 'bg-blue-600'
            : 'bg-gray-800 hover:bg-gray-700'}"
        >
          Random
        </button>
      </div>
    </div>

    <label class="flex flex-col gap-2">
      <span class="text-sm text-gray-400">Alive</span>
      <input
        type="color"
        bind:value={colorAlive}
        class="w-12 h-9 rounded cursor-pointer bg-transparent border-0"
      />
    </label>

    <label class="flex flex-col gap-2">
      <span class="text-sm text-gray-400">Dead</span>
      <input
        type="color"
        bind:value={colorDead}
        class="w-12 h-9 rounded cursor-pointer bg-transparent border-0"
      />
    </label>

    <label class="flex flex-col gap-2">
      <span class="text-sm text-gray-400">Width: {width}</span>
      <input
        type="range"
        min="51"
        max="801"
        step="2"
        bind:value={width}
        class="w-28 accent-blue-500"
      />
    </label>

    <label class="flex flex-col gap-2">
      <span class="text-sm text-gray-400">Gens: {generations}</span>
      <input
        type="range"
        min="50"
        max="300"
        bind:value={generations}
        class="w-28 accent-blue-500"
      />
    </label>

    <label class="flex flex-col gap-2">
      <span class="text-sm text-gray-400">Speed</span>
      <input
        type="range"
        min="1"
        max="100"
        bind:value={animationSpeed}
        class="w-20 accent-blue-500"
      />
    </label>
  </div>

  <div class="flex gap-3">
    <button
      onclick={onToggleAnimation}
      class="px-4 py-2 rounded font-medium {isAnimating
        ? 'bg-red-600 hover:bg-red-700'
        : 'bg-green-600 hover:bg-green-700'}"
    >
      {isAnimating ? 'Stop' : '▶ Animate'}
    </button>
  </div>
</div>
