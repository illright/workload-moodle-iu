import { StudentDashboardView } from '@/widgets/student-dashboard-view';
import type { UpcomingDeadline } from '@/shared/api';

declare const upcomingDeadlines: UpcomingDeadline[];

document.addEventListener('DOMContentLoaded', () => {
	new StudentDashboardView({
		target: document.getElementById('workload-target'),
		props: { upcomingDeadlines }
	});
});
