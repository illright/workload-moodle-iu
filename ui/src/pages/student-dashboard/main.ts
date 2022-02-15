import { createApp } from 'vue';

import { StudentDashboardView, type StudentDashboardViewProps } from '@/widgets/student-dashboard-view';

import '@/shared/tailwind/index.css';

declare const upcomingDeadlines: StudentDashboardViewProps['upcomingDeadlines'];
declare const ungradedSubmissions: StudentDashboardViewProps['ungradedSubmissions'];

createApp(StudentDashboardView, { upcomingDeadlines, ungradedSubmissions }).mount('#workload-target');
