/**
 * Calculate loyalty points earned from spend
 * @module shared-utils/calculator/loyalty
 */
export interface PointsInput {
  readonly amountSpent: number;
  readonly pointsPerCurrency: number;
  readonly multiplier?: number;
}

export function calculatePoints(input: PointsInput): number {
  const { amountSpent, pointsPerCurrency, multiplier = 1 } = input;
  if (amountSpent <= 0 || pointsPerCurrency <= 0 || multiplier <= 0) return 0;
  return Math.floor(amountSpent * pointsPerCurrency * multiplier);
}
