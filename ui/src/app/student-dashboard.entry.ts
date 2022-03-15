import { StudentDashboardView } from '@/widgets/student-dashboard-view';
import { adaptUpcomingDeadline, type RawUpcomingDeadline } from '@/shared/api';

declare const upcomingDeadlines: RawUpcomingDeadline[];

document.addEventListener('DOMContentLoaded', () => {
  new StudentDashboardView({
    target: document.getElementById('workload-target'),
    props: {
      upcomingDeadlines: upcomingDeadlines.map(adaptUpcomingDeadline),
    },
  });
});
