/**
 * Auth2FaRepository
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserId } from '@vubon/shared-types/common';
import { Auth2FaEntity } from '../entities/auth-2fa.entity';

export interface Auth2FaRepository extends BaseRepository<Auth2FaEntity, string> {
  findByUser(userId: UserId): Promise<Auth2FaEntity | null>;
  findEnabledByUsers(userIds: readonly UserId[]): Promise<readonly Auth2FaEntity[]>;
}
