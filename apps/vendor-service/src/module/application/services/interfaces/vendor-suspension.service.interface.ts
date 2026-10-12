/**
 * IVendorSuspensionService
 * @module vendor-service/application/services/interfaces
 */
import type { SuspendVendorRequestDto } from '../../dtos/requests/suspend-vendor.dto.js';
import type { ReinstateVendorRequestDto } from '../../dtos/requests/reinstate-vendor.dto.js';
import type { AppealSuspensionRequestDto } from '../../dtos/requests/appeal-suspension.dto.js';
import type { VendorSuspensionResponseDto } from '../../dtos/responses/vendor-suspension-response.dto.js';

export const VENDOR_SUSPENSION_SERVICE = Symbol('VENDOR_SUSPENSION_SERVICE');

export interface IVendorSuspensionService {
  suspend(dto: SuspendVendorRequestDto, actorId?: string): Promise<VendorSuspensionResponseDto>;
  lift(dto: ReinstateVendorRequestDto, actorId?: string): Promise<VendorSuspensionResponseDto>;
  appeal(dto: AppealSuspensionRequestDto, actorId?: string): Promise<VendorSuspensionResponseDto>;
  getById(suspensionId: string): Promise<VendorSuspensionResponseDto>;
  getActiveByVendorId(vendorId: string): Promise<VendorSuspensionResponseDto | null>;
  listByVendor(vendorId: string): Promise<readonly VendorSuspensionResponseDto[]>;
}
