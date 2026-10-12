/**
 * VendorWarrantyRepository — 1:1 with vendor (default warranty policy)
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorWarrantyEntity } from '../entities/vendor-warranty.entity.js';
import { WarrantyTypeVO } from '../value-objects/primitives/warranty-type.vo.js';

export const VENDOR_WARRANTY_REPOSITORY = Symbol('VENDOR_WARRANTY_REPOSITORY');

export interface VendorWarrantyRepository extends BaseRepository<VendorWarrantyEntity, string> {
  findByVendorId(vendorId: string): Promise<VendorWarrantyEntity | null>;
  existsByVendorId(vendorId: string): Promise<boolean>;
  upsert(entity: VendorWarrantyEntity): Promise<VendorWarrantyEntity>;

  /** Vendors with no warranty policy. */
  findWithNoWarranty(): Promise<readonly VendorWarrantyEntity[]>;
  /** Vendors offering manufacturer-backed warranty. */
  findByType(type: WarrantyTypeVO): Promise<readonly VendorWarrantyEntity[]>;
  /** Vendors covering shipping in warranty. */
  findCoveringShipping(): Promise<readonly VendorWarrantyEntity[]>;
  /** Vendors with long-term warranty (>= 1 year). */
  findLongTermWarranty(): Promise<readonly VendorWarrantyEntity[]>;
  /** Vendors with exclusions defined. */
  findWithExclusions(): Promise<readonly VendorWarrantyEntity[]>;

  deleteByVendorId(vendorId: string): Promise<void>;
}
