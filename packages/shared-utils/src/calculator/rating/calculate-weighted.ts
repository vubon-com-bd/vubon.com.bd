/**
 * Weighted average from values + weights
 * @module shared-utils/calculator/rating
 */
export interface WeightedItem {
  readonly value: number;
  readonly weight: number;
}

export function calculateWeighted(items: readonly WeightedItem[]): number {
  if (!Array.isArray(items) || items.length === 0) return 0;
  let sumWeighted = 0;
  let sumWeights = 0;
  for (const item of items) {
    if (Number.isFinite(item.value) && Number.isFinite(item.weight) && item.weight > 0) {
      sumWeighted += item.value * item.weight;
      sumWeights += item.weight;
    }
  }
  if (sumWeights === 0) return 0;
  return round2(sumWeighted / sumWeights);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
