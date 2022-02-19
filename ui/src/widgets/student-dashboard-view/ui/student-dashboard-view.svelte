<script lang="ts">
  import { AssignmentCard } from '@/entities/assignment';
  import { AssignmentLink } from '@/features/go-to-assignment';
  import type { UpcomingDeadline } from '@/shared/api';

  export let upcomingDeadlines: UpcomingDeadline[];
</script>

<p class="mb-3 text-center font-medium">Upcoming deadlines</p>

{#each upcomingDeadlines as assignment (assignment.assignmentID)}
  <AssignmentCard
    courseName={assignment.courseName}
    submissionDeadline={assignment.submissionDeadline}
  >
    <svelte:fragment slot="assignment-name">
      <AssignmentLink id={assignment.assignmentID}>
        {assignment.assignmentName}
      </AssignmentLink>
    </svelte:fragment>
  </AssignmentCard>
{/each}

