<script lang="ts">
  export interface StudentCourseViewProps {
    upcomingDeadlines: Array<{
      assignmentID: number;
      assignmentName: string;
      submissionDeadline: Date;
    }>;
    ungradedSubmissions: Array<{
      assignmentID: number;
      assignmentName: string;
      gradingDeadline: Date;
      gradingProgress: {
        totalStudents: number;
        submissions: number;
        gradedSubmissions: number;
      };
    }>;
  }
</script>

<script setup lang="ts">
  import { AssignmentCard } from '@/entities/assignment';
  import { AssignmentLink } from '@/features/go-to-assignment';

  defineProps<StudentCourseViewProps>();
</script>

<template>
  <p class="mb-3 text-center font-medium">Upcoming deadlines</p>

  <AssignmentCard
    v-for="assignment in upcomingDeadlines"
    :key="assignment.assignmentID"
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
    :key="assignment.assignmentID"
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
