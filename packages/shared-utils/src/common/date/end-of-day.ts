/**
 * End of day (23:59:59.999)
 * @module shared-utils/common/date
 */
export function endOfDay(date: Date): Date {
  const result = new Date(date.getTime());
  result.setHours(23, 59, 59, 999);
  return result;
}
