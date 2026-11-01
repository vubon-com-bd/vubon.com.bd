/**
 * Vendor Review Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorReviewEntity } from '../entities/vendor-review.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import type { ReviewIdVO } from '../value-objects/primitives/review-id.vo.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export const VENDOR_REVIEW_REPOSITORY = Symbol('VENDOR_REVIEW_REPOSITORY');

export interface VendorReviewListFilter {
  readonly vendorId?: string;
  readonly userId?: string;
  readonly orderId?: string;
  readonly productId?: string;
  readonly status?: string | readonly string[];
  readonly minRating?: number;
  readonly maxRating?: number;
  readonly isVerifiedPurchase?: boolean;
  readonly isRecent?: boolean;
  readonly hasReply?: boolean;
  readonly minHelpfulCount?: number;
  readonly minFlaggedCount?: number;
  readonly submittedFrom?: string;
  readonly submittedTo?: string;
  readonly search?: string;
}

export interface VendorReviewListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'submittedAt' | 'rating' | 'helpfulCount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorReviewListFilter;
}

export interface VendorReviewPaginationResult {
  readonly items: readonly VendorReviewEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
}

export interface VendorReviewStats {
  readonly total: number;
  readonly averageRating: number;
  readonly positiveCount: number;
  readonly negativeCount: number;
  readonly verifiedPurchaseCount: number;
  readonly withRepliesCount: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byRating: Readonly<Record<1 | 2 | 3 | 4 | 5, number>>;
}

export interface VendorReviewRepository
  extends BaseRepository<VendorReviewEntity, string> {
  findByIdVO(id: ReviewIdVO): Promise<VendorReviewEntity | null>;
  findByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<readonly VendorReviewEntity[]>;
  findByVendorAndStatus(
    vendorId: VendorIdVO | string,
    status: string,
  ): Promise<readonly VendorReviewEntity[]>;
  findByUser(
    userId: UserIdVO | string,
  ): Promise<readonly VendorReviewEntity[]>;
  findByUserAndVendor(
    userId: string,
    vendorId: string,
  ): Promise<VendorReviewEntity | null>;
  findByOrder(orderId: string): Promise<readonly VendorReviewEntity[]>;
  findByProduct(productId: string): Promise<readonly VendorReviewEntity[]>;
  findPendingModeration(limit?: number): Promise<readonly VendorReviewEntity[]>;
  findFlagged(limit?: number): Promise<readonly VendorReviewEntity[]>;
  findRecentByVendor(
    vendorId: string,
    days?: number,
  ): Promise<readonly VendorReviewEntity[]>;
  findPositiveByVendor(vendorId: string): Promise<readonly VendorReviewEntity[]>;
  findNegativeByVendor(vendorId: string): Promise<readonly VendorReviewEntity[]>;
  findUnansweredByVendor(vendorId: string): Promise<readonly VendorReviewEntity[]>;
  findPaginated(
    options: VendorReviewListOptions,
  ): Promise<VendorReviewPaginationResult>;
  existsByUserAndVendor(userId: string, vendorId: string): Promise<boolean>;
  countByVendor(vendorId: VendorIdVO | string): Promise<number>;
  countByVendorAndStatus(vendorId: string, status: string): Promise<number>;
  getStats(vendorId?: string, fromDate?: string, toDate?: string): Promise<VendorReviewStats>;
}
