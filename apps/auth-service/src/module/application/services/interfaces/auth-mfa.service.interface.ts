/**
 * AuthMfaServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthMfaEntity } from '../../../domain/entities/auth-mfa.entity';
import type { EnableMfaRequestDTO } from '../../dtos/requests/auth/enable-mfa.dto';
import type { DisableMfaRequestDTO } from '../../dtos/requests/auth/disable-mfa.dto';
import type { VerifyMfaRequestDTO } from '../../dtos/requests/auth/verify-mfa.dto';
import type {
  MfaResponseDTO,
  MfaChallengeResponseDTO,
} from '../../dtos/responses/mfa-response.dto';

export interface AuthMfaServiceInterface
  extends BaseServiceInterface<AuthMfaEntity, UserId> {
  beginEnrollment(
    userId: UserId,
    input: EnableMfaRequestDTO,
  ): Promise<{
    secret: string;
    qrCodeUrl: string;
    recoveryCodes: readonly string[];
  }>;

  confirmEnrollment(userId: UserId, code: string): Promise<MfaResponseDTO>;

  disable(userId: UserId, input: DisableMfaRequestDTO): Promise<void>;

  verify(input: VerifyMfaRequestDTO, userId?: UserId): Promise<boolean>;

  getStatus(userId: UserId): Promise<MfaResponseDTO>;

  createChallenge(userId: UserId): Promise<MfaChallengeResponseDTO>;
}
