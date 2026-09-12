/**
 * Rating Calculator — uses RATING constants.
 */
import { RATING } from '@vubon/shared-constants/src/common/rating.constants';

export const calculateAverageRating = (ratings: number[]): number => {
  if (ratings.length === 0) return 0;
  const valid = ratings.filter((r) => r >= RATING.MIN && r <= RATING.MAX);
  if (valid.length === 0) return 0;
  const sum = valid.reduce((a, b) => a + b, 0);
  return sum / valid.length;
};

export const calculateRatingDistribution = (ratings: number[]): Record<number, number> => {
  const distribution: Record<number, number> = {};
  for (let i = RATING.MIN; i <= RATING.MAX; i++) distribution[i] = 0;
  for (const r of ratings) {
    if (r >= RATING.MIN && r <= RATING.MAX) {
      distribution[Math.round(r)]! += 1;
    }
  }
  return distribution;
};
