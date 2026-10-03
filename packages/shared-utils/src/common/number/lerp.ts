/**
 * Linear interpolation between two numbers
 * @module shared-utils/common/number
 *
 * @example
 * lerp(0, 10, 0.5) // 5
 */
export function lerp(start: number, end: number, t: number): number {
  if (t < 0 || t > 1) throw new RangeError('t must be between 0 and 1');
  return start + (end - start) * t;
}
