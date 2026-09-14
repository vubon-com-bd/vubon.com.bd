/**
 * Format a Date to YYYY-MM-DD (safe, timezone-aware)
 * @module shared-utils/common/date
 */
export function formatIsoDate(date: Date): string {
  if (Number.isNaN(date.getTime())) throw new RangeError('Invalid date');
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
