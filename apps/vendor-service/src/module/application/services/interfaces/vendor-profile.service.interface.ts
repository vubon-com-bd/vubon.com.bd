/**
 * IVendorProfileService
 * @module vendor-service/application/services/interfaces
 */
import type { UpdateVendorProfileRequestDto } from '../../dtos/requests/update-profile.dto.js';
import type { VendorResponseDto } from '../../dtos/responses/vendor-response.dto.js';

export const VENDOR_PROFILE_SERVICE = Symbol('VENDOR_PROFILE_SERVICE');

export interface IVendorProfileService {
  update(dto: UpdateVendorProfileRequestDto, actorId?: string): Promise<VendorResponseDto>;
  getByVendorId(vendorId: string): Promise<VendorResponseDto>;
}
