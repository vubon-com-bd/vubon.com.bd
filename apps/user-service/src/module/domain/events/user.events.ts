/**
 * User domain events
 * @module user-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { Timestamp } from '@vubon/shared-types/common';

interface EventParams<TPayload> {
  readonly id: string;
  readonly aggregateId: string;
  readonly payload: TPayload;
  readonly occurredAt: Timestamp;
  readonly version: number;
}

// ─── User Created ────────────────────────────────────
export interface UserCreatedPayload {
  readonly userId: string;
  readonly email: string;
  readonly name: string;
  readonly type: string;
}

export class UserCreatedEvent extends BaseDomainEvent<'user.created', UserCreatedPayload> {
  constructor(p: EventParams<UserCreatedPayload>) {
    super({
      id: p.id,
      type: 'user.created',
      aggregateId: p.aggregateId,
      aggregateType: 'User',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}

// ─── User Updated ────────────────────────────────────
export interface UserUpdatedPayload {
  readonly userId: string;
  readonly changedFields: readonly string[];
}

export class UserUpdatedEvent extends BaseDomainEvent<'user.updated', UserUpdatedPayload> {
  constructor(p: EventParams<UserUpdatedPayload>) {
    super({
      id: p.id,
      type: 'user.updated',
      aggregateId: p.aggregateId,
      aggregateType: 'User',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}

// ─── User Activated ──────────────────────────────────
export interface UserActivatedPayload {
  readonly userId: string;
  readonly activatedAt: string;
}

export class UserActivatedEvent extends BaseDomainEvent<'user.activated', UserActivatedPayload> {
  constructor(p: EventParams<UserActivatedPayload>) {
    super({
      id: p.id,
      type: 'user.activated',
      aggregateId: p.aggregateId,
      aggregateType: 'User',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}

// ─── User Deactivated ────────────────────────────────
export interface UserDeactivatedPayload {
  readonly userId: string;
  readonly deactivatedAt: string;
  readonly reason?: string;
}

export class UserDeactivatedEvent extends BaseDomainEvent<
  'user.deactivated',
  UserDeactivatedPayload
> {
  constructor(p: EventParams<UserDeactivatedPayload>) {
    super({
      id: p.id,
      type: 'user.deactivated',
      aggregateId: p.aggregateId,
      aggregateType: 'User',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}

// ─── User Suspended ──────────────────────────────────
export interface UserSuspendedPayload {
  readonly userId: string;
  readonly reason: string;
}

export class UserSuspendedEvent extends BaseDomainEvent<'user.suspended', UserSuspendedPayload> {
  constructor(p: EventParams<UserSuspendedPayload>) {
    super({
      id: p.id,
      type: 'user.suspended',
      aggregateId: p.aggregateId,
      aggregateType: 'User',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}

// ─── User Blocked ────────────────────────────────────
export interface UserBlockedPayload {
  readonly userId: string;
  readonly reason: string;
  readonly blockedBy: string;
}

export class UserBlockedEvent extends BaseDomainEvent<'user.blocked', UserBlockedPayload> {
  constructor(p: EventParams<UserBlockedPayload>) {
    super({
      id: p.id,
      type: 'user.blocked',
      aggregateId: p.aggregateId,
      aggregateType: 'User',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}

// ─── User Deleted ────────────────────────────────────
export interface UserDeletedPayload {
  readonly userId: string;
  readonly deletedAt: string;
}

export class UserDeletedEvent extends BaseDomainEvent<'user.deleted', UserDeletedPayload> {
  constructor(p: EventParams<UserDeletedPayload>) {
    super({
      id: p.id,
      type: 'user.deleted',
      aggregateId: p.aggregateId,
      aggregateType: 'User',
      payload: p.payload,
      occurredAt: p.occurredAt,
      version: p.version,
    });
  }
}
