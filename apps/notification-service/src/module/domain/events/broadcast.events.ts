import { BaseDomainEvent, type DomainEventMetadata } from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';
import { BroadcastIdVO } from '../value-objects/primitives/broadcast-id.vo';

const AGGREGATE_TYPE = 'Broadcast';

export class BroadcastStartedEvent extends BaseDomainEvent<'broadcast.started', { broadcastId: string; startedAt: string }> {
  constructor(aggregateId: string, broadcastId: BroadcastIdVO, startedAt: Date, version = 0, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'broadcast.started',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { broadcastId: broadcastId.value, startedAt: startedAt.toISOString() },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}

export class BroadcastCompletedEvent extends BaseDomainEvent<'broadcast.completed', { broadcastId: string; completedAt: string; totalSent: number }> {
  constructor(aggregateId: string, broadcastId: BroadcastIdVO, completedAt: Date, totalSent: number, version = 0, metadata?: DomainEventMetadata) {
    super({
      id: crypto.randomUUID(),
      type: 'broadcast.completed',
      aggregateId,
      aggregateType: AGGREGATE_TYPE,
      payload: { broadcastId: broadcastId.value, completedAt: completedAt.toISOString(), totalSent },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
