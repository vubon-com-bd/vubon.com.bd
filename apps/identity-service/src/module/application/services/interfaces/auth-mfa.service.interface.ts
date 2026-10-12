/**
 * Auth MFA Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { MfaEntity } from '../../../domain/entities/mfa.entity.js';
import type { MfaResponseDTO, MfaSetupResponseDTO, MfaChallengeResponseDTO } from '../../dtos/responses/mfa-response.dto.js';
import type { EnableMfaRequestDTO } from '../../dtos/requests/auth/enable-mfa.dto.js';
import type { VerifyMfaRequestDTO } from '../../dtos/requests/auth/verify-mfa.dto.js';

export const AUTH_MFA_SERVICE = Symbol('AUTH_MFA_SERVICE');

export interface AuthMfaServiceInterface extends BaseServiceInterface<MfaEntity, string> {
  setup(authId: string): Promise<MfaSetupResponseDTO>;
  enable(input: EnableMfaRequestDTO): Promise<MfaResponseDTO>;
  disable(authId: string): Promise<MfaResponseDTO>;
  challenge(authId: string): Promise<MfaChallengeResponseDTO>;
  verify(input: VerifyMfaRequestDTO): Promise<MfaResponseDTO>;
}
