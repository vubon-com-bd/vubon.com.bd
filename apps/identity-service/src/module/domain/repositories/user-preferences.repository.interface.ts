/**
 * User Preferences Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserPreferencesEntity } from '../entities/user-preferences.entity.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export const USER_PREFERENCES_REPOSITORY = Symbol('USER_PREFERENCES_REPOSITORY');

export interface UserPreferencesRepository extends BaseRepository<UserPreferencesEntity, string> {
  findByUserId(userId: UserIdVO): Promise<UserPreferencesEntity | null>;
  findByUserIdRaw(userId: string): Promise<UserPreferencesEntity | null>;

  // Cron support
  findWithMarketing(): Promise<readonly UserPreferencesEntity[]>;

  softDelete(id: string): Promise<void>;
}
