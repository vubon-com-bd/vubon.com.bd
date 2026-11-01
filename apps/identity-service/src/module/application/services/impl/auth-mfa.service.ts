/**
 * Auth MFA Service Implementation
 * @module identity-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthMfaServiceInterface } from '../interfaces/auth-mfa.service.interface.js';
import type { MfaRepository } from '../../../domain/repositories/mfa.repository.interface.js';
import { MFA_REPOSITORY } from '../../../domain/repositories/mfa.repository.interface.js';
import type { MfaResponseDTO, MfaSetupResponseDTO, MfaChallengeResponseDTO } from '../../dtos/responses/mfa-response.dto.js';
import type { EnableMfaRequestDTO } from '../../dtos/requests/auth/enable-mfa.dto.js';
import type { VerifyMfaRequestDTO } from '../../dtos/requests/auth/verify-mfa.dto.js';
import { MfaChallengeService } from '../../../domain/services/mfa-challenge.service.js';

@Injectable()
export class AuthMfaService extends BaseService implements AuthMfaServiceInterface {
  readonly name = 'AuthMfaService';

  constructor(
    @Inject(MFA_REPOSITORY) private readonly mfaRepo: MfaRepository,
  ) {
    super();
  }

  async setup(_authId: string): Promise<MfaSetupResponseDTO> {
    return {
      success: true,
      secret: 'PENDING_SECRET',
      qrCodeUrl: 'otpauth://totp/...',
      otpauthUrl: 'otpauth://totp/...',
      backupCodes: [],
    };
  }

  async enable(_input: EnableMfaRequestDTO): Promise<MfaResponseDTO> {
    return { success: true, enabled: true, message: 'MFA enabled' };
  }

  async disable(_authId: string): Promise<MfaResponseDTO> {
    return { success: true, enabled: false, message: 'MFA disabled' };
  }

  async challenge(_authId: string): Promise<MfaChallengeResponseDTO> {
    const expiresAt = MfaChallengeService.challengeExpiresAt().toISOString();
    return {
      success: true,
      challengeId: crypto.randomUUID?.() ?? Math.random().toString(36),
      mfaMethods: ['totp'],
      expiresAt,
    };
  }

  async verify(_input: VerifyMfaRequestDTO): Promise<MfaResponseDTO> {
    return { success: true, enabled: true, message: 'Verified' };
  }
}
