<script lang="ts">
  import { AssignmentLink } from '@/features/go-to-assignment';
  import { InstructorPreferences, preferences } from '@/features/instructor-preferences';
  import { AssignmentCard } from '@/entities/assignment';
  import {
    binAssignmentsToDays,
    generateCalendar,
    type CourseToStudents,
    type SiblingAssignment,
    type UngradedSubmission,
  } from '@/shared/api';
  import { Calendar } from '@/shared/ui';

  export let courseToStudents: CourseToStudents;
  export let siblingAssignments: SiblingAssignment[];
  export let courseStartTimestamp: number;
  export let courseEndTimestamp: number;
  export let courseID: number;
  export let ungradedSubmissions: UngradedSubmission[];

  $: courseStart = new Date((courseStartTimestamp) * 1000);
  $: courseEnd = new Date((courseEndTimestamp) * 1000);

  $: dayBins = binAssignmentsToDays(
    siblingAssignments,
    courseStartTimestamp,
    courseEndTimestamp,
    $preferences.binningMode
  );

  $: calendarData = generateCalendar(
    dayBins,
    new Date(courseStartTimestamp * 1000),
    courseToStudents,
    $preferences.assignmentCountMode,
    $preferences.highlightThisCourse ? courseID : undefined
  );

  let preferencesShown = false;
  let shownCalendar = new Date();
</script>

<p class="section-divider">Number of assignments per day</p>
<p class="section-description">Counts the load of the most loaded student. Includes assignments from other courses.</p>
<div class="workload-calendar">
  {#if preferencesShown}
    <div class="sheet">
      <InstructorPreferences />
    </div>
    <button on:click={() => (preferencesShown = false)}>Save settings</button>
  {:else}
    <div class="sheet">
      <Calendar
        {calendarData}
        bind:shownCalendar
        startFrom={courseStart}
        endAt={courseEnd}
      />
    </div>
    <button on:click={() => (preferencesShown = true)}>Configure calendar view</button>
  {/if}
</div>

{#if ungradedSubmissions.length > 0}
  <p class="section-divider">Ungraded assignments</p>
  <p class="section-description">Assignments that have at least one ungraded submission and their grading progress.</p>

  {#each ungradedSubmissions as assignment (assignment.assignmentID)}
    <AssignmentCard
      gradingDeadline={assignment.gradingDeadline}
      gradingProgress={assignment.gradingProgress}
      verboseGrading
    >
      <svelte:fragment slot="assignment-name">
        <AssignmentLink id={assignment.assignmentID}>
          {assignment.assignmentName}
        </AssignmentLink>
      </svelte:fragment>
    </AssignmentCard>
  {/each}
{/if}

<style>
  .workload-calendar {
    display: flex;
    flex-direction: column;
  }

  .sheet {
    background: var(--white);
    padding: 0.75rem 0.5rem;
    border: 1px solid var(--mercury, #e5e5e5);
    border-radius: 0.25rem;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
    background: var(--mercury, #e5e5e5);
    border: 1px solid #ced4da;
    color: var(--black, #000);
    align-self: flex-end;
  }

  .section-divider {
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .section-description {
    margin-bottom: 1rem;
  }

  .section-divider:not(:first-child) {
    margin-top: 1.5rem;
  }
</style>
