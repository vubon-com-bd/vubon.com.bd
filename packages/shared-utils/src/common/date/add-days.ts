/**
 * Add days to a date (immutable)
 * @module shared-utils/common/date
 */
export function addDays(date: Date, days: number): Date {
  if (!Number.isFinite(days)) throw new RangeError('days must be finite');
  const result = new Date(date.getTime());
  result.setDate(result.getDate() + days);
  return result;
}
