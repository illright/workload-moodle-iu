import type {
  UngradedSubmission,
  UpcomingDeadline,
  StudentID,
  CourseID,
  SiblingAssignment,
} from './types';
import type {
  RawUpcomingDeadline,
  RawUngradedSubmission,
  RawCourseAndStudents,
  RawSiblingAssignment,
  RawCourseDates,
} from './plain-db-types';

export function adaptUpcomingDeadline(rawUpcomingDeadline: RawUpcomingDeadline): UpcomingDeadline {
  return {
    assignmentID: parseInt(rawUpcomingDeadline.assignmentid, 10),
    assignmentName: rawUpcomingDeadline.assignmentname,
    submissionDeadline: new Date(parseInt(rawUpcomingDeadline.submissiondeadline, 10) * 1000),
    courseName: rawUpcomingDeadline.coursename ?? undefined,
  };
}

export function adaptUngradedSubmission(
  rawUngradedSubmission: RawUngradedSubmission
): UngradedSubmission {
  return {
    assignmentID: parseInt(rawUngradedSubmission.assignmentid, 10),
    assignmentName: rawUngradedSubmission.assignmentname,
    gradingDeadline: new Date(parseInt(rawUngradedSubmission.gradingdeadline, 10) * 1000),
    gradingProgress: {
      gradedSubmissions: rawUngradedSubmission.gradedsubmissions,
      submissions: rawUngradedSubmission.submissions,
      totalStudents: rawUngradedSubmission.totalstudents,
    },
  };
}

export function adaptCourseToStudentsEntry(
  rawEntry: RawCourseAndStudents
): [CourseID, StudentID[]] {
  return [parseInt(rawEntry.id, 10), JSON.parse(`[${rawEntry.students}]`)];
}

export function adaptSiblingAssignment(rawAssignment: RawSiblingAssignment): SiblingAssignment {
  return {
    courseID: parseInt(rawAssignment.courseid, 10),
    start: parseInt(rawAssignment.start, 10),
    end: parseInt(rawAssignment.end, 10),
  };
}

export function adaptCourseDates(rawDates: RawCourseDates) {
  return {
    courseStartTimestamp: parseInt(rawDates.startdate, 10),
    courseEndTimestamp: parseInt(rawDates.enddate, 10),
  };
}
