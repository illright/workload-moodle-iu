<script lang="ts">
  import { preferences } from '../model/store';
</script>

<div class="title">Configure the workload calendar</div>
<form>
  <fieldset>
    <div class="field">
      <input
        type="checkbox"
        name="highlight"
        id="workload-highlight-checkbox"
        value="true"
        bind:checked={$preferences.highlightThisCourse}
      />
      <div>
        <label for="workload-highlight-checkbox">
          Highlight days that have assignments from this course
        </label>
        <div class="describing-text">Will give these days a blue border in the calendar</div>
      </div>
    </div>
  </fieldset>
  <fieldset>
    <p>Span of assignments:</p>
    <div class="describing-text">Every day in the calendar has a counter. This determines which counters will an assignment increase</div>
    <div class="field">
      <input type="radio" name="span" id="workload-span-span" value="span" bind:group={$preferences.binningMode} />
      <label for="workload-span-span">Every day from release to due date</label>
    </div>
    <div class="field">
      <input type="radio" name="span" id="workload-span-end" value="end" bind:group={$preferences.binningMode} />
      <label for="workload-span-end">Only the day the assignment is due</label>
    </div>
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

  fieldset p {
    margin-bottom: 0;
  }

  .field {
    display: flex;
    gap: 0.5rem;
    margin: 0.25rem 0;
  }

  p {
    font-weight: 700;
  }

  input {
    margin-top: 0.25rem;
  }

  .describing-text {
    font-size: 0.9em;
    font-style: italic;
  }
</style>
