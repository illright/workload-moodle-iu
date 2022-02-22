export interface RawUpcomingDeadline {
  assignmentid: string;
  assignmentname: string;
  submissiondeadline: string;
  coursename?: string;
}

export interface RawUngradedSubmission {
  assignmentid: string;
  assignmentname: string;
  gradingdeadline: string;
  gradedsubmissions: number;
  submissions: number;
}
