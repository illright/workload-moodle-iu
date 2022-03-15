import { StudentCourseView } from '@/widgets/student-course-view';
import {
  adaptUngradedSubmission,
  adaptUpcomingDeadline,
  type RawUpcomingDeadline,
  type RawUngradedSubmission,
} from '@/shared/api';

declare const upcomingDeadlines: RawUpcomingDeadline[];
declare const ungradedSubmissions: RawUngradedSubmission[];

document.addEventListener('DOMContentLoaded', () => {
  new StudentCourseView({
    target: document.getElementById('workload-target'),
    props: {
      upcomingDeadlines: upcomingDeadlines.map(adaptUpcomingDeadline),
      ungradedSubmissions: ungradedSubmissions.map(adaptUngradedSubmission),
    },
  });
});
