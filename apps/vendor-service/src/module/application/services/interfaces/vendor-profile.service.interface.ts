/**
 * IVendorProfileService — contract
 * @module vendor-service/application/services/interfaces
 */
import type { UpdateProfileRequestDTO } from '../../dtos/requests/vendor/update-profile.dto.js';
import type { VendorResponseDTO } from '../../dtos/responses/vendor-response.dto.js';

export const VENDOR_PROFILE_SERVICE = Symbol('VENDOR_PROFILE_SERVICE');

export interface IVendorProfileService {
  update(dto: UpdateProfileRequestDTO, actorId?: string): Promise<VendorResponseDTO>;
  getByVendorId(vendorId: string): Promise<VendorResponseDTO>;
  markFeatured(vendorId: string, actorId: string): Promise<VendorResponseDTO>;
  markUnfeatured(vendorId: string, actorId: string): Promise<VendorResponseDTO>;
}
