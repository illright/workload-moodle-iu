<script lang="ts">
  import { AssignmentCard } from '@/entities/assignment';
  import { AssignmentLink } from '@/features/go-to-assignment';
  import type { UpcomingDeadline, UngradedSubmission } from '@/shared/api';

  export let upcomingDeadlines: UpcomingDeadline[];
  export let ungradedSubmissions: UngradedSubmission[];
</script>

<p class="mb-3 text-center font-medium">Upcoming deadlines</p>

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

<p class="mt-6 mb-3 text-center font-medium">Ungraded submissions</p>

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
