/**
 * User Contact Domain Events
 * @module identity-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { AUTH_AGGREGATE_TYPE, buildEventParams, type BaseEventParams } from './event.helpers.js';

export const USER_CONTACT_EVENT_TYPE = {
  ADDED: 'user.contact_added',
  UPDATED: 'user.contact_updated',
  DELETED: 'user.contact_deleted',
  VERIFIED: 'user.contact_verified',
  SET_PRIMARY: 'user.contact_set_primary',
} as const;

export interface UserContactAddedPayload {
  readonly contactId: string;
  readonly userId: string;
  readonly contactType: string;
  readonly addedAt: string;
}

export interface UserContactUpdatedPayload {
  readonly contactId: string;
  readonly userId: string;
  readonly fields: readonly string[];
  readonly updatedAt: string;
}

export interface UserContactDeletedPayload {
  readonly contactId: string;
  readonly userId: string;
  readonly deletedAt: string;
}

export interface UserContactVerifiedPayload {
  readonly contactId: string;
  readonly userId: string;
  readonly contactType: string;
  readonly verifiedAt: string;
}

export interface UserContactSetPrimaryPayload {
  readonly contactId: string;
  readonly userId: string;
  readonly setAt: string;
}

export class UserContactAddedEvent extends BaseDomainEvent<
  typeof USER_CONTACT_EVENT_TYPE.ADDED,
  UserContactAddedPayload
> {
  constructor(p: BaseEventParams<UserContactAddedPayload>) {
    super(buildEventParams(USER_CONTACT_EVENT_TYPE.ADDED, AUTH_AGGREGATE_TYPE.USER_CONTACT, p));
  }
}

export class UserContactUpdatedEvent extends BaseDomainEvent<
  typeof USER_CONTACT_EVENT_TYPE.UPDATED,
  UserContactUpdatedPayload
> {
  constructor(p: BaseEventParams<UserContactUpdatedPayload>) {
    super(buildEventParams(USER_CONTACT_EVENT_TYPE.UPDATED, AUTH_AGGREGATE_TYPE.USER_CONTACT, p));
  }
}

export class UserContactDeletedEvent extends BaseDomainEvent<
  typeof USER_CONTACT_EVENT_TYPE.DELETED,
  UserContactDeletedPayload
> {
  constructor(p: BaseEventParams<UserContactDeletedPayload>) {
    super(buildEventParams(USER_CONTACT_EVENT_TYPE.DELETED, AUTH_AGGREGATE_TYPE.USER_CONTACT, p));
  }
}

export class UserContactVerifiedEvent extends BaseDomainEvent<
  typeof USER_CONTACT_EVENT_TYPE.VERIFIED,
  UserContactVerifiedPayload
> {
  constructor(p: BaseEventParams<UserContactVerifiedPayload>) {
    super(buildEventParams(USER_CONTACT_EVENT_TYPE.VERIFIED, AUTH_AGGREGATE_TYPE.USER_CONTACT, p));
  }
}

export class UserContactSetPrimaryEvent extends BaseDomainEvent<
  typeof USER_CONTACT_EVENT_TYPE.SET_PRIMARY,
  UserContactSetPrimaryPayload
> {
  constructor(p: BaseEventParams<UserContactSetPrimaryPayload>) {
    super(buildEventParams(USER_CONTACT_EVENT_TYPE.SET_PRIMARY, AUTH_AGGREGATE_TYPE.USER_CONTACT, p));
  }
}
