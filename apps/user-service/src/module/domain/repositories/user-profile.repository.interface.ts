/**
 * UserProfile Repository Interface
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { UserProfileEntity } from '../entities/user-profile.entity.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export const USER_PROFILE_REPOSITORY = Symbol('USER_PROFILE_REPOSITORY');

export interface UserProfileRepository extends BaseRepository<UserProfileEntity, string> {
  findByUserId(userId: UserIdVO): Promise<UserProfileEntity | null>;
  existsByUserId(userId: UserIdVO): Promise<boolean>;
  deleteByUserId(userId: UserIdVO): Promise<void>;
}
