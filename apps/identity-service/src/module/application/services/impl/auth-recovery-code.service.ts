/**
 * Auth Recovery Code Service Implementation
 * @module identity-service/application/services/impl
 */
import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@vubon/shared-kernel/application/services/base.service';
import type { AuthRecoveryCodeServiceInterface } from '../interfaces/auth-recovery-code.service.interface.js';
import type { AuthRecoveryCodeRepository } from '../../../domain/repositories/auth-recovery-code.repository.interface.js';
import { AUTH_RECOVERY_CODE_REPOSITORY } from '../../../domain/repositories/auth-recovery-code.repository.interface.js';
import type { RecoveryCodesResponseDTO } from '../../dtos/responses/recovery-codes-response.dto.js';
import { RecoveryCodeGeneratorService } from '../../../domain/services/recovery-code-generator.service.js';

@Injectable()
export class AuthRecoveryCodeService extends BaseService implements AuthRecoveryCodeServiceInterface {
  readonly name = 'AuthRecoveryCodeService';

  constructor(
    @Inject(AUTH_RECOVERY_CODE_REPOSITORY)
    private readonly repo: AuthRecoveryCodeRepository,
  ) {
    super();
  }

  async generate(_authId: string, count?: number): Promise<RecoveryCodesResponseDTO> {
    const codes = RecoveryCodeGeneratorService.generate(count);
    return {
      success: true,
      codes,
      generatedAt: new Date().toISOString(),
      remainingCount: codes.length,
    };
  }

  async verify(_authId: string, _code: string): Promise<boolean> {
    return false;
  }

  async countRemaining(authId: string): Promise<number> {
    return this.repo.countActiveByAuthId({ value: authId } as never);
  }

  async revokeAll(authId: string): Promise<number> {
    return this.repo.revokeAllByAuthId({ value: authId } as never);
  }
}
