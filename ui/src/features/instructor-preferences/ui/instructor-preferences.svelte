<script lang="ts">
  import { preferences } from '../model/store';
</script>

<div class="title">Configure the workload calendar</div>
<form>
  <fieldset>
    <label>
      <input
        type="checkbox"
        name="highlight"
        value="true"
        bind:checked={$preferences.highlightThisCourse}
      />
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
      <input
        type="radio"
        name="count-mode"
        value="sum"
        bind:group={$preferences.assignmentCountMode}
      />
      Total amount of assignments among enrolled students
    </label>
    <label>
      <input
        type="radio"
        name="count-mode"
        value="max"
        bind:group={$preferences.assignmentCountMode}
      />
      Maximal amount of assignments for a single student
    </label>
  </fieldset>
</form>

<style>
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
</style>
