<script lang="ts">
  export interface AssignmentLinkProps {
    id: number;
  }
</script>

<script setup lang="ts">
  defineProps<AssignmentLinkProps>();

  const moodleAssignmentURL = '/mod/assign/view.php';
</script>

<template>
  <a
    class="underline text-orange-500 leading-5"
    :href="`${moodleAssignmentURL}?id=${id}`"
  >
    <slot />
  </a>
</template>
