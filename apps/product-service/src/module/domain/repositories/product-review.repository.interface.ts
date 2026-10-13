/**
 * Product Review Repository Interface
 * @module product-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { ProductReviewEntity } from '../entities/product-review.entity.js';
import type { ReviewIdVO } from '../value-objects/primitives/review-id.vo.js';
import type { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';

export const REVIEW_REPOSITORY = Symbol('REVIEW_REPOSITORY');

export interface ReviewListFilter {
  readonly productId?: string;
  readonly userId?: string;
  readonly status?: string | readonly string[];
  readonly rating?: number;
  readonly minRating?: number;
  readonly maxRating?: number;
  readonly isVerifiedPurchase?: boolean;
  readonly createdFrom?: string;
  readonly createdTo?: string;
}

export interface ReviewListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'rating' | 'helpfulCount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: ReviewListFilter;
}

export interface ReviewPaginationResult {
  readonly items: readonly ProductReviewEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface ReviewRatingDistribution {
  readonly 1: number;
  readonly 2: number;
  readonly 3: number;
  readonly 4: number;
  readonly 5: number;
}

export interface ReviewSummaryStats {
  readonly productId: string;
  readonly totalReviews: number;
  readonly averageRating: number;
  readonly ratingDistribution: ReviewRatingDistribution;
  readonly verifiedCount: number;
  readonly approvedCount: number;
  readonly pendingCount: number;
}

export interface ProductReviewRepository extends BaseRepository<ProductReviewEntity, string> {
  findByIdVO(id: ReviewIdVO): Promise<ProductReviewEntity | null>;

  // Duplicate check
  existsByProductAndUser(productId: ProductIdVO, userId: string): Promise<boolean>;
  findByProductAndUser(productId: ProductIdVO, userId: string): Promise<ProductReviewEntity | null>;

  findByProduct(productId: ProductIdVO): Promise<readonly ProductReviewEntity[]>;
  findApprovedByProduct(productId: ProductIdVO): Promise<readonly ProductReviewEntity[]>;
  findByUser(userId: string): Promise<readonly ProductReviewEntity[]>;
  findByStatus(status: string): Promise<readonly ProductReviewEntity[]>;

  findPaginated(options: ReviewListOptions): Promise<ReviewPaginationResult>;

  getSummary(productId: ProductIdVO): Promise<ReviewSummaryStats>;

  countByProduct(productId: ProductIdVO): Promise<number>;

  // Cron
  findPendingOlderThan(hours: number): Promise<readonly ProductReviewEntity[]>;
  findFlagged(threshold: number): Promise<readonly ProductReviewEntity[]>;

  softDelete(id: string, deletedBy?: string): Promise<void>;
}
