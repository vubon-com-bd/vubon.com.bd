/**
 * ReviewResponseDTO
 */
import type { ReviewId, ProductId, UserId, Url } from '@vubon/shared-types/common';

export interface ReviewResponseDTO {
  readonly id: ReviewId;
  readonly productId: ProductId;
  readonly userId: UserId;
  readonly userName?: string;
  readonly userAvatar?: Url;
  readonly rating: number;
  readonly title?: string;
  readonly comment?: string;
  readonly images?: readonly Url[];
  readonly status: string;
  readonly isVerifiedPurchase: boolean;
  readonly helpfulCount: number;
  readonly reportCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ReviewStatsResponseDTO {
  readonly productId: ProductId;
  readonly totalReviews: number;
  readonly averageRating: number;
  readonly ratingDistribution: Readonly<Record<1 | 2 | 3 | 4 | 5, number>>;
}
