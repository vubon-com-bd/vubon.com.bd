/**
 * Review Response DTOs
 * @module product-service/application/dtos/responses
 */
import type { ReviewStatusValue } from '@vubon/shared-types/business/product';

export interface ReviewResponseDTO {
  readonly id: string;
  readonly productId: string;
  readonly userId: string;
  readonly orderId?: string;
  readonly rating: number;
  readonly title?: string;
  readonly comment?: string;
  readonly images?: readonly string[];
  readonly status: ReviewStatusValue;
  readonly isVerifiedPurchase: boolean;
  readonly helpfulCount: number;
  readonly reportCount: number;
  readonly createdAt: string;
  readonly updatedAt: string;
}

export interface ReviewPublicResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly rating: number;
  readonly title?: string;
  readonly comment?: string;
  readonly images?: readonly string[];
  readonly isVerifiedPurchase: boolean;
  readonly helpfulCount: number;
  readonly createdAt: string;
}

export interface ReviewSummaryResponseDTO {
  readonly id: string;
  readonly userId: string;
  readonly rating: number;
  readonly title?: string;
  readonly createdAt: string;
}

export interface ReviewListResponseDTO {
  readonly items: readonly ReviewPublicResponseDTO[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface RatingDistributionDTO {
  readonly 1: number;
  readonly 2: number;
  readonly 3: number;
  readonly 4: number;
  readonly 5: number;
}

export interface ReviewStatsResponseDTO {
  readonly productId: string;
  readonly totalReviews: number;
  readonly averageRating: number;
  readonly ratingDistribution: RatingDistributionDTO;
  readonly verifiedCount: number;
  readonly approvedCount: number;
  readonly pendingCount: number;
}
