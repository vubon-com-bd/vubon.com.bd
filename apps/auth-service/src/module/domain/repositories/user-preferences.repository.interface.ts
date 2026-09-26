/**
 * UserPreferencesRepository
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserId } from '@vubon/shared-types/common';
import { UserPreferencesEntity } from '../entities/user-preferences.entity';

export interface UserPreferencesRepository extends BaseRepository<UserPreferencesEntity, UserId> {
  findByUserId(userId: UserId): Promise<UserPreferencesEntity | null>;
}
