<script lang="ts">
  import GradingProgress from './grading-progress.svelte';
  import type { GradingProgress as GradingProgressProps } from '@/shared/api';
  import { HumanReadableDate } from '@/shared/ui';

  export let courseName: string | undefined = undefined;
  export let submissionDeadline: Date | undefined = undefined;
  export let gradingDeadline: Date | undefined = undefined;
  export let gradingProgress: GradingProgressProps | undefined = undefined;
</script>

<div class="bg-white border border-gray-300 p-3 mb-2 last:mb-0">
  <div class="flex flex-col">
    {#if courseName !== undefined}
      <p class="text-xs mb-1">{ courseName }</p>
    {/if}
    <slot name="assignment-name"></slot>
  </div>
  {#if submissionDeadline !== undefined}
    <div class="mt-3 text-sm">
      Due on <HumanReadableDate value={submissionDeadline} />
    </div>
  {/if}
  {#if gradingDeadline !== undefined}
    <div class="mt-3 text-sm">
      To be graded by <HumanReadableDate value={gradingDeadline} />
    </div>
  {/if}
  {#if gradingProgress !== undefined}
    <GradingProgress {...gradingProgress} />
  {/if}
</div>
