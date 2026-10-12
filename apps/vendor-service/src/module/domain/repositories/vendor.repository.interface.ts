/**
 * VendorRepository — aggregate root repository
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorEntity } from '../entities/vendor.entity.js';
import { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import { VendorStatusVO } from '../value-objects/primitives/vendor-status.vo.js';
import { VendorTypeVO } from '../value-objects/primitives/vendor-type.vo.js';
import { VendorTierVO } from '../value-objects/primitives/vendor-tier.vo.js';
import { VendorSlugVO } from '../value-objects/primitives/vendor-slug.vo.js';
import { VendorEmailVO } from '../value-objects/primitives/vendor-email.vo.js';

export const VENDOR_REPOSITORY = Symbol('VENDOR_REPOSITORY');

export interface VendorListFilter {
  readonly status?: string;
  readonly type?: string;
  readonly tier?: string;
  readonly isVerified?: boolean;
  readonly isFeatured?: boolean;
  readonly minRating?: number;
  readonly search?: string;
  readonly joinedFrom?: string;
  readonly joinedTo?: string;
}

export interface VendorListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'totalSales' | 'rating' | 'name';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorListFilter;
}

export interface VendorPaginationResult {
  readonly items: readonly VendorEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorAggregateStats {
  readonly totalVendors: number;
  readonly byStatus: Readonly<Record<string, number>>;
  readonly byType: Readonly<Record<string, number>>;
  readonly byTier: Readonly<Record<string, number>>;
  readonly verifiedCount: number;
  readonly featuredCount: number;
  readonly avgRating: number;
}

export interface VendorRepository extends BaseRepository<VendorEntity, string> {
  findByIdVO(id: VendorIdVO): Promise<VendorEntity | null>;
  findBySlug(slug: VendorSlugVO): Promise<VendorEntity | null>;
  findByEmail(email: VendorEmailVO): Promise<VendorEntity | null>;
  findByUserId(userId: string): Promise<VendorEntity | null>;
  findByStatus(status: VendorStatusVO): Promise<readonly VendorEntity[]>;
  findByType(type: VendorTypeVO): Promise<readonly VendorEntity[]>;
  findByTier(tier: VendorTierVO): Promise<readonly VendorEntity[]>;
  findFeatured(): Promise<readonly VendorEntity[]>;
  findVerified(): Promise<readonly VendorEntity[]>;
  findPaginated(options: VendorListOptions): Promise<VendorPaginationResult>;

  existsBySlug(slug: VendorSlugVO): Promise<boolean>;
  existsByEmail(email: VendorEmailVO): Promise<boolean>;
  existsByUserId(userId: string): Promise<boolean>;

  /** Vendors pending approval past SLA. */
  findPendingApprovalPastSla(hours: number): Promise<readonly VendorEntity[]>;
  /** Vendors inactive for N days. */
  findInactiveSince(days: number): Promise<readonly VendorEntity[]>;
  /** Candidates for tier upgrade based on sales. */
  findTierUpgradeCandidates(): Promise<readonly VendorEntity[]>;

  countByStatus(status: VendorStatusVO): Promise<number>;
  getAggregateStats(): Promise<VendorAggregateStats>;
  softDelete(id: string, deletedBy?: string): Promise<void>;
}
