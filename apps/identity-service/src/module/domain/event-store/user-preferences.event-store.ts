/**
 * User Preferences Event Store Interface
 * @module identity-service/domain/event-store
 */
import type { BaseEventStore } from '@vubon/shared-kernel/domain/base/base.event-store';
import type { UserPreferencesEntity } from '../entities/user-preferences.entity.js';

export const USER_PREFERENCES_EVENT_STORE = Symbol('USER_PREFERENCES_EVENT_STORE');

export interface UserPreferencesEventStore extends BaseEventStore {
  reconstitute(aggregateId: string): Promise<UserPreferencesEntity | null>;
  loadLatest(limit: number): Promise<readonly UserPreferencesEntity[]>;
  loadByUserId(userId: string): Promise<readonly UserPreferencesEntity[]>;
  purge(cutoffIso: string): Promise<number>;
}
