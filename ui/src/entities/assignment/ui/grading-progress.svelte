<script lang="ts">
  import { s } from '@/shared/language';

  export let totalStudents: number;
  export let submissions: number;
  export let gradedSubmissions: number;

  export let verbose = false;
</script>

{#if verbose}
  <figure>
    <div class="progress-bar" title="How many students still didn't submit">
      <div class="bar submissions" style="width: {(submissions / totalStudents) * 100}%;" title="How many students submitted">
        <div class="bar graded-submissions" style="width: {(gradedSubmissions / submissions) * 100}%;" title="How many submissions were graded" />
      </div>
    </div>
    <figcaption>
      <p>{submissions}/{totalStudents} student{s(submissions)} submitted</p>
      <p>{gradedSubmissions}/{submissions} submission{s(gradedSubmissions)} graded</p>
    </figcaption>
  </figure>
{:else}
  <p class="status-text">{Math.round(gradedSubmissions / submissions * 100)}% of all submissions graded</p>
{/if}

<style>
  figure {
    margin: 0;
  }

  .progress-bar {
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    background: #f9fafb;
    height: 0.5rem;
    margin-top: 1rem;
    overflow: hidden;
    cursor: help;
  }

  .submissions {
    background: #93c5fd;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    height: 100%;
  }

  .submissions:hover {
    background: hsl(212, 96%, 85%);
    cursor: help;
  }


  .graded-submissions {
    background: #2563eb;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    height: 100%;
  }

  .graded-submissions:hover {
    background: hsl(221, 83%, 60%);
    cursor: help;
  }

  figcaption {
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin-top: 0.5rem;
  }

  figcaption p {
    margin-bottom: 0.25rem;
  }

  .status-text {
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin-top: 0.75rem;
  }
</style>
