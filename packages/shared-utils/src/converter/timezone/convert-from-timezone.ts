/**
 * Convert a wall-clock Date in a timezone back to UTC
 * @module shared-utils/converter/timezone
 */
export function convertFromTimezone(date: Date, timezone: string): Date {
  if (Number.isNaN(date.getTime())) throw new RangeError('Invalid date');

  const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
  const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
  const diff = utcDate.getTime() - tzDate.getTime();
  return new Date(date.getTime() + diff);
}
