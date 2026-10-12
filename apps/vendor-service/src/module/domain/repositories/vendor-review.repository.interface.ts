/**
 * VendorReviewRepository
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorReviewEntity } from '../entities/vendor-review.entity.js';
import { VendorReviewStatusVO } from '../value-objects/primitives/vendor-review-status.vo.js';

export const VENDOR_REVIEW_REPOSITORY = Symbol('VENDOR_REVIEW_REPOSITORY');

export interface VendorReviewFilter {
  readonly vendorId?: string;
  readonly userId?: string;
  readonly status?: string;
  readonly rating?: number;
  readonly fromDate?: string;
  readonly toDate?: string;
  readonly verifiedOnly?: boolean;
}

export interface VendorReviewListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'rating' | 'flagCount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorReviewFilter;
}

export interface VendorReviewPaginationResult {
  readonly items: readonly VendorReviewEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorReviewRepository extends BaseRepository<VendorReviewEntity, string> {
  findByVendorId(vendorId: string): Promise<readonly VendorReviewEntity[]>;
  findByUserId(userId: string): Promise<readonly VendorReviewEntity[]>;
  findByOrderId(orderId: string): Promise<VendorReviewEntity | null>;
  findByStatus(status: VendorReviewStatusVO): Promise<readonly VendorReviewEntity[]>;

  findPaginated(options: VendorReviewListOptions): Promise<VendorReviewPaginationResult>;
  search(filter: VendorReviewFilter): Promise<readonly VendorReviewEntity[]>;

  /** Reviews awaiting moderation. */
  findPendingModeration(): Promise<readonly VendorReviewEntity[]>;
  /** Flagged reviews (below auto-hide threshold). */
  findFlagged(): Promise<readonly VendorReviewEntity[]>;
  /** Hidden reviews (auto-hidden). */
  findHidden(): Promise<readonly VendorReviewEntity[]>;
  /** Publicly visible reviews for a vendor. */
  findPublicByVendorId(vendorId: string): Promise<readonly VendorReviewEntity[]>;

  countByVendor(vendorId: string): Promise<number>;
  countByStatus(status: VendorReviewStatusVO): Promise<number>;
  countVerifiedByVendorId(vendorId: string): Promise<number>;
  existsByOrderId(orderId: string): Promise<boolean>;

  /** Average rating across visible reviews for a vendor. */
  getVendorAverageRating(vendorId: string): Promise<number>;

  deleteByVendorId(vendorId: string): Promise<void>;
}
