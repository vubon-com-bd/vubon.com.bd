/**
 * Progress % toward next tier
 * @module shared-utils/calculator/loyalty
 */
export interface TierProgressInput {
  readonly currentPoints: number;
  readonly currentTierMin: number;
  readonly nextTierMin?: number;
}

export interface TierProgressResult {
  readonly progressPercent: number;
  readonly pointsToNext: number;
  readonly isMaxTier: boolean;
}

export function calculateTierProgress(input: TierProgressInput): TierProgressResult {
  const { currentPoints, currentTierMin, nextTierMin } = input;

  if (nextTierMin === undefined || nextTierMin <= currentTierMin) {
    return { progressPercent: 100, pointsToNext: 0, isMaxTier: true };
  }

  const range = nextTierMin - currentTierMin;
  const achieved = Math.max(0, currentPoints - currentTierMin);
  const progressPercent = Math.min(100, round2((achieved / range) * 100));
  const pointsToNext = Math.max(0, nextTierMin - currentPoints);

  return { progressPercent, pointsToNext, isMaxTier: false };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
