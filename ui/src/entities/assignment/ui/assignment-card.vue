<script lang="ts">
  import type { GradingProgressProps } from './grading-progress.vue';

  export interface AssignmentCardProps {
    courseName?: string;
    submissionDeadline?: Date;
    gradingDeadline?: Date;
    gradingProgress?: GradingProgressProps;
  }
</script>

<script setup lang="ts">
  import { HumanReadableDate } from '@/shared/ui';

  import GradingProgress from './grading-progress.vue';

  defineProps<AssignmentCardProps>();
</script>

<template>
  <div class="bg-white border border-gray-300 p-3 mb-2 last:mb-0">
    <div class="flex flex-col">
      <p class="text-xs mb-1" v-if="courseName !== undefined">{{ courseName }}</p>
      <slot name="assignment-name"></slot>
    </div>
    <div class="mt-3 text-sm" v-if="submissionDeadline !== undefined">
      Due on <HumanReadableDate :value="submissionDeadline" />
    </div>
    <div class="mt-3 text-sm" v-if="gradingDeadline !== undefined">
      To be graded by <HumanReadableDate :value="gradingDeadline" />
    </div>
    <GradingProgress v-if="gradingProgress !== undefined" v-bind="gradingProgress" />
  </div>
</template>
