<script lang="ts">
  import GradingProgress from './grading-progress.svelte';
  import type { GradingProgress as GradingProgressProps } from '@/shared/api';
  import { HumanReadableDate } from '@/shared/ui';

  export let courseName: string | undefined = undefined;
  export let submissionDeadline: Date | undefined = undefined;
  export let gradingDeadline: Date | undefined = undefined;
  export let gradingProgress: GradingProgressProps | undefined = undefined;

  export let verboseGrading = false;
</script>

<div class="card">
  <div class="flex-col">
    {#if courseName !== undefined}
      <p class="course-name">{courseName}</p>
    {/if}
    <slot name="assignment-name" />
  </div>
  {#if submissionDeadline !== undefined}
    <div class="status-text">
      Due on <HumanReadableDate value={submissionDeadline} />
    </div>
  {/if}
  {#if gradingDeadline !== undefined}
    <div class="status-text">
      To be graded by <HumanReadableDate value={gradingDeadline} />
    </div>
  {/if}
  {#if gradingProgress !== undefined}
    <GradingProgress {...gradingProgress} verbose={verboseGrading} />
  {/if}
</div>

<style>
  .card {
    padding: 0.75rem;
    margin-bottom: 0.5rem;
    background-color: var(--white);
    border: 1px solid var(--mercury, #e5e5e5);
  }

  .card:last-child {
    margin-bottom: 0;
  }

  .course-name {
    font-size: 0.85rem;
    line-height: 1rem;
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
  }

  .status-text {
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin-top: 0.75rem;
  }

  .flex-col {
    display: flex;
    flex-direction: column;
  }
</style>
