/**
 * AuthMfaRepository
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserId } from '@vubon/shared-types/common';
import { AuthMfaEntity } from '../entities/auth-mfa.entity';

export interface AuthMfaRepository extends BaseRepository<AuthMfaEntity, string> {
  findByUserId(userId: UserId): Promise<AuthMfaEntity | null>;
  findEnabledByUserIds(
    userIds: readonly UserId[],
  ): Promise<readonly AuthMfaEntity[]>;
}
