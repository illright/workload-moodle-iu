import { createApp } from 'vue';

import { StudentDashboardView } from '@/widgets/student-dashboard-view';

import '@/shared/tailwind/index.css';

createApp(StudentDashboardView).mount('#workload-target');
