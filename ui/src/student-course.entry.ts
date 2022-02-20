import { StudentCourseView } from '@/widgets/student-course-view';
import type { UpcomingDeadline, UngradedSubmission } from '@/shared/api';

declare const upcomingDeadlines: UpcomingDeadline[];
declare const ungradedSubmissions: UngradedSubmission[];

export default new StudentCourseView({
	target: document.getElementById('workload-target'),
	props: { upcomingDeadlines, ungradedSubmissions }
});
