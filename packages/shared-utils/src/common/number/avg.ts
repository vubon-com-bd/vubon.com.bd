/**
 * Average of numbers (returns 0 for empty array)
 * @module shared-utils/common/number
 */
export function avg(values: readonly number[]): number {
  if (values.length === 0) return 0;
  return sum(values) / values.length;
}

function sum(values: readonly number[]): number {
  let total = 0;
  for (const v of values) total += v;
  return total;
}
