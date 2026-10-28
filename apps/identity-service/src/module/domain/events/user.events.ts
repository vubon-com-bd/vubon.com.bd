/**
 * User Domain Events
 * @module identity-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { AUTH_AGGREGATE_TYPE, buildEventParams, type BaseEventParams } from './event.helpers.js';

export const USER_EVENT_TYPE = {
  CREATED: 'identity.user.created',
  STATUS_CHANGED: 'identity.user.status_changed',
  EMAIL_VERIFIED: 'identity.user.email_verified',
  PHONE_VERIFIED: 'identity.user.phone_verified',
  SUSPENDED: 'identity.user.suspended',
  DELETED: 'identity.user.deleted',
  ROLE_ASSIGNED: 'identity.user.role_assigned',
  ROLE_REVOKED: 'identity.user.role_revoked',
} as const;

export interface UserCreatedPayload {
  readonly userId: string;
  readonly email: string;
  readonly type: string;
  readonly roles: readonly string[];
  readonly createdAt: string;
}

export interface UserStatusChangedPayload {
  readonly userId: string;
  readonly fromStatus: string;
  readonly toStatus: string;
  readonly changedBy?: string;
  readonly reason?: string;
}

export interface UserVerifiedPayload {
  readonly userId: string;
  readonly verifiedAt: string;
  readonly email?: string;
  readonly phone?: string;
}

export interface UserSuspendedPayload {
  readonly userId: string;
  readonly reason: string;
  readonly suspendedAt: string;
}


export interface UserDeletedPayload {
  readonly userId: string;
  readonly email?: string;
  readonly deletedAt: string;
  readonly reason?: string;
}

export interface UserRolePayload {
  readonly userId: string;
  readonly role: string;
  readonly assignedBy?: string;
  readonly assignedAt?: string;
  readonly revokedBy?: string;
  readonly revokedAt?: string;
}

export class UserCreatedEvent extends BaseDomainEvent<typeof USER_EVENT_TYPE.CREATED, UserCreatedPayload> {
  constructor(p: BaseEventParams<UserCreatedPayload>) {
    super(buildEventParams(USER_EVENT_TYPE.CREATED, AUTH_AGGREGATE_TYPE.USER, p));
  }
}

export class UserStatusChangedEvent extends BaseDomainEvent<typeof USER_EVENT_TYPE.STATUS_CHANGED, UserStatusChangedPayload> {
  constructor(p: BaseEventParams<UserStatusChangedPayload>) {
    super(buildEventParams(USER_EVENT_TYPE.STATUS_CHANGED, AUTH_AGGREGATE_TYPE.USER, p));
  }
}

export class UserEmailVerifiedEvent extends BaseDomainEvent<typeof USER_EVENT_TYPE.EMAIL_VERIFIED, UserVerifiedPayload> {
  constructor(p: BaseEventParams<UserVerifiedPayload>) {
    super(buildEventParams(USER_EVENT_TYPE.EMAIL_VERIFIED, AUTH_AGGREGATE_TYPE.USER, p));
  }
}

export class UserPhoneVerifiedEvent extends BaseDomainEvent<typeof USER_EVENT_TYPE.PHONE_VERIFIED, UserVerifiedPayload> {
  constructor(p: BaseEventParams<UserVerifiedPayload>) {
    super(buildEventParams(USER_EVENT_TYPE.PHONE_VERIFIED, AUTH_AGGREGATE_TYPE.USER, p));
  }
}

export class UserSuspendedEvent extends BaseDomainEvent<typeof USER_EVENT_TYPE.SUSPENDED, UserSuspendedPayload> {
  constructor(p: BaseEventParams<UserSuspendedPayload>) {
    super(buildEventParams(USER_EVENT_TYPE.SUSPENDED, AUTH_AGGREGATE_TYPE.USER, p));
  }
}


export class UserDeletedEvent extends BaseDomainEvent<typeof USER_EVENT_TYPE.DELETED, UserDeletedPayload> {
  constructor(p: BaseEventParams<UserDeletedPayload>) {
    super(buildEventParams(USER_EVENT_TYPE.DELETED, AUTH_AGGREGATE_TYPE.USER, p));
  }
}

export class UserRoleAssignedEvent extends BaseDomainEvent<typeof USER_EVENT_TYPE.ROLE_ASSIGNED, UserRolePayload> {
  constructor(p: BaseEventParams<UserRolePayload>) {
    super(buildEventParams(USER_EVENT_TYPE.ROLE_ASSIGNED, AUTH_AGGREGATE_TYPE.USER, p));
  }
}

export class UserRoleRevokedEvent extends BaseDomainEvent<typeof USER_EVENT_TYPE.ROLE_REVOKED, UserRolePayload> {
  constructor(p: BaseEventParams<UserRolePayload>) {
    super(buildEventParams(USER_EVENT_TYPE.ROLE_REVOKED, AUTH_AGGREGATE_TYPE.USER, p));
  }
}
