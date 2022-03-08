import type { SiblingAssignment, DayBin } from './types';

const secondsInDay = 60 * 60 * 24;

export enum BinningMode {
  span = "span",
  end = "end",
}

/**
 * Generates a semi-open range.
 * @param start The beginning of the range (included)
 * @param [end] The end of the range (excluded)
 * @param [step=1] The distance between the numbers in the range
 */
function* range(
  start: number,
  end?: number,
  step: number = 1
): Generator<number, void, void> {
  if (end == null) {
    end = start;
    start = 0;
  }

  if (step === 0) {
    throw new Error("Range must have a non-zero step.");
  }

  if ((start >= end && step > 0) || (start <= end && step < 0)) {
    return;
  }

  for (let i = start; start < end ? i < end : i > end; i += step) {
    yield i;
  }
}

export function binAssignmentsToDays(
  assignments: SiblingAssignment[],
  courseStartTimestamp: number,
  courseEndTimestamp: number,
  binningMode: BinningMode
) {
  const courseStartDay = Math.floor(courseStartTimestamp / secondsInDay);
  const courseEndDay = Math.floor(courseEndTimestamp / secondsInDay);
  const courseLength = courseEndDay - courseStartDay;

  const bins: Array<DayBin | null> = new Array(courseLength).fill(null);

  for (const assignment of assignments) {
    const assignmentStartDay =
      Math.floor(assignment.start / secondsInDay) - courseStartDay;
    const assignmentEndDay =
      Math.floor(assignment.end / secondsInDay) - courseStartDay;
    const span = range(
      binningMode === BinningMode.span ? assignmentStartDay : assignmentEndDay,
      assignmentEndDay + 1
    );

    for (const day of span) {
      if (bins[day] === null) {
        bins[day] = new Map();
      }

      bins[day].set(
        assignment.courseID,
        (bins[day].get(assignment.courseID) ?? 0) + 1
      );
    }
  }

  return bins;
}
