/**
 * Review Types
 * @module shared-types/business/product
 *
 * Values আসে shared-constants/business/product/review.constants থেকে।
 */

import type { REVIEW_STATUS, REVIEW_RATING } from '@vubon/shared-constants/business';
import type { ProductId, UserId, ReviewId, Url } from '../../common/primitives';
import type { BaseEntity } from '../../common/base';

export type ReviewStatusValue = (typeof REVIEW_STATUS)[keyof typeof REVIEW_STATUS];

export type ReviewRatingValue = typeof REVIEW_RATING.MIN | 2 | 3 | 4 | typeof REVIEW_RATING.MAX;

export interface Review extends BaseEntity<ReviewId> {
  readonly productId: ProductId;
  readonly userId: UserId;
  readonly orderId?: string;
  readonly rating: number;
  readonly title?: string;
  readonly comment?: string;
  readonly images?: readonly Url[];
  readonly status: ReviewStatusValue;
  readonly isVerifiedPurchase: boolean;
  readonly helpfulCount: number;
  readonly reportCount: number;
}

export interface ReviewPublic {
  readonly id: ReviewId;
  readonly userId: UserId;
  readonly userName: string;
  readonly userAvatar?: Url;
  readonly rating: number;
  readonly title?: string;
  readonly comment?: string;
  readonly images?: readonly Url[];
  readonly isVerifiedPurchase: boolean;
  readonly helpfulCount: number;
  readonly createdAt: string;
}

export interface ReviewInput {
  readonly productId: ProductId;
  readonly rating: number;
  readonly title?: string;
  readonly comment?: string;
  readonly images?: readonly string[];
}

export interface ReviewSummary {
  readonly productId: ProductId;
  readonly averageRating: number;
  readonly totalReviews: number;
  readonly ratingDistribution: Readonly<Record<1 | 2 | 3 | 4 | 5, number>>;
}
