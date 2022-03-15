export type DateRanges = Array<Date | { start?: Date; end?: Date }>;
export type Day = { value: Date; outside: boolean; disabled: boolean };

const daysInWeek = 7;

/** Generates an array with the names of the days of the week. */
export function getWeekdays() {
  const weekdayFormatter = new Intl.DateTimeFormat(undefined, {
    weekday: 'short',
  });
  const anchor = new Date(1970, 0, 1); // Initially set to the UNIX epoch – Thursday
  const mondayOffset = 5; // How many days to add to the epoch to get a Monday
  const weekdays = [];
  for (let i = 0; i < daysInWeek; ++i) {
    anchor.setDate(mondayOffset + i);
    weekdays.push(weekdayFormatter.format(anchor));
  }

  return weekdays as [string, string, string, string, string, string, string];
}

/** Check if the given object is a date. */
function isDate(date: unknown): date is Date {
  return date instanceof Date && !isNaN(date.valueOf());
}

/** Check for equality between 2 `Date` objects, disregarding the time. */
export function datesEqual(date1: Date | null, date2: Date | null) {
  if (date1 == null || date2 == null) {
    return false;
  }

  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

/** Checks if the date of the first `Date` object came before the date of the second (disregards time). */
function datesLess(date1: Date | null, date2: Date | null) {
  if (date1 == null || date2 == null) {
    return false;
  }

  return (
    new Date(date1.getFullYear(), date1.getMonth(), date1.getDate()) <
    new Date(date2.getFullYear(), date2.getMonth(), date2.getDate())
  );
}

/**
 * Generates a calendar view of a given month.
 */
export function getCalendar(month: number, year: number, startFrom: Date, endAt: Date) {
  const calendar: Day[][] = [];
  const dayCursor = new Date(Date.UTC(year, month, 1));

  // Offset the start of the month to the closest left Monday
  dayCursor.setDate(1 - ((daysInWeek + dayCursor.getDay() - 1) % daysInWeek));

  do {
    const week: Day[] = [];
    for (let i = 0; i < daysInWeek; ++i) {
      week.push({
        value: new Date(dayCursor.valueOf()),
        outside: dayCursor.getMonth() !== month,
        disabled: datesLess(dayCursor, startFrom) || datesLess(endAt, dayCursor),
      });
      dayCursor.setDate(dayCursor.getDate() + 1);
    }
    calendar.push(week);
  } while (dayCursor.getMonth() === month);

  return calendar;
}
