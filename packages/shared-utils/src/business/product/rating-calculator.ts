/**
 * Rating Calculator
 * রেটিং ক্যালকুলেটর
 */

import type { Review } from '@vubon/shared-types';

export interface RatingDistribution {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface RatingStats {
  average: number;
  total: number;
  distribution: RatingDistribution;
  percentageDistribution: RatingDistribution;
  averagePercentage: number;
}

export interface ProductRatingStats extends RatingStats {
  productId: string;
  reviewCount: number;
}

export const calculateAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((total / reviews.length) * 10) / 10;
};

export const calculateRatingDistribution = (reviews: Review[]): RatingDistribution => {
  const distribution: RatingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  for (const review of reviews) {
    const rating = Math.round(review.rating);
    if (rating >= 1 && rating <= 5) {
      distribution[rating as 1 | 2 | 3 | 4 | 5] += 1;
    }
  }

  return distribution;
};

export const calculateRatingStats = (reviews: Review[]): RatingStats => {
  const total = reviews.length;
  const distribution = calculateRatingDistribution(reviews);
  const average = calculateAverageRating(reviews);

  const percentageDistribution: RatingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  if (total > 0) {
    for (const key of [1, 2, 3, 4, 5] as const) {
      percentageDistribution[key] = Math.round((distribution[key] / total) * 100);
    }
  }

  const averagePercentage = average > 0 ? (average / 5) * 100 : 0;

  return {
    average,
    total,
    distribution,
    percentageDistribution,
    averagePercentage: Math.round(averagePercentage * 10) / 10,
  };
};

export const calculateProductRatingStats = (
  productId: string,
  reviews: Review[]
): ProductRatingStats => {
  const stats = calculateRatingStats(reviews);

  return {
    ...stats,
    productId,
    reviewCount: reviews.length,
  };
};

export const calculateRecommendedRating = (
  reviews: Review[]
): {
  recommended: number;
  notRecommended: number;
  recommendedPercentage: number;
} => {
  const recommended = reviews.filter((r) => r.isRecommended).length;
  const notRecommended = reviews.filter((r) => !r.isRecommended).length;
  const total = reviews.length;

  return {
    recommended,
    notRecommended,
    recommendedPercentage: total > 0 ? Math.round((recommended / total) * 100) : 0,
  };
};

export const calculateHelpfulRating = (
  reviews: Review[]
): {
  totalHelpful: number;
  averageHelpful: number;
} => {
  const totalHelpful = reviews.reduce((sum, review) => sum + review.helpfulCount, 0);
  const averageHelpful = reviews.length > 0 ? Math.round(totalHelpful / reviews.length) : 0;

  return {
    totalHelpful,
    averageHelpful,
  };
};
