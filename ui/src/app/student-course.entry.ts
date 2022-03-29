import { StudentCourseView } from '@/widgets/student-course-view';
import {
  adaptUngradedSubmission,
  adaptUpcomingDeadline,
  type RawUpcomingDeadline,
  type RawUngradedSubmission,
} from '@/shared/api';
import { bySubmissionDeadline, byGradingDeadline } from '@/shared/lib';

declare const upcomingDeadlines: RawUpcomingDeadline[];
declare const ungradedSubmissions: RawUngradedSubmission[];

document.addEventListener('DOMContentLoaded', () => {
  new StudentCourseView({
    target: document.getElementById('workload-target'),
    props: {
      upcomingDeadlines: upcomingDeadlines.map(adaptUpcomingDeadline).sort(bySubmissionDeadline),
      ungradedSubmissions: ungradedSubmissions.map(adaptUngradedSubmission).sort(byGradingDeadline),
    },
  });
});
