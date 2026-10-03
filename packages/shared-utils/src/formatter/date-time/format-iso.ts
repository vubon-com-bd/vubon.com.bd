/**
 * Format Date as ISO 8601 (date only)
 * @module shared-utils/formatter/date-time
 */
export function formatIso(date: Date): string {
  if (Number.isNaN(date.getTime())) throw new RangeError('Invalid date');
  return date.toISOString();
}
