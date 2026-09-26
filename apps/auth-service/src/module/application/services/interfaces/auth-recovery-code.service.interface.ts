/**
 * AuthRecoveryCodeServiceInterface
 * @module auth-service/application/services/interfaces
 */
import type { BaseServiceInterface } from '@vubon/shared-kernel/application/services/base.service.interface';
import type { UserId } from '@vubon/shared-types/common';
import type { AuthRecoveryCodeEntity } from '../../../domain/entities/auth-recovery-code.entity';
import type { RecoveryCodesResponseDTO } from '../../dtos/responses/recovery-codes-response.dto';

export interface AuthRecoveryCodeServiceInterface
  extends BaseServiceInterface<AuthRecoveryCodeEntity, string> {
  generateForUser(
    userId: UserId,
    count?: number,
    invalidatePrevious?: boolean,
  ): Promise<RecoveryCodesResponseDTO>;

  consume(userId: UserId, code: string): Promise<boolean>;

  listActive(userId: UserId): Promise<readonly AuthRecoveryCodeEntity[]>;

  invalidateAll(userId: UserId): Promise<number>;
}
