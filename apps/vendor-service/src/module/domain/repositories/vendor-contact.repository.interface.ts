/**
 * Vendor Contact Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorContactEntity } from '../entities/vendor-contact.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import type { ContactIdVO } from '../value-objects/primitives/contact-id.vo.js';

export const VENDOR_CONTACT_REPOSITORY = Symbol('VENDOR_CONTACT_REPOSITORY');

export interface VendorContactListFilter {
  readonly vendorId?: string;
  readonly type?: string | readonly string[];
  readonly isPrimary?: boolean;
  readonly isVerified?: boolean;
  readonly search?: string;
}

export interface VendorContactListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorContactListFilter;
}

export interface VendorContactPaginationResult {
  readonly items: readonly VendorContactEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorContactRepository
  extends BaseRepository<VendorContactEntity, string> {
  findByIdVO(id: ContactIdVO): Promise<VendorContactEntity | null>;
  findByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorContactEntity[]>;
  findByVendorAndType(
    vendorId: VendorIdVO | string,
    type: string,
  ): Promise<readonly VendorContactEntity[]>;
  findPrimaryByVendor(vendorId: VendorIdVO | string): Promise<VendorContactEntity | null>;
  findByValue(value: string): Promise<readonly VendorContactEntity[]>;
  findUnverifiedByVendor(
    vendorId: VendorIdVO | string,
  ): Promise<readonly VendorContactEntity[]>;
  findPaginated(options: VendorContactListOptions): Promise<VendorContactPaginationResult>;
  existsByVendorAndValue(vendorId: string, value: string): Promise<boolean>;
  countByVendor(vendorId: VendorIdVO | string): Promise<number>;
  getStats(vendorId?: string): Promise<{
    readonly total: number;
    readonly verified: number;
    readonly byType: Readonly<Record<string, number>>;
  }>;
}
