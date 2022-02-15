export interface StudentDashboardViewProps {
  upcomingDeadlines: Array<{
    assignmentID: number;
    assignmentName: string;
    courseName: string;
    submissionDeadline: Date;
  }>;
}
