/**
 * VendorReviewResponseDto
 * @module vendor-service/application/dtos/responses
 */
import type {
  VENDOR_REVIEW_STATUS,
  VENDOR_REVIEW_CATEGORY,
} from '@vubon/shared-constants/business';

export interface ReviewCategoryScoreDto {
  readonly category: (typeof VENDOR_REVIEW_CATEGORY)[keyof typeof VENDOR_REVIEW_CATEGORY];
  readonly score: number;
}

export interface VendorReviewResponseDto {
  readonly id: string;
  readonly vendorId: string;
  readonly userId: string;
  readonly orderId: string;
  readonly rating: number;
  readonly comment?: string;
  readonly categories: readonly ReviewCategoryScoreDto[];
  readonly status: (typeof VENDOR_REVIEW_STATUS)[keyof typeof VENDOR_REVIEW_STATUS];
  readonly isVerifiedPurchase: boolean;
  readonly flagCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface VendorReviewPublicDto {
  readonly id: string;
  readonly userId: string;
  readonly rating: number;
  readonly comment?: string;
  readonly categories: readonly ReviewCategoryScoreDto[];
  readonly isVerifiedPurchase: boolean;
  readonly createdAt: string;
}
