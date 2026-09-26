/**
 * Start of day (00:00:00.000)
 * @module shared-utils/common/date
 */
export function startOfDay(date: Date): Date {
  const result = new Date(date.getTime());
  result.setHours(0, 0, 0, 0);
  return result;
}
