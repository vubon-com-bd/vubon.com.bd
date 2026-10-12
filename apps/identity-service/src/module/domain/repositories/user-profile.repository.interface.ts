/**
 * User Profile Repository Interface
 * @module identity-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import type { UserProfileEntity } from '../entities/user-profile.entity.js';
import type { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export const USER_PROFILE_REPOSITORY = Symbol('USER_PROFILE_REPOSITORY');

export interface UserProfileRepository extends BaseRepository<UserProfileEntity, string> {
  findByUserId(userId: UserIdVO): Promise<UserProfileEntity | null>;
  findByUserIdRaw(userId: string): Promise<UserProfileEntity | null>;

  // Cron support
  findIncomplete(): Promise<readonly UserProfileEntity[]>;

  softDelete(id: string): Promise<void>;
}
