export interface StudentCourseViewProps {
  upcomingDeadlines: Array<{
    assignmentID: number;
    assignmentName: string;
    submissionDeadline: Date;
  }>;
  ungradedSubmissions: Array<{
    assignmentID: number;
    assignmentName: string;
    gradingDeadline: Date;
    gradingProgress: {
      totalStudents: number;
      submissions: number;
      gradedSubmissions: number;
    };
  }>;
}
