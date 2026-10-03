/**
 * UserSettings Repository Interface
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { UserSettingsEntity } from '../entities/user-settings.entity.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export const USER_SETTINGS_REPOSITORY = Symbol('USER_SETTINGS_REPOSITORY');

export interface UserSettingsRepository extends BaseRepository<UserSettingsEntity, string> {
  findByUserId(userId: UserIdVO): Promise<UserSettingsEntity | null>;
  existsByUserId(userId: UserIdVO): Promise<boolean>;
}
