import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';
import { DigestIdVO } from '../value-objects/primitives/digest-id.vo';

const AGGREGATE_TYPE = 'Digest';

export class DigestGeneratedEvent extends BaseDomainEvent<
  'digest.generated',
  { digestId: string; itemCount: number }
> {
  constructor(
    aggregateId: string,
    digestId: DigestIdVO,
    itemCount: number,
    version = 0,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'digest.generated',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { digestId: digestId.value, itemCount },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class DigestSentEvent extends BaseDomainEvent<
  'digest.sent',
  { digestId: string; sentAt: string }
> {
  constructor(
    aggregateId: string,
    digestId: DigestIdVO,
    sentAt: Date,
    version = 0,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'digest.sent',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { digestId: digestId.value, sentAt: sentAt.toISOString() },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
