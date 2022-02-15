import { createApp } from 'vue';

import { StudentDashboardView, type StudentDashboardViewProps } from '@/widgets/student-dashboard-view';

import '@/shared/tailwind/index.css';

declare const upcomingDeadlines: StudentDashboardViewProps['upcomingDeadlines'];

createApp(StudentDashboardView, { upcomingDeadlines }).mount('#workload-target');
