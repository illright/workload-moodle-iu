import { StudentCourseView } from '@/widgets/student-course-view';
import type { UpcomingDeadline, UngradedSubmission } from '@/shared/api';

declare const upcomingDeadlines: UpcomingDeadline[];
declare const ungradedSubmissions: UngradedSubmission[];

document.addEventListener('DOMContentLoaded', () => {
	new StudentCourseView({
		target: document.getElementById('workload-target'),
		props: { upcomingDeadlines, ungradedSubmissions }
	});
});
