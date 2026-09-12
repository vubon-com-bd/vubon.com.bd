import { VENDOR_REVIEW } from '@vubon/shared-constants/src/business/vendor/vendor-review.constants';

export interface VendorReviewInput {
  vendorId: string;
  userId: string;
  rating: number;
  title: string;
  content: string;
  status: string;
}

export const validateVendorReview = (
  review: Partial<VendorReviewInput>
): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  if (!review.vendorId) errors.push('Vendor ID is required');
  if (!review.userId) errors.push('User ID is required');
  if (review.rating !== undefined && (review.rating < 0 || review.rating > 5)) {
    errors.push('Rating must be between 0 and 5');
  }
  if (!review.title) errors.push('Review title is required');
  if (!review.content) errors.push('Review content is required');
  if (review.status && !Object.keys(VENDOR_REVIEW.STATUS).includes(review.status)) {
    errors.push('Invalid review status');
  }
  return { isValid: errors.length === 0, errors };
};
