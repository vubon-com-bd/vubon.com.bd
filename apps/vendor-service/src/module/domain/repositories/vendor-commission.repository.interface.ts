/**
 * Vendor Commission Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorCommissionEntity } from '../entities/vendor-commission.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import type { CommissionIdVO } from '../value-objects/primitives/commission-id.vo.js';

export const VENDOR_COMMISSION_REPOSITORY = Symbol('VENDOR_COMMISSION_REPOSITORY');

export interface VendorCommissionListFilter {
  readonly vendorId?: string;
  readonly type?: string | readonly string[];
  readonly isActive?: boolean;
  readonly isCurrentlyActive?: boolean;
  readonly isExpired?: boolean;
  readonly minRate?: number;
  readonly maxRate?: number;
  readonly effectiveOn?: string;
}

export interface VendorCommissionListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'rate' | 'effectiveFrom';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorCommissionListFilter;
}

export interface VendorCommissionPaginationResult {
  readonly items: readonly VendorCommissionEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorCommissionRepository
  extends BaseRepository<VendorCommissionEntity, string> {
  findByIdVO(id: CommissionIdVO): Promise<VendorCommissionEntity | null>;
  findByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<readonly VendorCommissionEntity[]>;
  findActiveByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<VendorCommissionEntity | null>;
  findEffectiveForDate(
    vendorId: string,
    effectiveDate: string,
  ): Promise<VendorCommissionEntity | null>;
  findPaginated(
    options: VendorCommissionListOptions,
  ): Promise<VendorCommissionPaginationResult>;
  countByVendor(vendorId: VendorIdVO | string): Promise<number>;
  getStats(vendorId?: string): Promise<{
    readonly total: number;
    readonly active: number;
    readonly expired: number;
    readonly averageRate: number;
    readonly byType: Readonly<Record<string, number>>;
  }>;
}
