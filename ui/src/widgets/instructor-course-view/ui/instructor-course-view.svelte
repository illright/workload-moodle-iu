<script lang="ts">
  import { binAssignmentsToDays, generateCalendar, BinningMode, CountMode, type CourseToStudents, type SiblingAssignment } from '@/shared/api';
  import { Calendar } from '@/shared/ui';

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
    BinningMode.span
  );

  $: calendarData = generateCalendar(
    dayBins,
    new Date(courseStartTimestamp * 1000),
    courseToStudents,
    CountMode.sum,
    courseID
  );

  $: {
    console.log('calendar', calendarData);
  }
</script>

<Calendar {calendarData} disabledDates={[{ end: beforeCourseStart }, { start: afterCourseEnd }]} />
