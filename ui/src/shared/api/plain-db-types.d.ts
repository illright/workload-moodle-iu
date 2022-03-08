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

export interface RawCourseAndStudents {
  id: string;
  students: string;
}

export interface RawSiblingAssignment {
  // The "name" field is deliberately ignored.
  //   For some reason, it was needed for the query to produce
  //   all of the results that it was supposed to.
  courseid: string;
  start: string;
  end: string;
}

export interface RawCourseDates {
  startdate: string;
  enddate: string;
}
