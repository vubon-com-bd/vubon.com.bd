/**
 * Rating Formatter — uses RATING constants.
 */
import { RATING } from '@vubon/shared-constants/src/common/rating.constants';

const MAX = RATING.MAX;

export const formatRating = (rating: number): string => {
  if (!Number.isFinite(rating)) return '0.0 ★';
  const clamped = Math.max(RATING.MIN, Math.min(MAX, rating));
  return `${clamped.toFixed(1)} ★`;
};

export const formatRatingStars = (rating: number): string => {
  if (!Number.isFinite(rating)) return '☆'.repeat(MAX);
  const clamped = Math.max(0, Math.min(MAX, rating));
  const fullStars = Math.floor(clamped);
  const halfStar = clamped % 1 >= 0.5 ? '½' : '';
  const emptyStars = MAX - Math.ceil(clamped);
  return '★'.repeat(fullStars) + halfStar + '☆'.repeat(emptyStars);
};
