<script lang="ts">
  let {
    rule,
    colorAlive,
    colorDead,
  }: {
    rule: number;
    colorAlive: string;
    colorDead: string;
  } = $props();

  const patterns = [7, 6, 5, 4, 3, 2, 1, 0];
</script>

<div class="p-3 bg-gray-800 rounded-lg">
  <div class="flex gap-3 flex-wrap items-center">
    <span class="text-sm text-gray-400">Rule {rule}:</span>
    {#each patterns as i (i)}
      {@const pattern = i.toString(2).padStart(3, '0')}
      {@const output = (rule >> i) & 1}
      <div class="flex items-center gap-1">
        <div class="flex gap-px">
          {#each pattern.split('') as bit, idx (idx)}
            <div
              class="w-3 h-3 rounded-sm"
              style="background-color: {bit === '1' ? colorAlive : colorDead}; border: 1px solid #374151"
            ></div>
          {/each}
        </div>
        <span class="text-gray-500 text-xs">→</span>
        <div
          class="w-3 h-3 rounded-sm"
          style="background-color: {output === 1 ? colorAlive : colorDead}; border: 1px solid #374151"
        ></div>
      </div>
    {/each}
  </div>
</div>
