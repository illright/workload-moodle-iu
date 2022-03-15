<script lang="ts">
  import { AssignmentCard } from '@/entities/assignment';
  import { AssignmentLink } from '@/features/go-to-assignment';
  import type { UpcomingDeadline } from '@/shared/api';

  export let upcomingDeadlines: UpcomingDeadline[];
</script>

<p>Upcoming deadlines</p>

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
{:else}
  <p><strong>Nothing to worry about!</strong></p>
{/each}

<style>
  :global(p) {
    margin: 0;
  }

  p {
    margin-bottom: 0.75rem;
    font-weight: 500;
    text-align: center;
  }
</style>
