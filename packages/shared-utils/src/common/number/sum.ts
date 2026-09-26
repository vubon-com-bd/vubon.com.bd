/**
 * Sum of numbers
 * @module shared-utils/common/number
 */
export function sum(values: readonly number[]): number {
  let total = 0;
  for (const v of values) total += v;
  return total;
}
