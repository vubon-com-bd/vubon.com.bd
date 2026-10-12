/**
 * VendorRatingRepository
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorRatingEntity } from '../entities/vendor-rating.entity.js';

export const VENDOR_RATING_REPOSITORY = Symbol('VENDOR_RATING_REPOSITORY');

export interface RatingStats {
  readonly avgRating: number;
  readonly totalVendors: number;
  readonly vendorsWithReviews: number;
  readonly distribution: Readonly<Record<'1' | '2' | '3' | '4' | '5', number>>;
}

export interface VendorRatingRepository extends BaseRepository<VendorRatingEntity, string> {
  findByVendorId(vendorId: string): Promise<VendorRatingEntity | null>;
  existsByVendorId(vendorId: string): Promise<boolean>;

  /** Ratings below a threshold (candidates for review). */
  findBelow(threshold: number): Promise<readonly VendorRatingEntity[]>;
  /** Top-rated vendors. */
  findTopRated(limit: number): Promise<readonly VendorRatingEntity[]>;
  /** Vendors with auto-hide condition met. */
  findAutoHideCandidates(): Promise<readonly VendorRatingEntity[]>;
  /** Vendors with N or more reviews. */
  findWithMinReviews(minReviews: number): Promise<readonly VendorRatingEntity[]>;

  getStats(): Promise<RatingStats>;
  upsert(entity: VendorRatingEntity): Promise<VendorRatingEntity>;
  deleteByVendorId(vendorId: string): Promise<void>;
}
