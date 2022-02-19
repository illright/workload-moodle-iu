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
