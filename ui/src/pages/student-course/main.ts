import { createApp } from 'vue';

import { StudentCourseView, type StudentCourseViewProps } from '@/widgets/student-course-view';

import '@/shared/tailwind/index.css';

declare const upcomingDeadlines: StudentCourseViewProps['upcomingDeadlines'];

createApp(StudentCourseView, { upcomingDeadlines }).mount('#workload-target');
