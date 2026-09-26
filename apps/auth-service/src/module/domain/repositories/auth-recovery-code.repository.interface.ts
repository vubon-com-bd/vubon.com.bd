/**
 * AuthRecoveryCodeRepository
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserId } from '@vubon/shared-types/common';
import { AuthRecoveryCodeEntity } from '../entities/auth-recovery-code.entity';
import { RecoveryCodeVO } from '../value-objects/primitives/recovery-code.vo';

export interface AuthRecoveryCodeRepository
  extends BaseRepository<AuthRecoveryCodeEntity, string> {
  findByUserId(userId: UserId): Promise<readonly AuthRecoveryCodeEntity[]>;
  findActiveByUserId(userId: UserId): Promise<readonly AuthRecoveryCodeEntity[]>;
  findByCode(
    userId: UserId,
    code: RecoveryCodeVO,
  ): Promise<AuthRecoveryCodeEntity | null>;
  invalidateAllForUser(userId: UserId, at: number): Promise<number>;
}
