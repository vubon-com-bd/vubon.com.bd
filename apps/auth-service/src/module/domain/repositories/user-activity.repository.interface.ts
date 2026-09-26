/**
 * UserActivityRepository
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserId } from '@vubon/shared-types/common';
import { UserActivityEntity } from '../entities/user-activity.entity';

export interface UserActivityRepository extends BaseRepository<UserActivityEntity, string> {
  findByUserId(
    userId: UserId,
    limit?: number,
  ): Promise<readonly UserActivityEntity[]>;
  findRecentByUser(
    userId: UserId,
    sinceEpochMs: number,
  ): Promise<readonly UserActivityEntity[]>;
  deleteOlderThan(epochMs: number): Promise<number>;
}
