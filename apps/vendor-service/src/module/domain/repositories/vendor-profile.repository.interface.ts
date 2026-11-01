/**
 * Vendor Profile Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorProfileEntity } from '../entities/vendor-profile.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';

export const VENDOR_PROFILE_REPOSITORY = Symbol('VENDOR_PROFILE_REPOSITORY');

export interface VendorProfileListFilter {
  readonly isFeatured?: boolean;
  readonly isVerified?: boolean;
  readonly minRating?: number;
  readonly hasLogo?: boolean;
  readonly search?: string;
}

export interface VendorProfileListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'rating' | 'reviewCount';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorProfileListFilter;
}

export interface VendorProfilePaginationResult {
  readonly items: readonly VendorProfileEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorProfileRepository
  extends BaseRepository<VendorProfileEntity, string> {
  findByVendorId(vendorId: VendorIdVO | string): Promise<VendorProfileEntity | null>;
  findByIdVO(id: string): Promise<VendorProfileEntity | null>;
  findBySlug(slug: string): Promise<VendorProfileEntity | null>;
  findPaginated(options: VendorProfileListOptions): Promise<VendorProfilePaginationResult>;
  findCompleteProfiles(limit?: number): Promise<readonly VendorProfileEntity[]>;
  findIncompleteProfiles(limit?: number): Promise<readonly VendorProfileEntity[]>;
  getStats(): Promise<{
    readonly total: number;
    readonly complete: number;
    readonly withLogo: number;
    readonly withBanner: number;
    readonly featured: number;
  }>;
}
