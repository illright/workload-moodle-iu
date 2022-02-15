import { createApp } from 'vue';

import { StudentCourseView, type StudentCourseViewProps } from '@/widgets/student-course-view';

import '@/shared/tailwind/index.css';

declare const upcomingDeadlines: StudentCourseViewProps['upcomingDeadlines'];
declare const ungradedSubmissions: StudentCourseViewProps['ungradedSubmissions'];

createApp(StudentCourseView, { upcomingDeadlines, ungradedSubmissions }).mount('#workload-target');
