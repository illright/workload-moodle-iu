<script lang="ts">
  import type { CalendarDay } from '../api/types';
  import {
    getWeekdays,
    datesEqual,
    getCalendar,
    type DateRanges,
    type Day,
  } from '../lib/date';

  /** A set of dates to disable. */
  export let disabledDates: DateRanges = [];

  export let calendarData: Map<string, CalendarDay>;

  const weekdays = getWeekdays();

  const today = new Date();

  let shownCalendar = new Date();
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

  function computeTitle(day: Day) {
    if (datesEqual(day.value, today)) {
      if (day.disabled) {
        return 'Today, not available';
      } else {
        return 'Today';
      }
    }
    if (day.disabled) {
      return 'Not available';
    }
    return null;
  }

  const dayNumberFormatter = Intl.DateTimeFormat(undefined, { day: 'numeric' });
  const headerFormatter = Intl.DateTimeFormat(undefined, {
    month: 'long',
    year: 'numeric',
  });
</script>

<div class="month-header">
  <button on:click={showPrevMonth} title="Previous month">
    &lt;
  </button>
  <div class="month-display">
    {headerFormatter.format(shownCalendar)}
  </div>
  <button on:click={showNextMonth} title="Next month">
    &gt;
  </button>
</div>
<div class="weekdays">
  {#each weekdays as dayName (dayName)}
    <span class="weekday">{dayName}</span>
  {/each}
</div>
{#each getCalendar(month, year, disabledDates) as week}
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
        title={computeTitle(day)}
      >
        <div class="date">
          {dayNumberFormatter.format(day.value)}
        </div>
        <div class="data">
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
    flex: 0;
  }

  .month-display {
    min-width: 12em;
    text-align: center;
  }

.weekdays {
  display: flex;
  font-size: 0.85em;
  padding: 0.5em 1em;
}

.weekday {
  text-align: center;
  width: 14.28571429%;
}

.week {
  display: flex;
  justify-content: space-between;
  --day-size: 2.25rem;
  --day-gap: 0.0625rem;
  --side-padding: 1rem;
}

.week:not(:last-child) {
  margin-bottom: 1rem;
}

.day:last-child {
  padding-right: var(--side-padding);
}

.day:first-child {
  padding-left: var(--side-padding);
}

.day {
  color: #000;
  font-size: 0.9em;
  width: var(--day-size);
  height: var(--day-size);
  justify-content: center;
  margin: var(--day-gap);
  z-index: 2;
}

.day.today {
  color: purple;
}

.day.highlight {
  border: 1px solid purple;
}

.day.outside {
  color: gray;
}

.day.disabled {
  color: red;
  position: relative;
}

.day.disabled::before {
  background: red;
  content: '';
  height: 1px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translateX(-50%) rotate(-30deg);
  width: 50%;
}
</style>
