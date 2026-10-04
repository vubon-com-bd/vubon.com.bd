/**
 * UserPreferences Repository Interface
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { UserPreferencesEntity } from '../entities/user-preferences.entity.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export const USER_PREFERENCES_REPOSITORY = Symbol('USER_PREFERENCES_REPOSITORY');

export interface UserPreferencesRepository
  extends BaseRepository<UserPreferencesEntity, string> {
  findByUserId(userId: UserIdVO): Promise<UserPreferencesEntity | null>;
  existsByUserId(userId: UserIdVO): Promise<boolean>;
}
