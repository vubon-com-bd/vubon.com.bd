/**
 * Add months to a date (immutable)
 * @module shared-utils/common/date
 */
export function addMonths(date: Date, months: number): Date {
  if (!Number.isFinite(months)) throw new RangeError('months must be finite');
  const result = new Date(date.getTime());
  result.setMonth(result.getMonth() + months);
  return result;
}
