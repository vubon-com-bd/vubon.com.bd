/**
 * Vendor Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorEntity } from '../entities/vendor.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

// ─── DI Token ──────────────────────────────
export const VENDOR_REPOSITORY = Symbol('VENDOR_REPOSITORY');

// ─── Filter ────────────────────────────────
export interface VendorListFilter {
  readonly status?: string | readonly string[];
  readonly type?: string | readonly string[];
  readonly businessType?: string | readonly string[];
  readonly tier?: string | readonly string[];
  readonly isVerified?: boolean;
  readonly isFeatured?: boolean;
  readonly minRating?: number;
  readonly minSales?: number;
  readonly search?: string;
  readonly createdFrom?: string;
  readonly createdTo?: string;
}

// ─── List Options ──────────────────────────
export interface VendorListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'name' | 'rating' | 'totalSales' | 'totalOrders';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorListFilter;
  readonly includeDeleted?: boolean;
}

// ─── Pagination Result ─────────────────────
export interface VendorPaginationResult {
  readonly items: readonly VendorEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
  readonly hasNext: boolean;
  readonly hasPrev: boolean;
}

// ─── Stats ─────────────────────────────────
export interface VendorStats {
  readonly total: number;
  readonly activeCount: number;
  readonly pendingCount: number;
  readonly suspendedCount: number;
  readonly verifiedCount: number;
  readonly featuredCount: number;
  readonly totalSales: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly byTier: Readonly<Record<string, number>>;
}

// ─── Main Interface ────────────────────────
export interface VendorRepository extends BaseRepository<VendorEntity, string> {
  // Find by VO
  findByIdVO(id: VendorIdVO): Promise<VendorEntity | null>;

  // Uniqueness checks
  existsBySlug(slug: string): Promise<boolean>;
  existsByEmail(email: string): Promise<boolean>;
  existsByUserId(userId: string): Promise<boolean>;
  findBySlug(slug: string): Promise<VendorEntity | null>;
  findByEmail(email: string): Promise<VendorEntity | null>;
  findByUserId(userId: UserIdVO | string): Promise<VendorEntity | null>;

  // Lookups
  findByStatus(status: string): Promise<readonly VendorEntity[]>;
  findByTier(tier: string): Promise<readonly VendorEntity[]>;
  findByType(type: string): Promise<readonly VendorEntity[]>;
  findFeatured(limit?: number): Promise<readonly VendorEntity[]>;
  findVerified(limit?: number): Promise<readonly VendorEntity[]>;
  findTopRated(limit?: number): Promise<readonly VendorEntity[]>;

  // Pagination + filter
  findPaginated(options: VendorListOptions): Promise<VendorPaginationResult>;

  // Search
  search(term: string, limit?: number): Promise<readonly VendorEntity[]>;

  // Stats
  getStats(filter?: VendorListFilter): Promise<VendorStats>;

  // Cron / background support
  findPendingForReview(olderThanHours: number): Promise<readonly VendorEntity[]>;
  findSuspendedForReview(): Promise<readonly VendorEntity[]>;
  findInactive(olderThanDays: number): Promise<readonly VendorEntity[]>;
  findPendingTierUpgrades(): Promise<readonly VendorEntity[]>;

  // Bulk
  saveMany(entities: readonly VendorEntity[]): Promise<readonly VendorEntity[]>;

  // Soft delete
  softDelete(id: string, deletedBy?: string): Promise<void>;
  restore(id: string): Promise<void>;

  // Counts
  countByStatus(status: string): Promise<number>;
  countByTier(tier: string): Promise<number>;
}
