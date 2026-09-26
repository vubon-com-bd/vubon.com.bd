/**
 * Difference in full days (b - a)
 * @module shared-utils/common/date
 */
export function diffDays(a: Date, b: Date): number {
  const ms = b.getTime() - a.getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}
