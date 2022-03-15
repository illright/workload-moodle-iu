import { InstructorCourseView } from '@/widgets/instructor-course-view';
import {
  adaptCourseToStudentsEntry,
  adaptSiblingAssignment,
  adaptCourseDates,
  adaptUngradedSubmission,
  type RawCourseAndStudents,
  type RawSiblingAssignment,
  type RawCourseDates,
  type RawUngradedSubmission,
} from '@/shared/api';

declare const courseToStudents: RawCourseAndStudents[];
declare const siblingAssignments: RawSiblingAssignment[];
declare const courseDates: RawCourseDates;
declare const ungradedSubmissions: RawUngradedSubmission[];
declare const courseID: string;

document.addEventListener('DOMContentLoaded', () => {
  new InstructorCourseView({
    target: document.getElementById('workload-target'),
    props: {
      courseToStudents: new Map(courseToStudents.map(adaptCourseToStudentsEntry)),
      siblingAssignments: siblingAssignments.map(adaptSiblingAssignment),
      courseID: parseInt(courseID, 10),
      ungradedSubmissions: ungradedSubmissions.map(adaptUngradedSubmission),
      ...adaptCourseDates(courseDates),
    },
  });
});
