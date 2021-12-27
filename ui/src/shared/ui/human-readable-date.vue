<script lang="ts">
  export interface HumanReadableDateProps {
    value: Date;
  }
</script>

<script setup lang="ts">
  defineProps<HumanReadableDateProps>();
</script>

<template>
  <strong>{{ value.toLocaleDateString() }}</strong>
  &mdash;
  <span
    :class="[{ 'font-semibold text-red-700': false }]"
  >
    sometime
  </span>
</template>
