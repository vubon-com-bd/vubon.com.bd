/**
 * Review Repository Interface
 * @module product-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { ProductReviewEntity } from '../entities/product-review.entity.js';
import { ProductIdVO } from '../value-objects/primitives/product-id.vo.js';

export const REVIEW_REPOSITORY = Symbol('REVIEW_REPOSITORY');

export interface ReviewPaginationOptions {
  readonly page: number;
  readonly limit: number;
  readonly status?: string;
  readonly minRating?: number;
  readonly maxRating?: number;
  readonly verifiedOnly?: boolean;
}

export interface ReviewPaginationResult {
  readonly items: readonly ProductReviewEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
}

export interface ReviewRatingDistribution {
  readonly 1: number;
  readonly 2: number;
  readonly 3: number;
  readonly 4: number;
  readonly 5: number;
}

export interface ReviewAggregate {
  readonly productId: string;
  readonly totalReviews: number;
  readonly averageRating: number;
  readonly distribution: ReviewRatingDistribution;
}

export interface ReviewRepository extends BaseRepository<ProductReviewEntity, string> {
  findByProductId(productId: ProductIdVO): Promise<readonly ProductReviewEntity[]>;
  findByUserId(userId: string): Promise<readonly ProductReviewEntity[]>;
  findByUserAndProduct(
    userId: string,
    productId: ProductIdVO,
  ): Promise<ProductReviewEntity | null>;
  existsByUserAndProduct(userId: string, productId: ProductIdVO): Promise<boolean>;
  findApprovedByProductId(productId: ProductIdVO): Promise<readonly ProductReviewEntity[]>;
  findPaginatedByProduct(
    productId: ProductIdVO,
    options: ReviewPaginationOptions,
  ): Promise<ReviewPaginationResult>;
  aggregateRatings(productId: ProductIdVO): Promise<ReviewAggregate | null>;
  countByProductId(productId: ProductIdVO): Promise<number>;
  countByUserId(userId: string): Promise<number>;
  deleteByProductId(productId: ProductIdVO): Promise<number>;
}
