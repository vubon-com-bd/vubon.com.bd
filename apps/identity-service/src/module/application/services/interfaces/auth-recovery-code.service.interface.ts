/**
 * Auth Recovery Code Service Interface
 * @module identity-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { AuthRecoveryCodeEntity } from '../../../domain/entities/auth-recovery-code.entity.js';
import type { RecoveryCodesResponseDTO } from '../../dtos/responses/recovery-codes-response.dto.js';

export const AUTH_RECOVERY_CODE_SERVICE = Symbol('AUTH_RECOVERY_CODE_SERVICE');

export interface AuthRecoveryCodeServiceInterface extends BaseServiceInterface<AuthRecoveryCodeEntity, string> {
  generate(authId: string, count?: number): Promise<RecoveryCodesResponseDTO>;
  verify(authId: string, code: string): Promise<boolean>;
  countRemaining(authId: string): Promise<number>;
  revokeAll(authId: string): Promise<number>;
}
