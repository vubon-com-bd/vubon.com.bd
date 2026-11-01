/**
 * IVendorVerificationService — contract
 * @module vendor-service/application/services/interfaces
 */
import type {
  SubmitVerificationRequestDTO,
  ReverifyRequestDTO,
} from '../../dtos/requests/verification/index.js';
import type {
  VerificationResponseDTO,
  VerificationListResponseDTO,
  VerificationStatusResponseDTO,
} from '../../dtos/responses/verification-response.dto.js';

export const VENDOR_VERIFICATION_SERVICE = Symbol('VENDOR_VERIFICATION_SERVICE');

export interface IVendorVerificationService {
  submit(dto: SubmitVerificationRequestDTO, actorId?: string): Promise<VerificationResponseDTO>;
  reverify(dto: ReverifyRequestDTO, actorId?: string): Promise<VerificationResponseDTO>;
  approve(verificationId: string, actorId: string): Promise<VerificationResponseDTO>;
  reject(verificationId: string, reason: string, actorId: string): Promise<VerificationResponseDTO>;
  getById(id: string): Promise<VerificationResponseDTO>;
  getStatus(vendorId: string): Promise<VerificationStatusResponseDTO>;
  listByVendor(vendorId: string): Promise<VerificationListResponseDTO>;
  listPending(limit?: number): Promise<readonly VerificationResponseDTO[]>;
  listOverdue(): Promise<readonly VerificationResponseDTO[]>;
}
