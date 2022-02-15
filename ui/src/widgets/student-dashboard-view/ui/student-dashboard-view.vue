<script setup lang="ts">
  import { AssignmentCard } from '@/entities/assignment';
  import { AssignmentLink } from '@/features/go-to-assignment';

  defineProps<{
    upcomingDeadlines: Array<{
      assignmentID: number;
      assignmentName: string;
      courseName: string;
      submissionDeadline: Date;
    }>;
  }>();
</script>

<template>
  <p class="mb-3 text-center font-medium">Upcoming deadlines</p>

  <AssignmentCard
    v-for="assignment in upcomingDeadlines"
    :key="assignment.assignmentID"
    :courseName="assignment.courseName"
    :submissionDeadline="assignment.submissionDeadline"
  >
    <template v-slot:assignment-name>
      <AssignmentLink :id="assignment.assignmentID">
        {{ assignment.assignmentName }}
      </AssignmentLink>
    </template>
  </AssignmentCard>
</template>
