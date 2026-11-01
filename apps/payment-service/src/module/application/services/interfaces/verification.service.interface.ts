/**
 * IVerificationService — contract
 * @module payment-service/application/services/interfaces
 */
import type {
  VerificationResponseDTO,
  VerificationInitiateResponseDTO,
} from '@application/dtos/responses/verification-response.dto.js';

export const VERIFICATION_SERVICE = Symbol('VERIFICATION_SERVICE');

export interface InitiateVerificationInputDTO {
  readonly paymentId: string;
  readonly method: string;
  readonly ttlSeconds?: number;
}

export interface VerifyCodeInputDTO {
  readonly verificationId: string;
  readonly code: string;
}

export interface IVerificationService {
  initiate(
    dto: InitiateVerificationInputDTO,
    actorId?: string,
  ): Promise<VerificationInitiateResponseDTO>;
  verify(dto: VerifyCodeInputDTO, actorId?: string): Promise<VerificationResponseDTO>;

  getById(id: string): Promise<VerificationResponseDTO>;
  listByPayment(paymentId: string): Promise<readonly VerificationResponseDTO[]>;
}
