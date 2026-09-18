import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'User';

export class UserCreatedEvent extends BaseDomainEvent<
  'user.created',
  { userId: string; email: string }
> {
  constructor(
    aggregateId: string,
    userId: string,
    email: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'user.created',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { userId, email },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class UserUpdatedEvent extends BaseDomainEvent<
  'user.updated',
  { userId: string; fields: readonly string[] }
> {
  constructor(
    aggregateId: string,
    userId: string,
    fields: readonly string[],
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'user.updated',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { userId, fields },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class UserDeletedEvent extends BaseDomainEvent<
  'user.deleted',
  { userId: string }
> {
  constructor(
    aggregateId: string,
    userId: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'user.deleted',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { userId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class UserVerifiedEvent extends BaseDomainEvent<
  'user.verified',
  { userId: string; method: string }
> {
  constructor(
    aggregateId: string,
    userId: string,
    method: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'user.verified',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { userId, method },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
