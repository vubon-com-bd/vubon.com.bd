/**
 * User Profile Event Store Interface
 * @module identity-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { UserProfileEntity } from '../entities/user-profile.entity.js';

export const USER_PROFILE_EVENT_STORE = Symbol('USER_PROFILE_EVENT_STORE');

export interface UserProfileEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<UserProfileEntity | null>;
  loadLatest(limit: number): Promise<readonly UserProfileEntity[]>;
  loadByUserId(userId: string): Promise<readonly UserProfileEntity[]>;
  purge(cutoffIso: string): Promise<number>;
}
