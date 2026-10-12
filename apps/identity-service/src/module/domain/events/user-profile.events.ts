/**
 * User Profile Domain Events
 * @module identity-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { AUTH_AGGREGATE_TYPE, buildEventParams, type BaseEventParams } from './event.helpers.js';

export const USER_PROFILE_EVENT_TYPE = {
  CREATED: 'user.profile_created',
  UPDATED: 'user.profile_updated',
  AVATAR_UPDATED: 'user.profile_avatar_updated',
  BIO_UPDATED: 'user.profile_bio_updated',
  VISIBILITY_CHANGED: 'user.profile_visibility_changed',
} as const;

export interface UserProfileCreatedPayload {
  readonly userId: string;
  readonly displayName: string;
  readonly createdAt: string;
}

export interface UserProfileUpdatedPayload {
  readonly userId: string;
  readonly fields: readonly string[];
  readonly updatedAt: string;
}

export interface UserProfileAvatarPayload {
  readonly userId: string;
  readonly avatarUrl: string;
  readonly updatedAt: string;
}

export interface UserProfileBioPayload {
  readonly userId: string;
  readonly bioLength: number;
  readonly updatedAt: string;
}

export interface UserProfileVisibilityPayload {
  readonly userId: string;
  readonly fromVisibility: string;
  readonly toVisibility: string;
  readonly changedAt: string;
}

export class UserProfileCreatedEvent extends BaseDomainEvent<
  typeof USER_PROFILE_EVENT_TYPE.CREATED,
  UserProfileCreatedPayload
> {
  constructor(p: BaseEventParams<UserProfileCreatedPayload>) {
    super(buildEventParams(USER_PROFILE_EVENT_TYPE.CREATED, AUTH_AGGREGATE_TYPE.USER_PROFILE, p));
  }
}

export class UserProfileUpdatedEvent extends BaseDomainEvent<
  typeof USER_PROFILE_EVENT_TYPE.UPDATED,
  UserProfileUpdatedPayload
> {
  constructor(p: BaseEventParams<UserProfileUpdatedPayload>) {
    super(buildEventParams(USER_PROFILE_EVENT_TYPE.UPDATED, AUTH_AGGREGATE_TYPE.USER_PROFILE, p));
  }
}

export class UserProfileAvatarUpdatedEvent extends BaseDomainEvent<
  typeof USER_PROFILE_EVENT_TYPE.AVATAR_UPDATED,
  UserProfileAvatarPayload
> {
  constructor(p: BaseEventParams<UserProfileAvatarPayload>) {
    super(buildEventParams(USER_PROFILE_EVENT_TYPE.AVATAR_UPDATED, AUTH_AGGREGATE_TYPE.USER_PROFILE, p));
  }
}

export class UserProfileBioUpdatedEvent extends BaseDomainEvent<
  typeof USER_PROFILE_EVENT_TYPE.BIO_UPDATED,
  UserProfileBioPayload
> {
  constructor(p: BaseEventParams<UserProfileBioPayload>) {
    super(buildEventParams(USER_PROFILE_EVENT_TYPE.BIO_UPDATED, AUTH_AGGREGATE_TYPE.USER_PROFILE, p));
  }
}

export class UserProfileVisibilityChangedEvent extends BaseDomainEvent<
  typeof USER_PROFILE_EVENT_TYPE.VISIBILITY_CHANGED,
  UserProfileVisibilityPayload
> {
  constructor(p: BaseEventParams<UserProfileVisibilityPayload>) {
    super(buildEventParams(USER_PROFILE_EVENT_TYPE.VISIBILITY_CHANGED, AUTH_AGGREGATE_TYPE.USER_PROFILE, p));
  }
}
