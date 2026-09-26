/**
 * UserSettingsRepository
 * @module auth-service/domain/repositories
 */
import { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserId } from '@vubon/shared-types/common';
import { UserSettingsEntity } from '../entities/user-settings.entity';

export interface UserSettingsRepository extends BaseRepository<UserSettingsEntity, UserId> {
  findByUserId(userId: UserId): Promise<UserSettingsEntity | null>;
}
