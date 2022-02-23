import type { UngradedSubmission, UpcomingDeadline } from "./types";
import type { RawUpcomingDeadline, RawUngradedSubmission } from "./plain-db-types";

export function adaptUpcomingDeadline(rawUpcomingDeadline: RawUpcomingDeadline): UpcomingDeadline {
  return {
    assignmentID: parseInt(rawUpcomingDeadline.assignmentid, 10),
    assignmentName: rawUpcomingDeadline.assignmentname,
    submissionDeadline: new Date(parseInt(rawUpcomingDeadline.submissiondeadline, 10) * 1000),
    courseName: rawUpcomingDeadline.coursename ?? undefined,
  };
}

export function adaptUngradedSubmission(rawUngradedSubmission: RawUngradedSubmission): UngradedSubmission {
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
