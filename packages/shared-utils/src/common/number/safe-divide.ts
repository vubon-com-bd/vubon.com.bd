/**
 * Safe division (returns fallback on divide-by-zero)
 * @module shared-utils/common/number
 */
export function safeDivide(numerator: number, denominator: number, fallback = 0): number {
  if (denominator === 0) return fallback;
  return numerator / denominator;
}
