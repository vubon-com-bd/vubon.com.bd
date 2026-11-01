/**
 * Start of month (day 1, 00:00:00.000)
 * @module shared-utils/common/date
 */
export function startOfMonth(date: Date): Date {
  const result = new Date(date.getTime());
  result.setDate(1);
  result.setHours(0, 0, 0, 0);
  return result;
}
