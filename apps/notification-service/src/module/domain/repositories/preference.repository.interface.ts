/**
 * Preference Repository Interface
 * @module notification-service/domain/repositories
 */
import type { BaseRepository } from '@vubon/shared-kernel/domain/base/base.repository.interface';
import { PreferenceEntity } from '../entities/preference.entity.js';
import { PreferenceIdVO } from '../value-objects/primitives/preference-id.vo.js';
import { UserIdVO } from '../value-objects/primitives/user-id.vo.js';

export const PREFERENCE_REPOSITORY = Symbol('PREFERENCE_REPOSITORY');

export interface PreferenceRepository extends BaseRepository<PreferenceEntity, string> {
  findByIdVO(id: PreferenceIdVO): Promise<PreferenceEntity | null>;
  findByUserId(userId: UserIdVO): Promise<PreferenceEntity | null>;
  existsByUserId(userId: UserIdVO): Promise<boolean>;
  /** Users who opted out of a specific channel — for bulk filtering. */
  findUserIdsOptedOutOf(channel: string): Promise<readonly string[]>;
}
