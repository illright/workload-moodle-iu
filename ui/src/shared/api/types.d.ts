export interface GradingProgress {
  totalStudents: number;
  submissions: number;
  gradedSubmissions: number;
}

export interface UpcomingDeadline {
  assignmentID: number;
  assignmentName: string;
  submissionDeadline: Date;
  courseName?: string;
}

export interface UngradedSubmission {
  assignmentID: number;
  assignmentName: string;
  gradingDeadline: Date;
  gradingProgress: GradingProgress;
}

export interface CalendarDay {
  assignmentAmount: number;
  hasAssignmentFromSelectedCourse: boolean;
}

export interface SiblingAssignment {
  courseID: CourseID;
  start: number;
  end: number;
}

export type CourseID = number;
export type StudentID = number;
export type DayBin = Map<CourseID, number>;
export type CourseToStudents = Map<CourseID, StudentID[]>;
