import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'AuthAccountLock';

export class AccountLockedEvent extends BaseDomainEvent<
  'auth.account.locked',
  { userId: string; reason: string; until: string }
> {
  constructor(
    aggregateId: string,
    userId: string,
    reason: string,
    until: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'auth.account.locked',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { userId, reason, until },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class AccountUnlockedEvent extends BaseDomainEvent<
  'auth.account.unlocked',
  { userId: string; reason: string }
> {
  constructor(
    aggregateId: string,
    userId: string,
    reason: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'auth.account.unlocked',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { userId, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class TooManyAttemptsEvent extends BaseDomainEvent<
  'auth.too_many_attempts',
  { userId: string; attemptCount: number }
> {
  constructor(
    aggregateId: string,
    userId: string,
    attemptCount: number,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'auth.too_many_attempts',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { userId, attemptCount },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class DeviceRegisteredEvent extends BaseDomainEvent<
  'auth.device.registered',
  { userId: string; deviceId: string; fingerprint: string }
> {
  constructor(
    aggregateId: string,
    userId: string,
    deviceId: string,
    fingerprint: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'auth.device.registered',
      aggregateId,
      aggregateType: 'AuthDevice',
      payload: { userId, deviceId, fingerprint },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
