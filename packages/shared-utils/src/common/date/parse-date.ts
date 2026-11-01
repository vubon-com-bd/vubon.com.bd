/**
 * Safe Date parse — returns null on invalid input
 * @module shared-utils/common/date
 */
export function parseDate(value: string | number | Date): Date | null {
  if (value instanceof Date) {
    return isValidDate(value) ? new Date(value.getTime()) : null;
  }
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function isValidDate(value: Date): boolean {
  return !Number.isNaN(value.getTime());
}
