/**
 * Review Validator
 * রিভিউ ভ্যালিডেটর
 */

import { REVIEW_STATUS } from '@vubon/shared-constants';
import { ReviewSchema } from '@vubon/shared-schemas';
import type { Review } from '@vubon/shared-types';

export interface ReviewValidationResult {
  valid: boolean;
  errors: Record<string, string[]>;
  data?: Review;
}

export const validateReview = (data: unknown): ReviewValidationResult => {
  const errors: Record<string, string[]> = {};
  let valid = true;

  if (!data || typeof data !== 'object') {
    return {
      valid: false,
      errors: { _global: ['Invalid review data'] },
    };
  }

  const review = data as Record<string, unknown>;

  // Product ID validation
  if (!review.productId || typeof review.productId !== 'string') {
    errors.productId = ['Product ID is required'];
    valid = false;
  }

  // User ID validation
  if (!review.userId || typeof review.userId !== 'string') {
    errors.userId = ['User ID is required'];
    valid = false;
  }

  // Rating validation
  if (review.rating !== undefined) {
    if (
      typeof review.rating !== 'number' ||
      review.rating < 1 ||
      review.rating > 5 ||
      !Number.isInteger(review.rating)
    ) {
      errors.rating = ['Rating must be an integer between 1 and 5'];
      valid = false;
    }
  } else {
    errors.rating = ['Rating is required'];
    valid = false;
  }

  // Content validation
  if (!review.content || typeof review.content !== 'string' || review.content.length < 10) {
    errors.content = ['Review must be at least 10 characters'];
    valid = false;
  } else if (review.content.length > 1000) {
    errors.content = ['Review must be less than 1000 characters'];
    valid = false;
  }

  // Status validation - REVIEW_STATUS থেকে পাওয়া মানগুলোর সাথে তুলনা
  if (review.status) {
    const statusValues = Object.values(REVIEW_STATUS) as string[];
    if (!statusValues.includes(review.status as string)) {
      errors.status = ['Invalid review status'];
      valid = false;
    }
  }

  try {
    const validatedData = ReviewSchema.parse(data);
    return {
      valid: true,
      errors: {},
      data: validatedData as Review,
    };
  } catch {
    return {
      valid,
      errors,
    };
  }
};

export const validateReviewCreate = (data: unknown): ReviewValidationResult => {
  return validateReview(data);
};

export const validateReviewUpdate = (data: unknown): ReviewValidationResult => {
  return validateReview(data);
};
