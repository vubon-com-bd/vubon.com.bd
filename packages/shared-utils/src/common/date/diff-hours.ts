/**
 * Difference in full hours (b - a)
 * @module shared-utils/common/date
 */
export function diffHours(a: Date, b: Date): number {
  const ms = b.getTime() - a.getTime();
  return Math.floor(ms / (1000 * 60 * 60));
}
