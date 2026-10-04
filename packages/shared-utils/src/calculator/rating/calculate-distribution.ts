/**
 * Count occurrences of each rating (1-5)
 * @module shared-utils/calculator/rating
 */
export function calculateDistribution(
  ratings: readonly number[]
): Readonly<Record<1 | 2 | 3 | 4 | 5, number>> {
  const dist: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  if (!Array.isArray(ratings)) return dist;
  for (const r of ratings) {
    if (Number.isInteger(r) && r >= 1 && r <= 5) {
      dist[r as 1 | 2 | 3 | 4 | 5] += 1;
    }
  }
  return dist;
}
