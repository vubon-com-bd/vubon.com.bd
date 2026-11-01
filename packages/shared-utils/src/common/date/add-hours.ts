/**
 * Add hours to a date (immutable)
 * @module shared-utils/common/date
 */
export function addHours(date: Date, hours: number): Date {
  if (!Number.isFinite(hours)) throw new RangeError('hours must be finite');
  return new Date(date.getTime() + hours * 60 * 60 * 1000);
}
