<script lang="ts">
  import { ArrowLeftIcon, ArrowRightIcon } from 'svelte-feather-icons';
  import type { CalendarDay } from '../api/types';
  import { getWeekdays, datesEqual, getCalendar, type Day } from '../lib/date';

  export let calendarData: Map<string, CalendarDay>;
  export let startFrom: Date;
  export let endAt: Date;

  const weekdays = getWeekdays();

  const today = new Date();

  export let shownCalendar = new Date();
  $: month = shownCalendar.getMonth();
  $: year = shownCalendar.getFullYear();

  function showPrevMonth() {
    shownCalendar.setMonth(shownCalendar.getMonth() - 1);
    shownCalendar = shownCalendar;
  }

  function showNextMonth() {
    shownCalendar.setMonth(shownCalendar.getMonth() + 1);
    shownCalendar = shownCalendar;
  }

  function capitalize(text: string) {
    return (text[0]?.toLocaleUpperCase() ?? '') + text.slice(1);
  }

  const sunday = 0;
  function computeTitle(day: Day, highlight: boolean) {
    const parts = [];

    if (datesEqual(day.value, today)) {
      parts.push('today');
    }
    if (highlight) {
      parts.push('has assignment from this course');
    }
    if (day.value.getDay() === sunday) {
      parts.push('weekend');
    }
    return capitalize(parts.join(', ')) || null;
  }

  const dayNumberFormatter = Intl.DateTimeFormat(undefined, { day: 'numeric' });
  const headerFormatter = Intl.DateTimeFormat(undefined, {
    month: 'long',
    year: 'numeric',
  });
</script>

<div class="month-header">
  <button
    on:click={showPrevMonth}
    title="Previous month"
    disabled={shownCalendar.getFullYear() === startFrom.getFullYear() &&
      shownCalendar.getMonth() === startFrom.getMonth()}
  >
    <ArrowLeftIcon size="16" />
  </button>
  <div class="month-display">
    {headerFormatter.format(shownCalendar)}
  </div>
  <button
    on:click={showNextMonth}
    title="Next month"
    disabled={shownCalendar.getFullYear() === endAt.getFullYear() &&
      shownCalendar.getMonth() === endAt.getMonth()}
  >
    <ArrowRightIcon size="16" />
  </button>
</div>
<div class="weekdays">
  {#each weekdays as dayName (dayName)}
    <span class="weekday">{dayName}</span>
  {/each}
</div>
{#each getCalendar(month, year, startFrom, endAt) as week}
  <div class="week">
    <!--
      The following .day elements may have one of the classes:
      * .disabled: day is not available for selection
      * .outside:  day is not in this month
      * .today:    day is today
    -->
    {#each week as day}
      {@const dateKey = day.value.toISOString().slice(0, 10)}
      <div
        class="day"
        class:today={datesEqual(day.value, today)}
        class:outside={day.outside}
        class:disabled={day.disabled}
        class:highlight={calendarData.get(dateKey)?.hasAssignmentFromSelectedCourse ?? false}
        title={computeTitle(
          day,
          calendarData.get(dateKey)?.hasAssignmentFromSelectedCourse ?? false
        )}
      >
        <div class="date">
          {dayNumberFormatter.format(day.value)}
        </div>
        <div class="data" data-value={calendarData.get(dateKey)?.assignmentAmount ?? 0}>
          {calendarData.get(dateKey)?.assignmentAmount ?? 0}
        </div>
      </div>
    {/each}
  </div>
{/each}

<style>
  .month-header {
    align-items: center;
    display: flex;
    font-weight: 700;
    justify-content: space-between;
    padding: 0 1rem 0.5em;
  }

  .month-header button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 1.5rem;
    height: 1.5rem;
    padding: 0;
    background: var(--mercury, #e5e5e5);
    border: 1px solid #ced4da;
    color: var(--black, #000);
  }

  .month-header button:disabled {
    background: none;
    cursor: not-allowed;
  }

  .month-display {
    text-align: center;
  }

  .weekdays {
    display: flex;
    font-size: 0.85em;
  }

  .weekday {
    text-align: center;
    width: 14.28571429%;
  }

  .weekday:last-child {
    color: #ba0303;
  }

  .week {
    display: flex;
    justify-content: space-between;
  }

  .day {
    color: #000;
    font-size: 0.9em;
    justify-content: center;
    margin: 0 1px;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-weight: 600;
    width: 14.28571429%;
  }

  .day .date {
    margin-top: 4px;
    margin-bottom: 3px;
    text-align: center;
    width: 100%;
  }

  .day:last-child .date {
    color: #ba0303;
  }

  .day .data {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Fira Code', monospace;
    font-size: 1.125rem;
    width: 2rem;
    height: 2rem;
    box-sizing: border-box;
  }

  .day .data::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: -1;
    height: 100%;
    background: var(--color_secondary);
    box-sizing: border-box;
  }

  .day.highlight .data {
    border: 2px solid #577cff;
  }

  .day.highlight .data::before {
    border: 2px solid transparent;
  }

  .day .data[data-value='0']::before {
    opacity: 10%;
  }

  .day .data[data-value='1']::before {
    opacity: 20%;
  }

  .day .data[data-value='2']::before {
    opacity: 35%;
  }

  .day .data[data-value='3']::before {
    opacity: 50%;
  }

  .day .data[data-value='4']::before {
    opacity: 65%;
  }

  .day .data[data-value='5']::before {
    opacity: 80%;
  }

  .day .data[data-value='6']::before {
    opacity: 95%;
  }

  .day.today {
    color: purple;
  }

  .day.outside {
    color: gray;
  }

  .day.disabled {
    visibility: hidden;
  }
</style>
