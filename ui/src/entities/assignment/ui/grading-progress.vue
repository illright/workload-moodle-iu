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
    <div class="rounded border border-gray-300 bg-gray-50 h-2 mt-4 overflow-hidden">
      <div class="bg-blue-300 h-full" :style="{ width: `${submissions / totalStudents * 100}%` }">
        <div class="bg-blue-600 h-full" :style="{ width: `${gradedSubmissions / submissions * 100}%` }" />
      </div>
    </div>
    <figcaption class="text-sm">
      <p class="mt-2">{{ submissions }}/{{ totalStudents }} student{{ s(submissions) }} submitted</p>
      <p class="mt-1">{{ gradedSubmissions }}/{{ submissions }} submission{{ s(gradedSubmissions) }} graded</p>
    </figcaption>
  </figure>
</template>
