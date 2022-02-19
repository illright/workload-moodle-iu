<script lang="ts">
  import GradingProgress, { type GradingProgressProps } from './grading-progress.svelte';
  import { HumanReadableDate } from '@/shared/ui';

  export let courseName: string | undefined;
  export let submissionDeadline: Date | undefined;
  export let gradingDeadline: Date | undefined;
  export let gradingProgress: GradingProgressProps | undefined;
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
