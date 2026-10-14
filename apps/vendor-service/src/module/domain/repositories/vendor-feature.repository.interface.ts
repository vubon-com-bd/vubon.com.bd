/**
 * Vendor Feature Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorFeatureEntity } from '../entities/vendor-feature.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import type { FeatureIdVO } from '../value-objects/primitives/feature-id.vo.js';

export const VENDOR_FEATURE_REPOSITORY = Symbol('VENDOR_FEATURE_REPOSITORY');

export interface VendorFeatureListFilter {
  readonly vendorId?: string;
  readonly featureKey?: string | readonly string[];
  readonly type?: string | readonly string[];
  readonly isEnabled?: boolean;
  readonly isActive?: boolean;
  readonly isExpired?: boolean;
  readonly isExpiringSoon?: boolean;
  readonly expiringInDays?: number;
  readonly isLimitExceeded?: boolean;
  readonly minUsagePercent?: number;
  readonly maxUsagePercent?: number;
}

export interface VendorFeatureListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'featureKey' | 'usagePercent';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorFeatureListFilter;
}

export interface VendorFeaturePaginationResult {
  readonly items: readonly VendorFeatureEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorFeatureRepository
  extends BaseRepository<VendorFeatureEntity, string> {
  findByIdVO(id: FeatureIdVO): Promise<VendorFeatureEntity | null>;
  findByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<readonly VendorFeatureEntity[]>;
  findByVendorAndKey(
    vendorId: string,
    featureKey: string,
  ): Promise<VendorFeatureEntity | null>;
  findEnabledByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<readonly VendorFeatureEntity[]>;
  findByType(type: string): Promise<readonly VendorFeatureEntity[]>;
  findExpiringSoon(days: number): Promise<readonly VendorFeatureEntity[]>;
  findExpired(): Promise<readonly VendorFeatureEntity[]>;
  findNearLimit(usagePercent: number): Promise<readonly VendorFeatureEntity[]>;
  findLimitExceeded(): Promise<readonly VendorFeatureEntity[]>;
  findPaginated(
    options: VendorFeatureListOptions,
  ): Promise<VendorFeaturePaginationResult>;
  isFeatureEnabled(vendorId: string, featureKey: string): Promise<boolean>;
  countByVendor(vendorId: VendorIdVO | string): Promise<number>;
  getStats(vendorId?: string): Promise<{
    readonly total: number;
    readonly enabled: number;
    readonly active: number;
    readonly nearLimit: number;
    readonly limitExceeded: number;
    readonly byType: Readonly<Record<string, number>>;
  }>;
}
