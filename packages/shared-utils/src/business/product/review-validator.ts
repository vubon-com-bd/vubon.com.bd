import { RATING } from '@vubon/shared-constants/src/common/rating.constants';
import { PRODUCT_REVIEW } from '@vubon/shared-constants/src/business/product/product-review.constants';

export interface ReviewInput {
  rating: string;
  title: string;
  content: string;
  status: string;
}

export const validateReview = (
  review: Partial<ReviewInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!review.rating) errors.push('Rating is required');
  if (review.rating && !Object.keys(RATING).includes(review.rating)) {
    errors.push('Invalid rating');
  }
  if (!review.title) errors.push('Review title is required');
  if (!review.content) errors.push('Review content is required');
  if (review.status && !Object.keys(PRODUCT_REVIEW.STATUS).includes(review.status)) {
    errors.push('Invalid review status');
  }
  return { isValid: errors.length === 0, errors };
};
