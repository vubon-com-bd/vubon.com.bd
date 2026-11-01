/**
 * IVendorAddressService — contract
 * @module vendor-service/application/services/interfaces
 */
import type { AddressSummaryDTO } from '../../dtos/responses/vendor-detail-response.dto.js';

export const VENDOR_ADDRESS_SERVICE = Symbol('VENDOR_ADDRESS_SERVICE');

export interface AddressInputDTO {
  readonly label: string;
  readonly addressType: 'head_office' | 'warehouse' | 'billing' | 'return' | 'other';
  readonly line1: string;
  readonly line2?: string;
  readonly area?: string;
  readonly city: string;
  readonly district: string;
  readonly division: string;
  readonly postalCode?: string;
  readonly country: string;
  readonly latitude?: number;
  readonly longitude?: number;
}

export interface IVendorAddressService {
  add(vendorId: string, input: AddressInputDTO, actorId?: string): Promise<AddressSummaryDTO>;
  update(addressId: string, patch: Partial<AddressInputDTO>, actorId?: string): Promise<AddressSummaryDTO>;
  remove(addressId: string, actorId?: string): Promise<{ readonly success: true }>;
  verify(addressId: string, actorId: string): Promise<AddressSummaryDTO>;
  markPrimary(addressId: string, actorId: string): Promise<AddressSummaryDTO>;
  listByVendor(vendorId: string): Promise<readonly AddressSummaryDTO[]>;
  getPrimary(vendorId: string): Promise<AddressSummaryDTO | null>;
}
