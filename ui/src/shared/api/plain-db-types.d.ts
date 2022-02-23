/**
 * Database queries do not preserve the casing of aliases and output
 * dates as timestamps in seconds (JS works with timestamps in milliseconds).
 */

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
  totalstudents: number;
}
