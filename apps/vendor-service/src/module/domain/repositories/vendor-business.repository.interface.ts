/**
 * Vendor Business Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorBusinessEntity } from '../entities/vendor-business.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';

export const VENDOR_BUSINESS_REPOSITORY = Symbol('VENDOR_BUSINESS_REPOSITORY');

export interface VendorBusinessListFilter {
  readonly businessType?: string;
  readonly vendorType?: string;
  readonly isLegallyRegistered?: boolean;
  readonly establishedBefore?: number;
  readonly minEmployeeCount?: number;
  readonly maxEmployeeCount?: number;
  readonly minAnnualRevenue?: number;
  readonly maxAnnualRevenue?: number;
  readonly search?: string;
}

export interface VendorBusinessListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'establishedYear' | 'annualRevenue';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorBusinessListFilter;
}

export interface VendorBusinessPaginationResult {
  readonly items: readonly VendorBusinessEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorBusinessRepository
  extends BaseRepository<VendorBusinessEntity, string> {
  findByVendorId(vendorId: VendorIdVO | string): Promise<VendorBusinessEntity | null>;
  findByIdVO(id: string): Promise<VendorBusinessEntity | null>;
  findByRegistrationNumber(regNumber: string): Promise<VendorBusinessEntity | null>;
  findByTaxId(taxId: string): Promise<VendorBusinessEntity | null>;
  findPaginated(options: VendorBusinessListOptions): Promise<VendorBusinessPaginationResult>;
  getStats(): Promise<{
    readonly total: number;
    readonly legallyRegistered: number;
    readonly established5PlusYears: number;
    readonly smallBusinesses: number;
  }>;
}
