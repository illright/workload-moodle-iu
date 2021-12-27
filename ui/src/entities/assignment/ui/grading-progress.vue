<script lang="ts">
  export interface GradingProgressProps {
    totalStudents: number;
    submissions: number;
    gradedSubmissions: number;
  }
</script>

<script setup lang="ts">
  import { s } from '@/shared/language';

  defineProps<GradingProgressProps>();
</script>

<template>
  <figure>
    <div class="rounded border border-gray-300 bg-gray-50">
      <div class="bg-blue-300 h-full" :style="{ width: `${submissions / totalStudents}%` }">
        <div class="bg-blue-600 h-full" :style="{ width: `${gradedSubmissions / submissions}%` }" />
      </div>
    </div>
    <figcaption>
      <p>{{ submissions }}/{{ totalStudents }} student{{ s(submissions) }} submitted</p>
      <p>{{ gradedSubmissions }}/{{ submissions }} submission{{ s(gradedSubmissions) }} graded</p>
    </figcaption>
  </figure>
</template>
