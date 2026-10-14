/**
 * Vendor Rating Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorRatingEntity } from '../entities/vendor-rating.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';

export const VENDOR_RATING_REPOSITORY = Symbol('VENDOR_RATING_REPOSITORY');

export interface VendorRatingListFilter {
  readonly vendorId?: string;
  readonly minOverall?: number;
  readonly maxOverall?: number;
  readonly minReviews?: number;
  readonly hasEnoughForDisplay?: boolean;
  readonly triggersAutoHide?: boolean;
  readonly triggersAutoFlag?: boolean;
  readonly isPositive?: boolean;
  readonly isNegative?: boolean;
}

export interface VendorRatingListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'overall' | 'totalReviews';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorRatingListFilter;
}

export interface VendorRatingPaginationResult {
  readonly items: readonly VendorRatingEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorRatingRepository
  extends BaseRepository<VendorRatingEntity, string> {
  findByVendorId(
    vendorId: VendorIdVO | string,
  ): Promise<VendorRatingEntity | null>;
  findByVendorIds(
    vendorIds: readonly string[],
  ): Promise<readonly VendorRatingEntity[]>;
  findTopRated(limit?: number): Promise<readonly VendorRatingEntity[]>;
  findBottomRated(limit?: number): Promise<readonly VendorRatingEntity[]>;
  findNeedingAutoHide(): Promise<readonly VendorRatingEntity[]>;
  findNeedingAutoFlag(): Promise<readonly VendorRatingEntity[]>;
  findWithRecentDecline(days?: number): Promise<readonly VendorRatingEntity[]>;
  findPaginated(
    options: VendorRatingListOptions,
  ): Promise<VendorRatingPaginationResult>;
  getStats(): Promise<{
    readonly total: number;
    readonly averageOverall: number;
    readonly averageTotalReviews: number;
    readonly positiveCount: number;
    readonly negativeCount: number;
    readonly autoHideCount: number;
    readonly autoFlagCount: number;
  }>;
  getDistribution(vendorId: string): Promise<Readonly<Record<1 | 2 | 3 | 4 | 5, number>>>;
}
