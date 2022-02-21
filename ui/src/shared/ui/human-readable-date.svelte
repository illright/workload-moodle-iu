<script lang="ts">
  const hourMs = 60 * 60 * 1000;
  const dayMs = 24 * hourMs;

  function estimate(date: Date) {
    const differenceMs = date.valueOf() - Date.now();

    if (differenceMs <= 0) {
      return {
        text: 'overdue',
        critical: true,
      };
    }

    if (differenceMs <= hourMs) {
      return {
        text: 'in an hour',
        critical: true,
      };
    }

    const hoursLeft = Math.ceil(differenceMs / hourMs);
    if (differenceMs <= dayMs && hoursLeft <= 6) {
      return {
        text: `in ${hoursLeft} hours`,
        critical: false,
      };
    }

    const dayOfDate = Math.floor(date.valueOf() / dayMs);
    const today = Math.floor(Date.now() / dayMs);

    if (dayOfDate === today) {
      return {
        text: 'today',
        critical: false,
      };
    }

    if (dayOfDate === today + 1) {
      return {
        text: 'tomorrow',
        critical: false,
      };
    }

    const daysLeft = dayOfDate - today;
    if (daysLeft < 30) {
      return {
        text: `in ${daysLeft} days`,
        critical: false,
      };
    } else {
      return {
        text: 'not any time soon',
        critical: false,
      }
    }
  }

  export let value: Date;
  $: dateEstimate = estimate(value);
</script>

<strong>{value.toLocaleDateString()}</strong>
&mdash;
<span class:critical={dateEstimate.critical}>
  { dateEstimate.text }
</span>

<style>
  .critical {
    font-weight: 600;
    color: rgba(185, 28, 28);
  }
</style>
