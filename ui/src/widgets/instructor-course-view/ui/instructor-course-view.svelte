<script lang="ts">
  import { persistentWritable, localStorageAdapter } from 'svelte-persistent-writable';
  import { binAssignmentsToDays, generateCalendar, BinningMode, CountMode, type CourseToStudents, type SiblingAssignment } from '@/shared/api';
  import { Calendar } from '@/shared/ui';

  interface InstructorPreferences {
    highlightThisCourse: boolean;
    binningMode: BinningMode;
    assignmentCountMode: CountMode;
  }

  const preferences = persistentWritable<InstructorPreferences>(
    {
      highlightThisCourse: false,
      binningMode: BinningMode.span,
      assignmentCountMode: CountMode.max,
    },
    {
      storage: localStorageAdapter('study-workload:preferences')
    }
  );

  export let courseToStudents: CourseToStudents;
  export let siblingAssignments: SiblingAssignment[];
  export let courseStartTimestamp: number;
  export let courseEndTimestamp: number;
  export let courseID: number;

  $: beforeCourseStart = new Date((courseStartTimestamp - 24 * 60 * 60) * 1000);
  $: afterCourseEnd = new Date((courseEndTimestamp + 24 * 60 * 60) * 1000);

  $: dayBins = binAssignmentsToDays(
    siblingAssignments,
    courseStartTimestamp,
    courseEndTimestamp,
    $preferences.binningMode,
  );

  $: calendarData = generateCalendar(
    dayBins,
    new Date(courseStartTimestamp * 1000),
    courseToStudents,
    $preferences.assignmentCountMode,
    $preferences.highlightThisCourse ? courseID : undefined,
  );

  let preferencesShown = false;
</script>

<div class="workload-calendar">
  {#if preferencesShown}
    <div class="sheet">
      <div class="title">Configure the workload calendar</div>
      <form>
        <fieldset>
          <label>
            <input type="checkbox" name="highlight" value="true" bind:checked={$preferences.highlightThisCourse} />
            Highlight days that have assignments from this course
          </label>
        </fieldset>
        <fieldset>
          <p>Span of assignments:</p>
          <label>
            <input type="radio" name="span" value="span" bind:group={$preferences.binningMode} />
            Every day from release to due date
          </label>
          <label>
            <input type="radio" name="span" value="end" bind:group={$preferences.binningMode} />
            Only the day the assignment is due
          </label>
        </fieldset>
        <fieldset>
          <p>Amount of assignments per day:</p>
          <label>
            <input type="radio" name="count-mode" value="sum" bind:group={$preferences.assignmentCountMode} />
            Total amount of assignments among enrolled students
          </label>
          <label>
            <input type="radio" name="count-mode" value="max" bind:group={$preferences.assignmentCountMode} />
            Maximal amount of assignments for a single student
          </label>
        </fieldset>
      </form>
    </div>
    <button on:click={() => preferencesShown = false}>Save settings</button>
  {:else}
    <div class="sheet">
      <Calendar
        {calendarData}
        disabledDates={[{ end: beforeCourseStart }, { start: afterCourseEnd }]}
      />
    </div>
    <button on:click={() => preferencesShown = true}>Configure calendar view</button>
  {/if}
</div>

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

  .title {
    font-weight: 700;
    padding: 0.5rem;
  }

  fieldset {
    border: 0;
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    margin-bottom: 0.5rem;
  }

  label {
    display: flex;
    gap: 0.5rem;
    margin: 0.25rem 0;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    margin-top: 0.5rem;
    background: var(--mercury, #e5e5e5);
    border: 1px solid #CED4DA;
    align-self: flex-end;
  }
</style>
