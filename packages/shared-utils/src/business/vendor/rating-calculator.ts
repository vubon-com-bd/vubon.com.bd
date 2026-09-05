/**
 * Vendor Rating Calculator
 * ভেন্ডর রেটিং ক্যালকুলেটর
 */

import { VENDOR_RATING } from '@vubon/shared-constants';
import type { VendorRating } from '@vubon/shared-types';

export interface VendorRatingDistribution {
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

export interface VendorRatingCalculation {
  average: number;
  total: number;
  distribution: VendorRatingDistribution;
  percentageDistribution: VendorRatingDistribution;
}

export const calculateVendorRating = (ratings: VendorRating[]): VendorRatingCalculation => {
  const distribution: VendorRatingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let total = 0;
  let sum = 0;

  // VENDOR_RATING ব্যবহার করে টাইপ চেক
  const ratingTypes = Object.values(VENDOR_RATING.TYPES) as string[];
  const validRatingTypes = ratings.filter((r) => ratingTypes.includes(r.type));

  for (const rating of validRatingTypes) {
    const value = Math.round(rating.value);
    if (value >= 1 && value <= 5) {
      distribution[value as 1 | 2 | 3 | 4 | 5] += 1;
      sum += value;
      total += 1;
    }
  }

  const average = total > 0 ? sum / total : 0;
  const percentageDistribution: VendorRatingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

  if (total > 0) {
    for (const key of [1, 2, 3, 4, 5] as const) {
      percentageDistribution[key] = Math.round((distribution[key] / total) * 100);
    }
  }

  return {
    average: Math.round(average * 10) / 10,
    total,
    distribution,
    percentageDistribution,
  };
};

export const calculateVendorOverallRating = (
  productRating: number,
  serviceRating: number,
  deliveryRating: number,
  communicationRating: number
): number => {
  const total = productRating + serviceRating + deliveryRating + communicationRating;
  return Math.round((total / 4) * 10) / 10;
};

export const getVendorRatingLevel = (rating: number): string => {
  if (rating >= 4.5) return 'Excellent';
  if (rating >= 4.0) return 'Very Good';
  if (rating >= 3.5) return 'Good';
  if (rating >= 2.5) return 'Average';
  return 'Poor';
};

// VENDOR_RATING থেকে হেল্পার ফাংশন
export const getVendorRatingTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    product: 'Product Rating',
    service: 'Service Rating',
    delivery: 'Delivery Rating',
    communication: 'Communication Rating',
    overall: 'Overall Rating',
  };
  return labels[type] || type;
};

export const getVendorRatingStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    deleted: 'Deleted',
    flagged: 'Flagged',
  };
  return labels[status] || status;
};

// VENDOR_RATING থেকে মান ব্যবহার করে হেল্পার
export const getVendorRatingDistribution = (ratings: VendorRating[]): VendorRatingDistribution => {
  const distribution: VendorRatingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const ratingTypes = Object.values(VENDOR_RATING.TYPES) as string[];
  const validRatings = ratings.filter((r) => ratingTypes.includes(r.type));

  for (const rating of validRatings) {
    const value = Math.round(rating.value);
    if (value >= 1 && value <= 5) {
      distribution[value as 1 | 2 | 3 | 4 | 5] += 1;
    }
  }

  return distribution;
};
