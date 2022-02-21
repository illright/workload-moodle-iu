<script lang="ts">
  import { s } from '@/shared/language';

  export let totalStudents: number;
  export let submissions: number;
  export let gradedSubmissions: number;
</script>

<figure>
  <div class="progress-bar">
    <div class="submissions" style:width={`${submissions / totalStudents * 100}%`}>
      <div class="graded-submissions" style:width={`${gradedSubmissions / submissions * 100}%`} />
    </div>
  </div>
  <figcaption>
    <p>{submissions}/{totalStudents} student{s(submissions)} submitted</p>
    <p>{gradedSubmissions}/{submissions} submission{s(gradedSubmissions)} graded</p>
  </figcaption>
</figure>

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
  }

  .submissions {
    background: #93c5fd;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    height: 100%;
  }

  .graded-submissions {
    background: #2563eb;
    border-top-left-radius: 0.25rem;
    border-bottom-left-radius: 0.25rem;
    height: 100%;
  }

  figcaption {
    font-size: 0.875rem;
    line-height: 1.25rem;
    margin-top: 0.5rem;
  }

  figcaption p {
    margin-bottom: 0.25rem;
  }
</style>
