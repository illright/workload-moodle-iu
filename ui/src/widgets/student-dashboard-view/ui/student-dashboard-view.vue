<script setup lang="ts">
  import { AssignmentCard } from '@/entities/assignment';
  import { AssignmentLink } from '@/features/go-to-assignment';

  const upcomingDeadlines = [
    {
      courseName: '[F21] Programming Paradigms (Y-4)',
      assignmentName: 'Homework Assignment №1. Symbolic differentiation in Racket',
      assignmentID: 1337,
      submissionDeadline: new Date(2021, 10, 21)
    },
    {
      courseName: '[F21] Philosophy II',
      assignmentName: 'Video on a philosophical topic',
      assignmentID: 1338,
      submissionDeadline: new Date(2021, 9, 21)
    },
  ]
</script>

<template>
  <p class="mb-3 text-center font-medium">Upcoming deadlines</p>

  <AssignmentCard
    v-for="assignment in upcomingDeadlines"
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
