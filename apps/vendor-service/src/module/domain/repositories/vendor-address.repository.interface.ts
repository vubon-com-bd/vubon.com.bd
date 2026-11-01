/**
 * Vendor Address Repository Interface
 * @module vendor-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { VendorAddressEntity } from '../entities/vendor-address.entity.js';
import type { VendorIdVO } from '../value-objects/primitives/vendor-id.vo.js';
import type { AddressIdVO } from '../value-objects/primitives/address-id.vo.js';

export const VENDOR_ADDRESS_REPOSITORY = Symbol('VENDOR_ADDRESS_REPOSITORY');

export interface VendorAddressListFilter {
  readonly vendorId?: string;
  readonly addressType?: string | readonly string[];
  readonly city?: string;
  readonly district?: string;
  readonly division?: string;
  readonly country?: string;
  readonly isPrimary?: boolean;
  readonly isVerified?: boolean;
  readonly hasCoordinates?: boolean;
  readonly search?: string;
}

export interface VendorAddressListOptions {
  readonly page: number;
  readonly limit: number;
  readonly sortBy?: 'createdAt' | 'updatedAt' | 'city';
  readonly sortDir?: 'asc' | 'desc';
  readonly filter?: VendorAddressListFilter;
}

export interface VendorAddressPaginationResult {
  readonly items: readonly VendorAddressEntity[];
  readonly total: number;
  readonly page: number;
  readonly limit: number;
  readonly totalPages: number;
}

export interface VendorAddressRepository
  extends BaseRepository<VendorAddressEntity, string> {
  findByIdVO(id: AddressIdVO): Promise<VendorAddressEntity | null>;
  findByVendor(vendorId: VendorIdVO | string): Promise<readonly VendorAddressEntity[]>;
  findByVendorAndType(
    vendorId: VendorIdVO | string,
    addressType: string,
  ): Promise<readonly VendorAddressEntity[]>;
  findPrimaryByVendor(vendorId: VendorIdVO | string): Promise<VendorAddressEntity | null>;
  findByCity(city: string): Promise<readonly VendorAddressEntity[]>;
  findByDistrict(district: string): Promise<readonly VendorAddressEntity[]>;
  findWithCoordinates(vendorId: VendorIdVO | string): Promise<readonly VendorAddressEntity[]>;
  findPaginated(options: VendorAddressListOptions): Promise<VendorAddressPaginationResult>;
  countByVendor(vendorId: VendorIdVO | string): Promise<number>;
  getStats(vendorId?: string): Promise<{
    readonly total: number;
    readonly verified: number;
    readonly withCoordinates: number;
    readonly byType: Readonly<Record<string, number>>;
    readonly byDivision: Readonly<Record<string, number>>;
  }>;
}
