import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

const AGGREGATE_TYPE = 'AuthMfa';

export class MfaEnabledEvent extends BaseDomainEvent<
  'auth.mfa.enabled',
  { userId: string; mfaType: string }
> {
  constructor(
    aggregateId: string,
    userId: string,
    mfaType: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'auth.mfa.enabled',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { userId, mfaType },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class MfaDisabledEvent extends BaseDomainEvent<
  'auth.mfa.disabled',
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
      type: 'auth.mfa.disabled',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { userId },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class MfaVerifiedEvent extends BaseDomainEvent<
  'auth.mfa.verified',
  { userId: string; mfaType: string }
> {
  constructor(
    aggregateId: string,
    userId: string,
    mfaType: string,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'auth.mfa.verified',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { userId, mfaType },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
