/**
 * User Domain Events
 * @module auth-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { UserId, Timestamp } from '@vubon/shared-types/common';
import { UserEmailVO } from '../value-objects/primitives/user-email.vo';

type EventMeta = {
  correlationId?: string;
  causationId?: string;
  userId?: string;
  source?: string;
};

const AGG = 'User';

export class UserCreatedEvent extends BaseDomainEvent<
  'auth.user.created',
  { userId: UserId; email: string }
> {
  constructor(
    aggregateId: UserId,
    payload: { userId: UserId; email: UserEmailVO },
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-created-${Date.now()}`,
      type: 'auth.user.created',
      aggregateId,
      aggregateType: AGG,
      payload: { userId: payload.userId, email: payload.email.value },
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export class UserUpdatedEvent extends BaseDomainEvent<
  'auth.user.updated',
  { userId: UserId; changes: readonly string[] }
> {
  constructor(
    aggregateId: UserId,
    changes: readonly string[],
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-updated-${Date.now()}`,
      type: 'auth.user.updated',
      aggregateId,
      aggregateType: AGG,
      payload: { userId: aggregateId, changes },
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export class UserVerifiedEvent extends BaseDomainEvent<
  'auth.user.verified',
  { userId: UserId; channel: 'email' | 'phone' }
> {
  constructor(
    aggregateId: UserId,
    channel: 'email' | 'phone',
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-verified-${Date.now()}`,
      type: 'auth.user.verified',
      aggregateId,
      aggregateType: AGG,
      payload: { userId: aggregateId, channel },
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export class UserDeletedEvent extends BaseDomainEvent<
  'auth.user.deleted',
  { userId: UserId; reason?: string }
> {
  constructor(
    aggregateId: UserId,
    occurredAt: Timestamp,
    reason?: string,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-deleted-${Date.now()}`,
      type: 'auth.user.deleted',
      aggregateId,
      aggregateType: AGG,
      payload: { userId: aggregateId, reason },
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export class UserPasswordChangedEvent extends BaseDomainEvent<
  'auth.user.password_changed',
  { userId: UserId }
> {
  constructor(
    aggregateId: UserId,
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-pwd-${Date.now()}`,
      type: 'auth.user.password_changed',
      aggregateId,
      aggregateType: AGG,
      payload: { userId: aggregateId },
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export class UserRoleAssignedEvent extends BaseDomainEvent<
  'auth.user.role_assigned',
  { userId: UserId; role: string }
> {
  constructor(
    aggregateId: UserId,
    role: string,
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-role-add-${Date.now()}`,
      type: 'auth.user.role_assigned',
      aggregateId,
      aggregateType: AGG,
      payload: { userId: aggregateId, role },
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export class UserRoleRevokedEvent extends BaseDomainEvent<
  'auth.user.role_revoked',
  { userId: UserId; role: string }
> {
  constructor(
    aggregateId: UserId,
    role: string,
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-role-rm-${Date.now()}`,
      type: 'auth.user.role_revoked',
      aggregateId,
      aggregateType: AGG,
      payload: { userId: aggregateId, role },
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export class UserLoggedInEvent extends BaseDomainEvent<
  'auth.user.logged_in',
  { userId: UserId; ipAddress?: string; userAgent?: string }
> {
  constructor(
    aggregateId: UserId,
    payload: { userId: UserId; ipAddress?: string; userAgent?: string },
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-login-${Date.now()}`,
      type: 'auth.user.logged_in',
      aggregateId,
      aggregateType: AGG,
      payload,
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export class UserLoggedOutEvent extends BaseDomainEvent<
  'auth.user.logged_out',
  { userId: UserId }
> {
  constructor(
    aggregateId: UserId,
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-logout-${Date.now()}`,
      type: 'auth.user.logged_out',
      aggregateId,
      aggregateType: AGG,
      payload: { userId: aggregateId },
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export type UserDomainEvent =
  | UserCreatedEvent
  | UserUpdatedEvent
  | UserVerifiedEvent
  | UserDeletedEvent
  | UserPasswordChangedEvent
  | UserRoleAssignedEvent
  | UserRoleRevokedEvent
  | UserLoggedInEvent
  | UserLoggedOutEvent;
