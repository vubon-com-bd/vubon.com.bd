/**
 * Convert number to safe integer with fallback
 * @module shared-utils/common/number
 */
export function toInt(value: number, fallback = 0): number {
  if (!Number.isFinite(value)) return fallback;
  return Math.trunc(value);
}
