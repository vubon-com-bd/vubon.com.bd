/**
 * IVendorBusinessService — contract
 * @module vendor-service/application/services/interfaces
 */
import type { UpdateBusinessRequestDTO } from '../../dtos/requests/vendor/update-business.dto.js';
import type { VendorResponseDTO } from '../../dtos/responses/vendor-response.dto.js';

export const VENDOR_BUSINESS_SERVICE = Symbol('VENDOR_BUSINESS_SERVICE');

export interface IVendorBusinessService {
  update(dto: UpdateBusinessRequestDTO, actorId?: string): Promise<VendorResponseDTO>;
  getByVendorId(vendorId: string): Promise<VendorResponseDTO>;
  setRegistrationNumber(vendorId: string, regNumber: string, actorId: string): Promise<VendorResponseDTO>;
  setTaxId(vendorId: string, taxId: string, actorId: string): Promise<VendorResponseDTO>;
}
