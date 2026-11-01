/**
 * Add years to a date (immutable)
 * @module shared-utils/common/date
 */
export function addYears(date: Date, years: number): Date {
  if (!Number.isFinite(years)) throw new RangeError('years must be finite');
  const result = new Date(date.getTime());
  result.setFullYear(result.getFullYear() + years);
  return result;
}
