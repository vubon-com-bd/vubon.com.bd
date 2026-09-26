/**
 * Auth Account Lock Domain Events
 * @module auth-service/domain/events
 */
import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import type { UserId, Timestamp } from '@vubon/shared-types/common';

type EventMeta = {
  correlationId?: string;
  causationId?: string;
  userId?: string;
  source?: string;
};

const AGG = 'AuthAccountLock';

export class AccountLockedEvent extends BaseDomainEvent<
  'auth.account.locked',
  { userId: UserId; reason: string; lockedAt: number }
> {
  constructor(
    aggregateId: UserId,
    payload: { userId: UserId; reason: string; lockedAt: number },
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-lock-${Date.now()}`,
      type: 'auth.account.locked',
      aggregateId,
      aggregateType: AGG,
      payload,
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export class AccountUnlockedEvent extends BaseDomainEvent<
  'auth.account.unlocked',
  { userId: UserId; unlockedBy?: string }
> {
  constructor(
    aggregateId: UserId,
    payload: { userId: UserId; unlockedBy?: string },
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-unlock-${Date.now()}`,
      type: 'auth.account.unlocked',
      aggregateId,
      aggregateType: AGG,
      payload,
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export class TooManyAttemptsEvent extends BaseDomainEvent<
  'auth.account.too_many_attempts',
  { userId?: UserId; email?: string; attempts: number }
> {
  constructor(
    aggregateId: string,
    payload: { userId?: UserId; email?: string; attempts: number },
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-tm-${Date.now()}`,
      type: 'auth.account.too_many_attempts',
      aggregateId,
      aggregateType: AGG,
      payload,
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export class DeviceRegisteredEvent extends BaseDomainEvent<
  'auth.device.registered',
  { userId: UserId; deviceId: string; fingerprint: string }
> {
  constructor(
    aggregateId: string,
    payload: { userId: UserId; deviceId: string; fingerprint: string },
    occurredAt: Timestamp,
    metadata?: EventMeta,
  ) {
    super({
      id: `evt-${aggregateId}-dev-${Date.now()}`,
      type: 'auth.device.registered',
      aggregateId,
      aggregateType: 'AuthDevice',
      payload,
      occurredAt,
      version: 1,
      metadata,
    });
  }
}

export type AuthAccountLockDomainEvent =
  | AccountLockedEvent
  | AccountUnlockedEvent
  | TooManyAttemptsEvent
  | DeviceRegisteredEvent;
