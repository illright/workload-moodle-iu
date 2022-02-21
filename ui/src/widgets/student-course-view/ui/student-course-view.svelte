<script lang="ts">
  import { AssignmentCard } from '@/entities/assignment';
  import { AssignmentLink } from '@/features/go-to-assignment';
  import type { UpcomingDeadline, UngradedSubmission } from '@/shared/api';

  export let upcomingDeadlines: UpcomingDeadline[];
  export let ungradedSubmissions: UngradedSubmission[];
</script>

<p>Upcoming deadlines</p>

{#each upcomingDeadlines as assignment (assignment.assignmentID)}
  <AssignmentCard
    submissionDeadline={assignment.submissionDeadline}
  >
    <svelte:fragment slot="assignment-name">
      <AssignmentLink id={assignment.assignmentID}>
        {assignment.assignmentName}
      </AssignmentLink>
    </svelte:fragment>
  </AssignmentCard>
{/each}

<p>Ungraded submissions</p>

{#each ungradedSubmissions as assignment (assignment.assignmentID)}
  <AssignmentCard
    gradingDeadline={assignment.gradingDeadline}
    gradingProgress={assignment.gradingProgress}
  >
    <svelte:fragment slot="assignment-name">
      <AssignmentLink id={assignment.assignmentID}>
        {assignment.assignmentName}
      </AssignmentLink>
    </svelte:fragment>
  </AssignmentCard>
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

  p:not(:first-child) {
    margin-top: 1.5rem;
  }
</style>
