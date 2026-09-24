import {
  BaseDomainEvent,
  type DomainEventMetadata,
} from '@vubon/shared-kernel/domain/base/base.event';
import { toTimestamp } from '@vubon/shared-types/common';

export class TrafficSourceIdentifiedEvent extends BaseDomainEvent<
  'analytics.traffic.identified',
  { source: string; medium: string | null; sessions: number }
> {
  constructor(
    aggregateId: string,
    source: string,
    medium: string | null,
    sessions: number,
    version: number,
    metadata?: DomainEventMetadata,
  ) {
    super({
      id: crypto.randomUUID(),
      type: 'analytics.traffic.identified',
      aggregateId,
      aggregateType: 'TrafficSource',
      payload: { source, medium, sessions },
      occurredAt: toTimestamp(Date.now()),
      version,
      metadata,
    });
  }
}
