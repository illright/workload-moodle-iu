<script lang="ts">
  import { binAssignmentsToDays, generateCalendar, BinningMode, CountMode, type CourseToStudents, type SiblingAssignment } from '@/shared/api';

  export let courseToStudents: CourseToStudents;
  export let siblingAssignments: SiblingAssignment[];
  export let courseStartTimestamp: number;
  export let courseEndTimestamp: number;
  export let courseID: number;

  $: dayBins = binAssignmentsToDays(siblingAssignments, courseStartTimestamp, courseEndTimestamp, BinningMode.span);

  $: {
    console.log('calendar', generateCalendar(dayBins, new Date(courseStartTimestamp * 1000), courseToStudents, CountMode.sum, courseID));
  }
</script>
