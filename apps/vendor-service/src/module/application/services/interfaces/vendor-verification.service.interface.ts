/**
 * IVendorVerificationService
 * @module vendor-service/application/services/interfaces
 */
import type { SubmitVerificationRequestDto } from '../../dtos/requests/submit-verification.dto.js';
import type { VendorVerificationResponseDto } from '../../dtos/responses/vendor-verification-response.dto.js';

export const VENDOR_VERIFICATION_SERVICE = Symbol('VENDOR_VERIFICATION_SERVICE');

export interface IVendorVerificationService {
  submit(dto: SubmitVerificationRequestDto, actorId?: string): Promise<VendorVerificationResponseDto>;
  startReview(vendorId: string, reviewedBy: string, actorId?: string): Promise<VendorVerificationResponseDto>;
  approve(vendorId: string, reviewedBy: string, actorId?: string): Promise<VendorVerificationResponseDto>;
  reject(vendorId: string, reviewedBy: string, reason: string, actorId?: string): Promise<VendorVerificationResponseDto>;
  getByVendorId(vendorId: string): Promise<VendorVerificationResponseDto>;
}
