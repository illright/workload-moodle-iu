<script setup lang="ts">
  import { AssignmentCard } from '@/entities/assignment';
  import { AssignmentLink } from '@/features/go-to-assignment';

  const upcomingDeadlines = [
    {
      assignmentName: 'Homework Assignment №1. Symbolic differentiation in Racket',
      assignmentID: 1337,
      submissionDeadline: new Date(2021, 10, 21)
    },
    {
      assignmentName: 'Homework Assignment №2. Symbolic integration in Racket',
      assignmentID: 1338,
      submissionDeadline: new Date(2021, 9, 21)
    },
  ];

  const ungradedSubmissions = [
    {
      assignmentName: 'Homework Assignment №0. Symbolic reading in Racket',
      assignmentID: 1339,
      gradingDeadline: new Date(2021, 10, 21),
      gradingProgress: {
        totalStudents: 120,
        submissions: 60,
        gradedSubmissions: 40,
      }
    },
  ];
</script>

<template>
  <p class="mb-3 text-center font-medium">Upcoming deadlines</p>

  <AssignmentCard
    v-for="assignment in upcomingDeadlines"
    :submissionDeadline="assignment.submissionDeadline"
  >
    <template v-slot:assignment-name>
      <AssignmentLink :id="assignment.assignmentID">
        {{ assignment.assignmentName }}
      </AssignmentLink>
    </template>
  </AssignmentCard>

  <p class="mt-6 mb-3 text-center font-medium">Ungraded submissions</p>

  <AssignmentCard
    v-for="assignment in ungradedSubmissions"
    :gradingDeadline="assignment.gradingDeadline"
    :gradingProgress="assignment.gradingProgress"
  >
    <template v-slot:assignment-name>
      <AssignmentLink :id="assignment.assignmentID">
        {{ assignment.assignmentName }}
      </AssignmentLink>
    </template>
  </AssignmentCard>
</template>
