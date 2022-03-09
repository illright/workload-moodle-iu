import type { CalendarDay, DayBin, CourseID, StudentID } from './types';

export enum CountMode {
  max = "max",
  sum = "sum",
}

function sum(iterable: IterableIterator<number>) {
  return [...iterable].reduce((acc, val) => acc + val, 0);
}

function computeMostLoadedStudent(
  dayBin: DayBin,
  studentsInCourse: Map<CourseID, StudentID[]>
) {
  const assignmentsPerStudent = new Map<StudentID, number>();
  for (const [courseID, amount] of dayBin.entries()) {
    for (const studentID of (studentsInCourse.get(courseID) ?? [])) {
      assignmentsPerStudent.set(studentID, (assignmentsPerStudent.get(studentID) ?? 0) + amount);
    }
  }

  return Math.max(...assignmentsPerStudent.values());
};

export function generateCalendar(
  dayBins: Array<DayBin | null>,
  courseStart: Date,
  studentsInCourse: Map<CourseID, StudentID[]>,
  countMode: CountMode,
  selectedCourse?: CourseID
): Map<string, CalendarDay> {
  const dateCursor = new Date(courseStart.valueOf());
  const calendar = new Map<string, CalendarDay>();

  for (const bin of dayBins) {
    const day: CalendarDay = {
      assignmentAmount: 0,
      hasAssignmentFromSelectedCourse: false,
    };

    if (bin !== null) {
      if (countMode === CountMode.sum) {
        day.assignmentAmount = sum(bin.values());
      } else {
        day.assignmentAmount = computeMostLoadedStudent(bin, studentsInCourse);
      }

      if (selectedCourse !== null) {
        day.hasAssignmentFromSelectedCourse = bin.has(selectedCourse);
      }
    }

    if (day.assignmentAmount !== 0 || day.hasAssignmentFromSelectedCourse) {
      calendar.set(dateCursor.toISOString().slice(0, 10), day);
    }
    dateCursor.setDate(dateCursor.getDate() + 1);
  }

  return calendar;
}
