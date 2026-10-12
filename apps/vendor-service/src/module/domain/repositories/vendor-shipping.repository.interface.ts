/**
 * VendorShippingRepository — 1:1 with vendor
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { VendorShippingEntity } from '../entities/vendor-shipping.entity.js';
import { ShippingZoneVO } from '../value-objects/primitives/shipping-zone.vo.js';
import { ShippingMethodVO } from '../value-objects/primitives/shipping-method.vo.js';

export const VENDOR_SHIPPING_REPOSITORY = Symbol('VENDOR_SHIPPING_REPOSITORY');

export interface VendorShippingRepository extends BaseRepository<VendorShippingEntity, string> {
  findByVendorId(vendorId: string): Promise<VendorShippingEntity | null>;
  existsByVendorId(vendorId: string): Promise<boolean>;
  upsert(entity: VendorShippingEntity): Promise<VendorShippingEntity>;

  /** Vendors that ship to a specific zone. */
  findSupportingZone(zone: ShippingZoneVO): Promise<readonly VendorShippingEntity[]>;
  /** Vendors that support a specific method. */
  findSupportingMethod(method: ShippingMethodVO): Promise<readonly VendorShippingEntity[]>;
  /** Vendors offering same-day delivery. */
  findSameDaySupport(): Promise<readonly VendorShippingEntity[]>;
  /** Vendors with free-shipping threshold configured. */
  findWithFreeShipping(): Promise<readonly VendorShippingEntity[]>;
  /** Vendors with no active rates. */
  findWithoutActiveRates(): Promise<readonly VendorShippingEntity[]>;

  deleteByVendorId(vendorId: string): Promise<void>;
}
