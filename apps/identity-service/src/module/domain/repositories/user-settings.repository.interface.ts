/**
 * User Settings Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserSettingsEntity } from '../entities/user-settings.entity.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export const USER_SETTINGS_REPOSITORY = Symbol('USER_SETTINGS_REPOSITORY');

export interface UserSettingsRepository extends BaseRepository<UserSettingsEntity, string> {
  findByUserId(userId: UserIdVO): Promise<UserSettingsEntity | null>;
  findByUserIdRaw(userId: string): Promise<UserSettingsEntity | null>;
  softDelete(id: string): Promise<void>;
}
