/**
 * UserProfileRepository
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserId } from '@vubon/shared-types/common';
import { UserProfileEntity } from '../entities/user-profile.entity';

export interface UserProfileRepository extends BaseRepository<UserProfileEntity, UserId> {
  findByUserId(userId: UserId): Promise<UserProfileEntity | null>;
}
