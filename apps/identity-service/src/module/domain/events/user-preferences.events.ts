/**
 * User Preferences Domain Events
 * @module identity-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { AUTH_AGGREGATE_TYPE, buildEventParams, type BaseEventParams } from './event.helpers.js';

export const USER_PREFERENCES_EVENT_TYPE = {
  CREATED: 'identity.user.preferences_created',
  UPDATED: 'identity.user.preferences_updated',
  UNSUBSCRIBED: 'identity.user.preferences_unsubscribed',
  RESUBSCRIBED: 'identity.user.preferences_resubscribed',
} as const;

export interface UserPreferencesCreatedPayload {
  readonly userId: string;
  readonly createdAt: string;
}

export interface UserPreferencesUpdatedPayload {
  readonly userId: string;
  readonly changes: Readonly<Record<string, boolean>>;
  readonly updatedAt: string;
}

export interface UserPreferencesUnsubscribePayload {
  readonly userId: string;
  readonly scope: 'all' | 'marketing' | 'promotions';
  readonly unsubscribedAt: string;
}

export class UserPreferencesCreatedEvent extends BaseDomainEvent<
  typeof USER_PREFERENCES_EVENT_TYPE.CREATED,
  UserPreferencesCreatedPayload
> {
  constructor(p: BaseEventParams<UserPreferencesCreatedPayload>) {
    super(buildEventParams(USER_PREFERENCES_EVENT_TYPE.CREATED, AUTH_AGGREGATE_TYPE.USER_PROFILE, p));
  }
}

export class UserPreferencesUpdatedEvent extends BaseDomainEvent<
  typeof USER_PREFERENCES_EVENT_TYPE.UPDATED,
  UserPreferencesUpdatedPayload
> {
  constructor(p: BaseEventParams<UserPreferencesUpdatedPayload>) {
    super(buildEventParams(USER_PREFERENCES_EVENT_TYPE.UPDATED, AUTH_AGGREGATE_TYPE.USER_PROFILE, p));
  }
}

export class UserPreferencesUnsubscribedEvent extends BaseDomainEvent<
  typeof USER_PREFERENCES_EVENT_TYPE.UNSUBSCRIBED,
  UserPreferencesUnsubscribePayload
> {
  constructor(p: BaseEventParams<UserPreferencesUnsubscribePayload>) {
    super(buildEventParams(USER_PREFERENCES_EVENT_TYPE.UNSUBSCRIBED, AUTH_AGGREGATE_TYPE.USER_PROFILE, p));
  }
}
