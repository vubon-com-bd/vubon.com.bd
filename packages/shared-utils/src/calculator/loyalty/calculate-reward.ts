/**
 * Calculate reward value from points
 * @module shared-utils/calculator/loyalty
 */
export interface RewardInput {
  readonly points: number;
  readonly pointValue: number;
  readonly maxPercent?: number;
  readonly orderAmount?: number;
}

export function calculateReward(input: RewardInput): number {
  const { points, pointValue, maxPercent, orderAmount } = input;
  if (points <= 0 || pointValue <= 0) return 0;

  let value = points * pointValue;
  if (maxPercent !== undefined && orderAmount !== undefined && orderAmount > 0) {
    const cap = (orderAmount * maxPercent) / 100;
    value = Math.min(value, cap);
  }
  return round2(value);
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
