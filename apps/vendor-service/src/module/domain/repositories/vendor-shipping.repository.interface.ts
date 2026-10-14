/**
 * Vendor Shipping Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorShippingEntity } from '../entities/vendor-shipping.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';

export const VENDOR_SHIPPING_REPOSITORY = Symbol('VENDOR_SHIPPING_REPOSITORY');

export interface VendorShippingListFilter {
  readonly vendorId?: string;
  readonly supportsMethod?: string;
  readonly supportsZone?: string;
  readonly hasFreeShipping?: boolean;
  readonly hasExpressShipping?: boolean;
  readonly shipsInternationally?: boolean;
  readonly allowsPickup?: boolean;
  readonly allowsCourier?: boolean;
  readonly maxProcessingDays?: number;
}

export interface VendorShippingListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorShippingListFilter;
}

export interface VendorShippingPaginationResult {
  readonly items: readonly VendorShippingEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorShippingRepository
  extends BaseRepository<VendorShippingEntity, string> {
  findByVendorId(
    vendorId: VendorIdVO | string,
  ): Promise<VendorShippingEntity | null>;
  findSupportingMethod(
    method: string,
  ): Promise<readonly VendorShippingEntity[]>;
  findSupportingZone(zone: string): Promise<readonly VendorShippingEntity[]>;
  findWithFreeShipping(): Promise<readonly VendorShippingEntity[]>;
  findWithExpressShipping(): Promise<readonly VendorShippingEntity[]>;
  findShipsInternationally(): Promise<readonly VendorShippingEntity[]>;
  findPaginated(
    options: VendorShippingListOptions,
  ): Promise<VendorShippingPaginationResult>;
  getStats(): Promise<{
    readonly total: number;
    readonly withFreeShipping: number;
    readonly withExpress: number;
    readonly withInternational: number;
    readonly averageProcessingDays: number;
    readonly byMethodUsage: Readonly<Record<string, number>>;
    readonly byZoneUsage: Readonly<Record<string, number>>;
  }>;
  calculateShippingCost(
    vendorId: string,
    zone: string,
    orderAmount: number,
  ): Promise<number>;
}
