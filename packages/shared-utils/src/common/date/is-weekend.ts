/**
 * Check if date falls on weekend (Fri/Sat in BD, Sat/Sun default)
 * @module shared-utils/common/date
 */
export function isWeekend(
  date: Date,
  weekendDays: readonly number[] = [6, 0] // Saturday, Sunday
): boolean {
  return weekendDays.includes(date.getDay());
}
