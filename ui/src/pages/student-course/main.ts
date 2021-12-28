import { createApp } from 'vue';

import { StudentCourseView } from '@/widgets/student-course-view';

import '@/shared/tailwind/index.css';

createApp(StudentCourseView).mount('#workload-target');
