/**
 * Convert Date to ISO 8601 string
 * @module shared-utils/common/date
 */
export function toIso(date: Date): string {
  if (!isValidDate(date)) throw new RangeError('Invalid date');
  return date.toISOString();
}

function isValidDate(value: Date): boolean {
  return value instanceof Date && !Number.isNaN(value.getTime());
}
