/**
 * Add minutes to a date (immutable)
 * @module shared-utils/common/date
 */
export function addMinutes(date: Date, minutes: number): Date {
  if (!Number.isFinite(minutes)) throw new RangeError('minutes must be finite');
  return new Date(date.getTime() + minutes * 60 * 1000);
}
