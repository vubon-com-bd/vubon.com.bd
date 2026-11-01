/**
 * End of month (last day, 23:59:59.999)
 * @module shared-utils/common/date
 */
export function endOfMonth(date: Date): Date {
  const result = new Date(date.getTime());
  result.setMonth(result.getMonth() + 1, 0);
  result.setHours(23, 59, 59, 999);
  return result;
}
