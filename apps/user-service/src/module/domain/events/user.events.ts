import { BaseDomainEvent } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGG = 'User';

export class UserCreatedEvent extends BaseDomainEvent<
  'user.created',
  { userId: string; email: string }
> {
  constructor(aggregateId: string, userId: string, email: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'user.created',
      aggregateId,
      aggregateType: AGG,
      payload: { userId, email },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class UserUpdatedEvent extends BaseDomainEvent<
  'user.updated',
  { userId: string; fields: readonly string[] }
> {
  constructor(aggregateId: string, userId: string, fields: readonly string[], version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'user.updated',
      aggregateId,
      aggregateType: AGG,
      payload: { userId, fields },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class UserDeletedEvent extends BaseDomainEvent<
  'user.deleted',
  { userId: string }
> {
  constructor(aggregateId: string, userId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'user.deleted',
      aggregateId,
      aggregateType: AGG,
      payload: { userId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class UserActivatedEvent extends BaseDomainEvent<
  'user.activated',
  { userId: string }
> {
  constructor(aggregateId: string, userId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'user.activated',
      aggregateId,
      aggregateType: AGG,
      payload: { userId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class UserDeactivatedEvent extends BaseDomainEvent<
  'user.deactivated',
  { userId: string }
> {
  constructor(aggregateId: string, userId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'user.deactivated',
      aggregateId,
      aggregateType: AGG,
      payload: { userId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class UserSuspendedEvent extends BaseDomainEvent<
  'user.suspended',
  { userId: string; reason: string }
> {
  constructor(aggregateId: string, userId: string, reason: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'user.suspended',
      aggregateId,
      aggregateType: AGG,
      payload: { userId, reason },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}

export class UserUnsuspendedEvent extends BaseDomainEvent<
  'user.unsuspended',
  { userId: string }
> {
  constructor(aggregateId: string, userId: string, version: number) {
    super({
      id: crypto.randomUUID(),
      type: 'user.unsuspended',
      aggregateId,
      aggregateType: AGG,
      payload: { userId },
      occurredAt: toTimestamp(Date.now()),
      version,
    });
  }
}
