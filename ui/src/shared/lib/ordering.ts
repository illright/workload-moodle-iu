import type { UngradedSubmission, UpcomingDeadline } from '@/shared/api';

export function byGradingDeadline(
  submission1: UngradedSubmission,
  submission2: UngradedSubmission
) {
  return submission1.gradingDeadline.valueOf() - submission2.gradingDeadline.valueOf();
}

export function bySubmissionDeadline(assignment1: UpcomingDeadline, assignment2: UpcomingDeadline) {
  return assignment1.submissionDeadline.valueOf() - assignment2.submissionDeadline.valueOf();
}
