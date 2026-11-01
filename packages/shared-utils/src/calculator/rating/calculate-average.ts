/**
 * Calculate arithmetic mean (0 for empty)
 * @module shared-utils/calculator/rating
 */
export function calculateAverage(values: readonly number[]): number {
  if (!Array.isArray(values) || values.length === 0) return 0;
  let sum = 0;
  let count = 0;
  for (const v of values) {
    if (Number.isFinite(v)) {
      sum += v;
      count += 1;
    }
  }
  if (count === 0) return 0;
  return round2(sum / count);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
