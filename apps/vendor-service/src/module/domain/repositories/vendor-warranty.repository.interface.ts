/**
 * Vendor Warranty Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorWarrantyEntity } from '../entities/vendor-warranty.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';

export const VENDOR_WARRANTY_REPOSITORY = Symbol('VENDOR_WARRANTY_REPOSITORY');

export interface VendorWarrantyListFilter {
  readonly vendorId?: string;
  readonly type?: string | readonly string[];
  readonly providesCoverage?: boolean;
  readonly isSellerBacked?: boolean;
  readonly isManufacturerBacked?: boolean;
  readonly hasLimitations?: boolean;
  readonly coverShipping?: boolean;
  readonly minPeriodDays?: number;
  readonly maxPeriodDays?: number;
}

export interface VendorWarrantyListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'periodDays';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorWarrantyListFilter;
}

export interface VendorWarrantyPaginationResult {
  readonly items: readonly VendorWarrantyEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorWarrantyRepository
  extends BaseRepository<VendorWarrantyEntity, string> {
  findByVendorId(
    vendorId: VendorIdVO | string,
  ): Promise<VendorWarrantyEntity | null>;
  findByType(type: string): Promise<readonly VendorWarrantyEntity[]>;
  findProvidingCoverage(): Promise<readonly VendorWarrantyEntity[]>;
  findExtendedWarranties(): Promise<readonly VendorWarrantyEntity[]>;
  findManufacturerBacked(): Promise<readonly VendorWarrantyEntity[]>;
  findPaginated(
    options: VendorWarrantyListOptions,
  ): Promise<VendorWarrantyPaginationResult>;
  getStats(): Promise<{
    readonly total: number;
    readonly withCoverage: number;
    readonly averagePeriodDays: number;
    readonly byType: Readonly<Record<string, number>>;
  }>;
}
